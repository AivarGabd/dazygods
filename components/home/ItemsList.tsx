import { getAllPublishedItems } from "@/app/actions";
import ItemCard from "./ItemCard";
import { Item } from "@/app/types";

export default async function ItemsList({ filter }: { filter: string }) {
  //const items = await getAllPublishedItems(filter)

  const items: Item[] = []
  

  if (items.length === 0)
    return <div>У нас пока нет товаров в этой категории</div>;
  return (
    <>
      {items.map((item, index) => (
        <ItemCard key={index} {...(item as unknown as Item)} />
      ))}
    </>
  );
}
