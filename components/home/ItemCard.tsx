import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import Image from "next/image";
import { Item } from "@/app/types";
import { Button } from "@nextui-org/button";
import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import AddToCartButton from "../templates/AddToCartButton";
import AskQuestionButton from "../templates/AskQuestionButton";
import AddToFavoritesButton from "../templates/AddToFavoritesButton";
import CurrentStockBlock from "../templates/CurrentStockBlock";

const ItemCard = (item: Item) => {
  const id = item._id?.toString();
  const reqUserAgent = userAgent({ headers: headers() });
  const viewport = reqUserAgent.device.type === "mobile" ? "mobile" : "desktop";

  return (
    <Card className="w-[200px] lg:w-[300px] bg-gray-100">
      <CardHeader className="px-0 w-full bg-white">
        <Link href={`/item?id=${id}`} key={id}>
          <Image
            src={item.images[0]}
            alt={item.title}
            width={viewport == "mobile" ? 150 : 300}
            height={viewport == "mobile" ? 120 : 200}
            className="m-auto"
          />
        </Link>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <Link href={`/item?id=${id}`} key={id}>
          <h2 className="leading-none font-medium text-gray-500 text-sm">
            {item.title}
          </h2>
          <div className="text-xl font-bold">
            {(+item.price).toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}{" "}
            / шт
            <div className="text-xs font-normal mt-[-2px]">
              Артикул: {item.code}
            </div>
            <div>
              <CurrentStockBlock
                value={item.stock.toString()}
                size={viewport == "mobile" ? "sm" : "md"}
              />
            </div>
          </div>
        </Link>
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex gap-1 justify-center w-full">
          <AddToCartButton
            itemId={id}
            size={viewport == "mobile" ? "sm" : "md"}
          />

          <AddToFavoritesButton
            itemId={id}
            size={viewport == "mobile" ? "sm" : "md"}
          />
        </div>
        <AskQuestionButton
          itemId={id}
          size={viewport == "mobile" ? "sm" : "md"}
          styles="w-full"
        />
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
