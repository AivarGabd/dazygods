"use client";

import { CategoryType } from "@/app/types";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const CategoriesSelect = ({ categories }: { categories: CategoryType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const categoriesWithKeys = categories.map((category) => ({
    ...category,
    key: category.name.toLowerCase(),
  }));

  const removeFilter = () => {
    router.push("/");
  };

  return (
    <div className=" flex flex-row gap-2 items-center">
      <Select
        label="Категории"
        placeholder="Выберите категории"
        selectionMode="multiple"
        className="w-full lg:w-[500px] "
        selectedKeys={new Set(filter?.split("."))}
        onSelectionChange={(e) => {
          let arr = Array.from(e);
          router.push(`?filter=${arr.join(".")}`);
        }}
      >
        {categoriesWithKeys.map((category) => (
          <SelectItem key={category.key}>{category.name}</SelectItem>
        ))}
      </Select>
      <Button
        className="text-red-600 align-middle"
        variant="flat"
        color="danger"
        isIconOnly
        disabled={!filter}
        onPress={removeFilter}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};

export default CategoriesSelect;
