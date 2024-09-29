import { getItemById } from "@/app/actions";
import { Item } from "@/app/types";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import AboutReturnButton from "./AboutReturnButton";
import AddToFavoritesButton from "./AddToFavoritesButton";
import ImagesCarousel from "./ImagesCarousel";
import AskQuestionButton from "./AskQuestionButton";

//надо кнопку чтобы задать вопрос и артикул
const ItemMainBlock = async ({ itemId }: { itemId: string }) => {
  const item = (await getItemById(itemId)) as Item;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 bg-gray-100 px-2 pb-3 rounded-b-lg">
        <Image
          src={item.images[0]}
          alt={item.title}
          width={500}
          height={500}
          className="pt-1"
        />
        <div className="flex flex-wrap gap-2 w-full px-2">
          <div>
            <h2 className="text-xl font-medium flex justify-center align-middle items-center">
              {(+item.price).toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              / шт
            </h2>
            <div className="text-sm text-gray-500 mt-[-4px] font-medium">
              <div>В наличии {item.stock} шт</div>
            </div>
          </div>

          <div className="ml-auto mr-4 flex gap-2">
            <AddToFavoritesButton />
            <AboutReturnButton />
          </div>
        </div>
      </div>
      <div>
        <ImagesCarousel images={item.images} />
      </div>

    <div className=" p-2 bg-gray-100 rounded-md">
   

      <h1 className="text-2xl font-semibold leading-normal">{item.title}</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <AskQuestionButton />
          <div className="text-sm text-gray-500 font-medium mt-[-4px]">
            Артикул: {item.code}
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt delectus
          eos quos ex! Praesentium est officiis, ipsam dolorum tenetur, sed
          ratione voluptatibus unde quo quasi doloremque consequatur nihil nulla
          veritatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt delectus
          eos quos ex! Praesentium est officiis, ipsam dolorum tenetur, sed
          ratione voluptatibus unde quo quasi doloremque consequatur nihil nulla
          veritatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt delectus
          eos quos ex! Praesentium est officiis, ipsam dolorum tenetur, sed
          ratione voluptatibus unde quo quasi doloremque consequatur nihil nulla
          veritatis.
        </div>
      </div>
    </div>
    </div>
  );
};

export default ItemMainBlock;
