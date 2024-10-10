"use client";

import { getArrayofItems } from "@/app/actions";
import { Item } from "@/app/types";
import { useEffect, useState } from "react";
import CartItem from "./Item";

type CartItem = {
  count: number | undefined;
};

const CartList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartItemsLoaded, setIsCartItemsLoaded] = useState(false);
  const [notAvailableItems, setNotAvailableItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if(isCartItemsLoaded) return;
    let arr = JSON.parse(localStorage.getItem("cart")!);
    let newArr: { id: string; count: number }[] = [];

    arr.forEach((item: string) => {
      if (newArr.find((x) => x.id == item)) {
        let test = newArr.find((x) => x.id == item);
        test!.count++;
        return;
      }
      newArr.push({
        id: item,
        count: 1,
      });
    });

    getArrayofItems(newArr.map((x) => x.id)).then((serverData) => {
      setIsCartItemsLoaded(true);
      setNotAvailableItems(serverData.filter((x) => +x.stock == 0));
      setCartItems(
        serverData
          .filter((x) => +x.stock > 0)
          .map((item) => ({
            ...item,
            count: newArr.find((x) => x.id == item._id.toString())!.count,
          }))
      );
    });
  }, []);

  if (!isCartItemsLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2 mt-4">
      {cartItems?.length == 0 ? (
        <div>Cart is empty</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem item={item as unknown as Item} />
          ))}
        </>
      )}

      {notAvailableItems.length > 0 && (
        <div className="flex flex-col gap-2 mt-10">
          <div>
            <h2 className="text-xl font-bold">Недоступны для заказа</h2>
          </div>
          <div className="flex flex-col gap-2">
            {notAvailableItems?.map((item) => (
              <CartItem item={item as unknown as Item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
