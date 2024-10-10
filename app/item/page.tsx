import ItemMainBlock from "@/components/item/ItemMainBlock";
import { Suspense } from "react";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  return (
    <div>
      <Suspense fallback={<>Item loading...</>}>
        <ItemMainBlock itemId={searchParams.id} />
      </Suspense>
    </div>
  );
};

export default Page;
