import { getAllCategories } from "@/app/actions";
import CategoriesSelect from "./CategoriesSelect";

const Categories = async () => {
  const categories = await getAllCategories();

  return (
    <div>
     <CategoriesSelect/>
    </div>
  );
};

export default Categories;
