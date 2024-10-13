import { getAllActiveCategories } from "@/app/actions";
import CategoriesSelect from "./CategoriesSelect";
import { CategoryType } from "@/app/types";

const Categories = async () => {
  const categories = await getAllActiveCategories();


  return (
    <div>
     <CategoriesSelect categories={categories as unknown as CategoryType[]}/>
    </div>
  );
};

export default Categories;
