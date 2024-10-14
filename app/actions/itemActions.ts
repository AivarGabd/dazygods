import { ObjectId } from "mongodb";
import { connectToDatabase, s3 } from "@/lib/db";
import { Item } from "../types";



export async function getAllPublishedItems(categoryId?: string) {
  const { db } = await connectToDatabase();
  let query = categoryId ? { categoryId: categoryId } : {};
  const catalog = await db.collection("catalog").find(query).toArray();
  return catalog;
}


export async function getAllItems(categoryId: string) {
  const { db } = await connectToDatabase();
  let query = { categoryId: categoryId } 
  const publishedCatalog = await db.collection("catalog").find(query).toArray();
  let draftCatalog = await db.collection("drafts").find(query).toArray();

  draftCatalog = draftCatalog.map((item) => ({
    ...item,
    draft: true,
  }));

  return JSON.parse(JSON.stringify([...publishedCatalog, ...draftCatalog]));
}

export async function getItemById(itemId: string) {
  const { db } = await connectToDatabase();
  const item = await db
    .collection("catalog")
    .findOne({ _id: new ObjectId(itemId) });
  return item;
}

export async function getArrayofItems(itemIds: string[]) {
  const { db } = await connectToDatabase();
  const items = JSON.parse(
    JSON.stringify(
      await db
        .collection("catalog")
        .find({ _id: { $in: itemIds.map((id) => new ObjectId(id)) } })
        .toArray()
    )
  );
  return items as Item[];
}

export async function deleteItemImages(itemId: string, imageIndex: number) {
  const { db } = await connectToDatabase();
  const item = await db.collection("catalog").findOne({ _id: new ObjectId(itemId) });
  const images = item!.images;
  const imagePath = images[imageIndex]
  images.splice(imageIndex, 1);
  await db.collection("catalog").updateOne({ _id: new ObjectId(itemId) }, { $set: { images: images } });

  //delete image from s3
  await s3.Remove(imagePath);


  return images
}


export async function updateImagesOrder(itemId: string, images: string[]) {
  const { db } = await connectToDatabase();
  //если нет элемента с itemId в базе данных catalog, проверить его наличие в базе данных drafts
  const item = await db.collection("catalog").findOne({ _id: new ObjectId(itemId) });
  if (!item) {
    const draftItem = await db.collection("drafts").findOne({ _id: new ObjectId(itemId) });
    if (!draftItem) {
      return;
    }
  }
  //await db.collection("catalog").updateOne({ _id: new ObjectId(itemId) }, { $set: { images: images } });
}



export async function addNewDraftItem(item: any) {
  const { db } = await connectToDatabase();
  const newDraftItem = await db.collection("drafts").insertOne(item);
  return newDraftItem;
}

