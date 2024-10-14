"use client";

import { Button, Spinner } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddToCartButton = ({
  itemId,
  size,
}: {
  itemId?: string;
  size?: "sm" | "md";
}) => {
  const router = useRouter()

  const [isCartDataLoaded, setIsCartDataLoaded] = useState(false);
  const [isInCart, setIsInCart] = useState<null | boolean>(null);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setIsInCart(cartItems.includes(itemId));
    setIsCartDataLoaded(true);
  }, []);

  const handleClick = () => {
    if (isInCart) return;

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push(itemId);
    localStorage.setItem("cart", JSON.stringify(Array.from(cartItems)));
    setIsInCart(!isInCart);
  };

  return (
    <Button
      className={`w-full font-medium ${isCartDataLoaded && !isInCart ? "text-white" : "text-black"}`}
      color={isCartDataLoaded && !isInCart ? "success" : "default"}
      startContent={
        isCartDataLoaded ? <></> : <Spinner size="sm" color="current" />
      }
      isDisabled={!isCartDataLoaded}
      variant={isCartDataLoaded && !isInCart ? "solid" : "flat"}
      endContent={
        isCartDataLoaded &&
        isInCart && <ArrowRight size={size === "sm" ? "16" : "20"} />
      }
      onClick={(e) => {
        handleClick();
        router.push('/cart')
      }}
      size={size}
    >
      {isCartDataLoaded ? (
        <>
          <div>{isInCart ? <>К корзине</> : <>Добавить в корзину</>}</div>
        </>
      ) : (
        <div>Загрузка...</div>
      )}
    </Button>
  );
};

export default AddToCartButton;
