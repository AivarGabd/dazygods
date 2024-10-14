import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { connectToDatabase, s3 } from "@/lib/db";
import crypto from "crypto";
import { ObjectId } from "mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: "Error parsing form data" });
      }

      const filesArray = Object.values(files).flat();
      const itemId = fields.itemId![0];


      const uploadPromises = filesArray.map(async (file) => {
        if (!file!.filepath) {
          throw new Error("No image file provided");
        }

        const fileExtension = file!.originalFilename!.split(".").pop();
        const filePath = file!.filepath;

        const upload = await s3.Upload(
          {
            path: filePath,
            name: `${crypto.randomUUID()}.${fileExtension}`,
          },
          `/${itemId}/`
        );

        if (upload && "Location" in upload) {
          return upload.Location;
        } else {
          throw new Error("Upload failed");
        }
      });

      try {
        const uploadResults = await Promise.all(uploadPromises);
        // TODO: Add to MongoDB database
        const { db } = await connectToDatabase();
        const item = await db.collection("catalog").findOne({ _id: new ObjectId(itemId) });
        const updatedItem = await db.collection("catalog").updateOne(
          { _id: new ObjectId(itemId) },
          { $addToSet: { images: { $each: uploadResults } } }
        );
        return res.status(201).json({ imgLinks: uploadResults });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error uploading files" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing request" });
  }
}
