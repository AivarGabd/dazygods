import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import Image from "next/image";
import { Item } from "@/app/types";
import { Button } from "@nextui-org/button";
import { Heart, MessageCircle, ShoppingCart } from "lucide-react";

const ItemCard = (item: Item) => {
  const id = item._id.toString();

  return (
    <Link href={`/item?id=${id}`} key={id}>
      <Card className="w-[200px] bg-gray-100">
        <CardHeader className="px-0 w-full bg-white">
          <Image
            src={item.images[0]}
            alt={item.title}
            width={150}
            height={120}
            className="m-auto"
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
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
            <div className="text-xs font-normal">Артикул: {item.code}</div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col gap-2">
          <div className="flex gap-1 justify-center w-full">
            <Button
              color="success"
              startContent={<ShoppingCart />}
              size="sm"
              className="w-full"
            >
              В корзину
            </Button>
            <Button isIconOnly size="sm">
              <Heart />
            </Button>
          </div>
          <Button className="w-full" startContent={<MessageCircle />} size="sm">
            Задать вопрос
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
