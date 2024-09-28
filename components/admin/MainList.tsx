"use client";

import { Pencil, PlusIcon, Trash } from "lucide-react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { createNewCategory } from "@/app/actions";
import CategoryTable from "./CategoryTable";
import EditCategoryNameButton from "./EditCategoryNameButton";

type Category = {
  _id: string;
  name: string;
  //date: Date;
};

const AdminMainList = ({ categories }: { categories: string }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoriesArray: Category[] = JSON.parse(categories);
  const [categoriesArrayState, setCategoriesArrayState] =
    useState<{ _id: string; name: string }[]>(categoriesArray);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [inputValue, setInputValue] = useState<string>("");

  const createNewCategoryEvent = async () => {
    if (inputValue.length === 0) return;
    createNewCategory(inputValue)
      .then((data) => {
        onClose();
        //@ts-ignore
        setCategoriesArrayState([...categoriesArrayState, data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Accordion
          onSelectionChange={(e) => console.log(Array.from(e))}
          selectionMode="single"
        >
          {categoriesArrayState.map((category) => (
            <AccordionItem
              key={category._id}
              aria-label={category.name}
              title={category.name}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-1">
                  <EditCategoryNameButton />
                  <Button
                    color="danger"
                    variant="flat"
                    className="font-medium text-rose-600"
                    startContent={<Trash size={18} />}
                  >
                    Удалить категорию
                  </Button>
                </div>
                <div className="flex flex-col gap-1 bg-gray-50 p-1 rounded-md">
                  <div className="font-medium text-lg">Все товары</div>
                  <CategoryTable />
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="hidden lg:block">
        <Button
          variant="flat"
          startContent={<PlusIcon />}
          className="w-[500px] font-medium text-left"
          onPress={onOpen}
        >
          Добавить категорию
        </Button>
      </div>

      <div>
        <div className="fixed bottom-2 left-2 right-2 z-50 lg:hidden">
          <Button
            variant="flat"
            startContent={<PlusIcon />}
            className="w-full font-medium"
            onPress={onOpen}
          >
            Добавить категорию
          </Button>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Добавление категории
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    label="Название категории"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="font-medium"
                  >
                    Отменить
                  </Button>
                  <Button
                    color="success"
                    onPress={createNewCategoryEvent}
                    className="font-medium text-white"
                    isDisabled={inputValue.length === 0}
                  >
                    Сохранить
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default AdminMainList;
