import { getAllCategories } from "@/app/actions";
import CategoriesSelect from "./CategoriesSelect";
import { CategoryType } from "@/app/types";

const Categories = async () => {
  const categories = await getAllCategories();

  return (
    <div>
     <CategoriesSelect categories={categories as unknown as CategoryType[]}/>
    </div>
  );
};

export default Categories;
