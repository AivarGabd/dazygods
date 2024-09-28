import { getAllCategories } from "@/app/actions";

const Categories = async () => {

    const categories = await getAllCategories();

    console.log(categories)

  return (
    <div>
      <h1>Categories</h1>
    </div>
  )
}

export default Categories;