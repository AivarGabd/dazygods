import { ObjectId } from "mongodb";

export type Item = {
  _id: ObjectId | string;
  title: string;
  images: string[];
  price: string;
  stock: string;
  visits: number;
  purchases: number;
  characteristics: any[]; // Consider defining a more specific type if possible
  description: string;
  peculiarities: any[]; // Consider defining a more specific type if possible
  draft: boolean;
  code: string;
  count: number 
};

export type CategoryType = {
  _id: string;
  name: string;
  date: string | Date;
};
