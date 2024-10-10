import CartList from "@/components/cart/CartList";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Корзина</h1>
      <Suspense fallback={<>Loading...</>}>
        <CartList />
      </Suspense>
    </div>
  );
};

export default Page;
