import { getItemById } from "@/app/actions";
import { Item } from "@/app/types";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import AboutReturnButton from "./AboutReturnButton";
import AddToFavoritesButton from "./AddToFavoritesButton";
import ImagesCarousel from "./ImagesCarousel";
import AskQuestionButton from "../templates/AskQuestionButton";
import AddToCartButton from "../templates/AddToCartButton";

const ItemMainBlock = async ({ itemId }: { itemId: string }) => {
  const item = (await getItemById(itemId)) as Item;

  return (
    <>
      <div className="flex flex-col gap-4 pb-[100px]">
        <div className=" lg:flex lg:flex-row">
          <div className="flex flex-col gap-4 bg-gray-100 px-2 pb-3 rounded-b-lg lg:w-fit">
            <div className="lg:flex lg:gap-4">
              <div className="hidden lg:flex lg:w-[150px] lg:h-[500px] lg:my-2 lg:py-1 bg-white rounded-md ">
                <ImagesCarousel images={item.images} />
              </div>
              <Image
                src={item.images[0]}
                alt={item.title}
                width={500}
                height={500}
                className="pt-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full px-2 lg:hidden">
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

              <div className="ml-auto mr-4 flex gap-2 ">
                <AddToFavoritesButton />
                <AboutReturnButton />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:mr-0 lg:ml-auto lg:mt-8">
            <div className="flex flex-col gap-6 bg-gray-100 p-2 rounded-md w-[400px]">
              <div className="flex flex-wrap gap-2 w-full ">
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

                <div className="ml-auto mr-4 flex gap-2 ">
                  <AddToFavoritesButton />
                  <AboutReturnButton />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <AddToCartButton itemId={item._id.toString()} />

                <AskQuestionButton itemId={item._id.toString()} />
                <div className="text-sm text-gray-500 font-medium mt-[-4px]">
                  Артикул: {item.code}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <ImagesCarousel images={item.images} />
        </div>

        <div className=" p-2 bg-gray-100 rounded-md">
          <h1 className="text-2xl font-semibold leading-normal">
            {item.title}
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 lg:hidden">
              <AskQuestionButton itemId={item._id.toString()} />
              <div className="text-sm text-gray-500 font-medium mt-[-4px]">
                Артикул: {item.code}
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              delectus eos quos ex! Praesentium est officiis, ipsam dolorum
              tenetur, sed ratione voluptatibus unde quo quasi doloremque
              consequatur nihil nulla veritatis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sunt delectus eos quos ex!
              Praesentium est officiis, ipsam dolorum tenetur, sed ratione
              voluptatibus unde quo quasi doloremque consequatur nihil nulla
              veritatis. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Sunt delectus eos quos ex! Praesentium est officiis, ipsam
              dolorum tenetur, sed ratione voluptatibus unde quo quasi
              doloremque consequatur nihil nulla veritatis.
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[60px] right-0 left-0 w-full px-2 lg:hidden">
        <AddToCartButton itemId={item._id.toString()} />
      </div>
    </>
  );
};

export default ItemMainBlock;
