"use client";

import { getArrayofItems } from "@/app/actions";
import { Item } from "@/app/types";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const CartList = () => {
  const [cartItems, setCartItems] = useState<Item[] | null>(null);

  useEffect(() => {
    getArrayofItems(JSON.parse(localStorage.getItem("cart")!)).then((data) => {
      setCartItems(data as Item[]);
    });
  }, []);

  if (cartItems == null) return <div>Loading...</div>;

  

  return (
    <div className="flex flex-col gap-2 mt-6">
      {cartItems.map((item) => (
        <div key={item._id.toString()} className="flex flex-row gap-2 bg-gray-100 p-2 rounded-md w-fit">

          <img src={item.images[0]} alt={item.title} className="w-[200px]" />
          <div className="flex flex-col gap-2">
            <p>{item.title}</p>
            <p>{item.price}</p>
          </div>
        </div>
      ))}

      <Button className="w-fit font-medium text-white" color="success">
        Оформить заказ
      </Button>
    </div>
  );
};

export default CartList;
