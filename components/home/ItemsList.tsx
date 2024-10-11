import { getAllItems } from "@/app/actions";
import ItemCard from "./ItemCard";
import { Item } from "@/app/types";

export default async function ItemsList({filter}: {filter: string}) {
  const items = await getAllItems()

  if(items.length === 0) return <div>No items found</div>
  return (
    <>
      {items.map((item,index) => (
        <ItemCard key={index} {...(item as unknown as Item)} />
      ))}
    </>
  );
};


