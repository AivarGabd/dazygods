

import { getAllItems } from "@/app/actions";
import ItemCard from "./ItemCard";
import { Item } from "@/app/types";

export default async function ItemsList() {
  const items = await getAllItems()
  return (
    <>
      {items.map((item) => (
        <ItemCard key={item._id.toString()} {...(item as unknown as Item)} />
      ))}

    </>
  );
};


