"use client";

import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

const CategoriesSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");


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
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
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
