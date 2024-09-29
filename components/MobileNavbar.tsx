"use client";

import { Button } from "@nextui-org/react";
import { Heart, House, Info, ShoppingCart, User } from "lucide-react";
import { Drawer } from "vaul";

const MobileNavbar = () => {
  return (
    <div className="flex justify-between items-center bg-white px-8 py-2 fixed bottom-0 left-0 right-0 z-50">
      <a href="/">
        <Button isIconOnly variant="flat">
          <House />
        </Button>
      </a>

      <a href="/cart">
        <Button isIconOnly variant="flat">
          <ShoppingCart />
        </Button>
      </a>

      <a href="/favorites">
        <Button isIconOnly variant="flat">
          <Heart />
        </Button>
      </a>

      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button isIconOnly variant="flat">
            <Info />
          </Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content
            className={`flex flex-col bottom-0 left-0 right-0 rounded-t-[10px] bg-gray-100 dark:bg-neutral-900 pt-1 px-2 h-[500px] lg:h-[160px] outline-none z-[9999] fixed`}
            style={{
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <Drawer.Handle className="bg-gray-200 mt-2"/>
            <div className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
              repellendus repellat repudiandae modi nostrum fugit quas, officiis
              atque optio velit veniam distinctio animi ipsam ut ad numquam. Ut,
              iusto et.
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default MobileNavbar;
