"use server";

import { connectToDatabase } from "@/lib/db";
import { cookies } from "next/headers";
import * as categoryActions from "./actions/categoryActions";
import * as itemActions from "./actions/itemActions";


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


// Реэкспорт функций из других файлов
export const getAllCategories = categoryActions.getAllCategories;
export const createNewCategory = categoryActions.createNewCategory;
export const editCategoryName = categoryActions.editCategoryName;
export const deleteCategory = categoryActions.deleteCategory;
export const editCategoryStatus = categoryActions.editCategoryStatus;
export const getAllActiveCategories = categoryActions.getAllActiveCategories;

export const getAllItems = itemActions.getAllItems;
export const getItemById = itemActions.getItemById;
export const getArrayofItems = itemActions.getArrayofItems;
export const getAllPublishedItems = itemActions.getAllPublishedItems;
