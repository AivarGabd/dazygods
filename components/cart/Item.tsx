"use client";

import { Item } from "@/app/types";
import { useIsMobile } from "@/lib/useIsMobile";
import { Button, Input } from "@nextui-org/react";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import AskQuestionButton from "../templates/AskQuestionButton";
import AddToFavoritesButton from "../templates/AddToFavoritesButton";

const CartItem = ({ item }: { item: Item }) => {
  const isMobile = useIsMobile();
  const isItemInStock = +item.stock > 0;

  //сделать защиту то того, сколько вообще есть товара на складе
  return (
    <div
      key={item._id?.toString()}
      className="flex flex-row gap-2 bg-gray-100 p-2 rounded-md w-[660px]"
    >
      <img src={item.images[0]} alt={item.title} className="w-[150px]" />
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col h-full ">
          <div className="flex flex-col gap-2">
            <p>{item.title}</p>
            <p>{item.price}</p>
          </div>
          <div className="flex flex-row gap-2 mt-auto mb-0">
            <Button isIconOnly size={isMobile ? "sm" : "md"}>
              <Trash2 />
            </Button>
            <AddToFavoritesButton
              itemId={item._id?.toString()}
              size={isMobile ? "sm" : "md"}
            />

            <AskQuestionButton itemId={item._id?.toString()} />
          </div>
        </div>
        <div>
          {isItemInStock ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <Button isIconOnly size={isMobile ? "sm" : "md"}>
                  <Minus />
                </Button>
                <Input
                  variant="bordered"
                  type="number"
                  className=" w-20 flex text-center font-medium align-middle"
                  value={item.count.toString()}
                  style={{ textAlign: "center" }}
                />

                <Button isIconOnly size={isMobile ? "sm" : "md"}>
                  <Plus />
                </Button>
              </div>

              <div>
                <p>В наличии: {item.stock}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
