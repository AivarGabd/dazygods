import { getAllCategories } from "../actions";
import AdminMainList from "@/components/admin/MainList";

const Page = async () => {
  let categories = JSON.parse(JSON.stringify(await getAllCategories()));
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Все категорий товаров</h1>
      <div>
        <AdminMainList categories={categories} />
      </div>
    </div>
  );
};

export default Page;
