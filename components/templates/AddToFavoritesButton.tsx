"use client";

import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { HeartIcon } from "./HeartIcon";

const AddToFavoritesButton = ({
  itemId,
  size,
}: {
  itemId: string;
  size?: "sm" | "md";
}) => {
  const [isFavoritesDataLoaded, setIsFavoritesDataLoaded] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

  useEffect(() => {
    const favorites = new Set(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );
    setIsInFavorites(favorites.has(itemId));
    setIsFavoritesDataLoaded(true);
  }, []);

  const handleClick = () => {
    if (!isFavoritesDataLoaded) return;

    const favorites = new Set(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );
    if (isInFavorites) {
      favorites.delete(itemId);
    } else {
      favorites.add(itemId);
    }

    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
    setIsInFavorites(!isInFavorites);
  };

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      isIconOnly
      size={size}
      variant="flat"
    >
      <HeartIcon
        size={20}
        filled={isInFavorites}
        fill={isInFavorites ? "#F31260" : "currentColor"}
      />
    </Button>
  );
};

export default AddToFavoritesButton;
