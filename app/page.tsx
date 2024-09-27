import { Suspense } from "react";
import ItemsList from "@/components/home/ItemsList";
import CategoriesSelect from "@/components/home/CategoriesSelect";

export default function Home() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2">
        <CategoriesSelect />
      </div>

      <section className="flex flex-wrap gap-2 w-full">
        <Suspense fallback={<>List loading...</>}>
          <ItemsList />
        </Suspense>
      </section>
    </section>
  );
}
