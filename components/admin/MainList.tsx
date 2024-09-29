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
import { useEffect, useState } from "react";
import { createNewCategory, editCategoryName } from "@/app/actions";
import CategoryTable from "./CategoryTable";
import EditCategoryNameButton from "./EditCategoryNameButton";
import { useIsMobile } from "@/lib/useIsMobile";
import { CategoryType } from "@/app/types";
import DeleteCategoryButton from "./DeleteCategoryButton";

const AdminMainList = ({ categories }: { categories: CategoryType[] }) => {
  const isMobile = useIsMobile();

  const [categoriesArrayState, setCategoriesArrayState] = useState(categories);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [inputValue, setInputValue] = useState<string>("");

  const createNewCategoryEvent = async () => {
    if (inputValue.length === 0) return;
    createNewCategory(inputValue)
      .then((data) => {
        onClose();
        setCategoriesArrayState([
          ...categoriesArrayState,
          data as CategoryType,
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (isOpen) return;
    setInputValue("");
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Accordion selectionMode="single">
          {categoriesArrayState.map((category) => (
            <AccordionItem
              key={category._id}
              aria-label={category.name}
              title={category.name}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-1">
                  <EditCategoryNameButton
                    name={category.name}
                    categoryId={category._id}
                    categoriesArrayState={categoriesArrayState}
                    setCategoriesArrayState={setCategoriesArrayState}
                  />
                </div>
                <div className="flex flex-col gap-1 bg-gray-50 p-1 rounded-md">
                  <div className="font-medium text-lg">Все товары</div>
                  <CategoryTable categoryId={category._id} />
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
        <div className="fixed bottom-[78px] left-2 right-2 z-50 lg:hidden">
          <Button
            variant="flat"
            startContent={<PlusIcon />}
            className="w-full font-medium"
            onPress={onOpen}
          >
            Добавить категорию
          </Button>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement={isMobile ? "top" : "center"}
        >
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
