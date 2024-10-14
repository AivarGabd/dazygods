import { Suspense } from "react";
import ItemsList from "@/components/home/ItemsList";
import CategoriesSelect from "@/components/home/CategoriesSelect";
import Categories from "@/components/home/Categories";

export default function Home({
  searchParams,
}: {
  searchParams: { filter: string };
}) {



  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2">
        {/* <Suspense fallback={<>Loading categories...</>}>
          <Categories />
        </Suspense> */}
      </div>

      <section className="flex flex-wrap gap-2 w-full">
        <Suspense fallback={<>List loading...</>}>
          <ItemsList filter={searchParams.filter} />
        </Suspense>
      </section>
    </section>
  );
}
