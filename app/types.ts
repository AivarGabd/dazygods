import {ObjectId} from 'mongodb'

export type Item = {
  _id: ObjectId;
  title: string;
  images: string[];
  price: string;
  stock: string;
  id: string;
  visits: number;
  purchases: number;
  characteristics: any[]; // Consider defining a more specific type if possible
  description: string;
  peculiarities: any[]; // Consider defining a more specific type if possible
  draft: boolean;
  code: string;
}