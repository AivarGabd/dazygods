"use client";

import { getArrayofItems } from "@/app/actions";
import { Item } from "@/app/types";
import { useEffect, useState } from "react";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [isFavoritesItemsLoaded, setIsFavoritesItemsLoaded] = useState(false);
  const [isFavoritesEmpty, setIsFavoritesEmpty] = useState(false);
  useEffect(() => {
    if (isFavoritesItemsLoaded) return;
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

   

    if (!favorites.length) {
      setIsFavoritesItemsLoaded(true);
      setIsFavoritesEmpty(true);
      return;
    }
    getArrayofItems(favorites).then((items) => {
      setIsFavoritesItemsLoaded(true);
      setFavorites(items);
    });
  }, []);

  if (!isFavoritesItemsLoaded) return <div>Loading...</div>;
  if (isFavoritesEmpty) return <div>В избранных пока ничего нет</div>;
  return (
    <div>
      {favorites.map((item) => (
        <div key={item._id.toString()} className="">
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
