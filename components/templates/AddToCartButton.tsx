"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const AddToCartButton = ({ itemId, size }: { itemId: string, size?: 'sm' | 'md' }) => {
  const [isInCart, setIsInCart] = useState<null | boolean>(null);

  

  useEffect(() => {
    const cartItems = new Set(JSON.parse(localStorage.getItem("cart") || "[]"));
    setIsInCart(cartItems.has(itemId));
  }, []);

  const handleClick = () => {
    const cartItems = new Set(JSON.parse(localStorage.getItem("cart") || "[]"));
    if (isInCart) {
      cartItems.delete(itemId);
    } else {
      cartItems.add(itemId);
    }
    localStorage.setItem("cart", JSON.stringify(Array.from(cartItems)));
    setIsInCart(!isInCart);
  };

  return (
    <Button
      className="w-full font-medium text-white"
      color={isInCart ? "danger" : "success"}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      size={size}
    >
      {isInCart == null ? (
        <div>Заргрузка...</div>
      ) : (
        <div>
          {isInCart ? <>Удалить из корзины</> : <>Добавить в корзину</>}
        </div>
      )}
    </Button>
  );
};

export default AddToCartButton;
