"use client";

import { editCategoryName } from "@/app/actions";
import { CategoryType } from "@/app/types";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
} from "@nextui-org/react";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteCategoryButton from "./DeleteCategoryButton";

const EditCategoryNameButton = ({
  name,
  categoryId,
  categoriesArrayState,
  setCategoriesArrayState,
}: {
  name: string;
  categoryId: string;
  categoriesArrayState: CategoryType[];
  setCategoriesArrayState: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}) => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState<string>(name);

  const editCategoryNameEvent = async (categoryId: string, newName: string) => {
    editCategoryName(categoryId, newName)
      .then((data) => {
        const obj = categoriesArrayState.find(
          (category) => category._id === categoryId
        );
        let newData = { ...obj, name: data.name } as CategoryType;

        setCategoriesArrayState((categories: CategoryType[]) =>
          categories.map((category) =>
            category._id === categoryId ? newData : category
          )
        );

        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Button
        variant="flat"
        className="font-medium"
        startContent={<Pencil size={18} />}
        onPress={onOpen}
      >
        Редактирование
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobile ? "top" : "center"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Редактирование название категории
              </ModalHeader>
              <ModalBody>
                <Input
                  defaultValue={name}
                  onChange={(e) => setInputValue(e.target.value)}
                />

              <DeleteCategoryButton
              categoryId={categoryId}
              setCategoriesArrayState={setCategoriesArrayState}
              />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  className="font-medium text-rose-600"
                >
                  Отменить
                </Button>
                <Button
                  color="success"
                  className="font-medium text-white"
                  isDisabled={inputValue.length === 0}
                  onPress={() => {
                    editCategoryNameEvent(categoryId, inputValue);
                  }}
                >
                  Сохранить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCategoryNameButton;
