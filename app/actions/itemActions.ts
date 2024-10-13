import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { Item } from "../types";

export async function getAllItems(categoryId?: string) {
  const { db } = await connectToDatabase();
  let query = categoryId ? { categoryId: categoryId } : {};
  const catalog = await db.collection("catalog").find(query).toArray();
  return catalog;
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