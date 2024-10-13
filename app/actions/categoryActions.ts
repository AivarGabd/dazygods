import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";

export async function getAllCategories() {
  const { db } = await connectToDatabase();
  const categories = await db.collection("categories").find().toArray();
  return categories;
}

export async function getAllActiveCategories() {
  const { db } = await connectToDatabase();
  const categories = await db
    .collection("categories")
    .find({ isDraft: false })
    .toArray();
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
  await db
    .collection("categories")
    .updateOne({ _id: new ObjectId(categoryId) }, { $set: { name: newName } });
  return data;
}

export async function deleteCategory(categoryId: string) {
  const { db } = await connectToDatabase();
  await db.collection("categories").deleteOne({ _id: new ObjectId(categoryId) });
  await db.collection("catalog").deleteMany({ categoryId: categoryId });
  return { success: true };
}

export async function editCategoryStatus(categoryId: string, newStatus: boolean) {
  const { db } = await connectToDatabase();
  await db
    .collection("categories")
    .updateOne(
      { _id: new ObjectId(categoryId) },
      { $set: { isDraft: newStatus } }
    );
  return { success: true };
}