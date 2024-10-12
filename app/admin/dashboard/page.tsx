import { getAllCategories } from "@/app/actions";
import AdminMainList from "@/components/admin/MainList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const Page = async () => {
  const admin = cookies().get("admin")?.value;

  if (!admin) {
    redirect("/admin");
  }

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
