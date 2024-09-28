'use client'

import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { useSelectedLayoutSegments } from "next/navigation";
import { useRouter } from 'next/navigation';



//Сделать кастомные категории
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
  { key: "crocodile", label: "Crocodile" }
];


const CategoriesSelect = () => {
  const segment: string = useSelectedLayoutSegments()[0]
  const pathName = `/${segment ? segment : ''}`
  const { push } = useRouter();


  //?filter=completed.watching
  return (
    <Select
      size="sm"
      label="Favorite Animal"
      placeholder="Select an animal"
      selectionMode="multiple"
      className="max-w-xs"
      onSelectionChange={(e) => {
        let arr = Array.from(e)
        //push('1,2')
      }}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default CategoriesSelect;