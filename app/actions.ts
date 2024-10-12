"use server";

import { delay } from "@/lib/utils";
import { MongoClient, Db, ObjectId } from "mongodb";
import { Item } from "./types";
import { cookies } from "next/headers";

//const mongodbUri =
// "mongodb://aivargab:Kaban48412356-Ars@90.156.219.41/MongoDB-3628";
const mongodbUri = "mongodb://0.0.0.0:27017/db1";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(mongodbUri);

    await client.connect();
    db = client.db();

    // Add event listeners for connection issues
    client.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
    client.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
      client = null;
      db = null;
    });

    console.log("Connected to MongoDB");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Ensure the connection is closed when the application shuts down
process.on("SIGINT", async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
  process.exit(0);
});

export async function getAllItems(categoryId?: string) {
  const { db } = await connectToDatabase();

  let query = {};
  if (categoryId) {
    query = { categoryId: categoryId };
  }

  const catalog = await db.collection("catalog").find(query).toArray();

  return catalog;
}

export async function getAllCategories() {
  const { db } = await connectToDatabase();

  const categories = await db.collection("categories").find().toArray();

  return categories;
}

export async function createNewCategory(categoryName: string) {
  const { db } = await connectToDatabase();
  const newData = { name: categoryName, date: new Date(), isDraft: true };
  let category = await db.collection("categories").insertOne(newData);
  return { ...newData, _id: category.insertedId.toString() };
}

export async function editCategoryName(categoryId: string, newName: string) {
  const { db } = await connectToDatabase();
  let data = { name: newName };
  const category = await db
    .collection("categories")
    .updateOne({ _id: new ObjectId(categoryId) }, { $set: { name: newName } });

  return data;
}

export async function deleteCategory(categoryId: string) {
  const { db } = await connectToDatabase();

  await db
    .collection("categories")
    .deleteOne({ _id: new ObjectId(categoryId) });
  await db.collection("catalog").deleteMany({ categoryId: categoryId });

  return { success: true };
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

export async function adminLogin(formData: FormData) {
  let email = formData.get("email");
  let password = formData.get("password");

  const { db } = await connectToDatabase();
  const admin = await db.collection("admins").findOne({ email: email });
  if (!admin) {
    return { error: "Администратор с таким email не найден" };
  }
  if (admin.password !== password) {
    return { error: "Неверный пароль" };
  }

  await db
    .collection("admins")
    .updateOne({ email: email }, { $set: { lastVisit: new Date() } });

  cookies().set("admin", `${admin.email}`);
  return { success: true };
}

export async function askQuestion(data: {
  email: string;
  question: string;
  itemId: string;
}) {
  const { db } = await connectToDatabase();
  await db
    .collection("users-questions")
    .insertOne({ ...data, date: new Date() });

  //надо отправить письмо на почту администратора с вопросом
  return { success: true };
}

export async function editCategoryStatus(
  categoryId: string,
  newStatus: boolean
) {
  const { db } = await connectToDatabase();
  await db
    .collection("categories")
    .updateOne(
      { _id: new ObjectId(categoryId) },
      { $set: { isDraft: newStatus } }
    );
  return { success: true };
}
