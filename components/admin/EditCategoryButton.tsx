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

const EditCategoryButton = ({
  name,
  isDraft,
  categoryId,
  categoriesArrayState,
  setCategoriesArrayState,
}: {
  name: string;
  isDraft: boolean;
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

  const editCategoryStatus = async (categoryId: string, newStatus: boolean) => {

    editCategoryStatus(categoryId, newStatus).then(() => {
      setCategoriesArrayState((categories: CategoryType[]) =>
        categories.map((category) =>
          category._id === categoryId ? { ...category, isDraft: newStatus } : category
        )
      );
      onClose();
    }).catch((error) => {
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

                <Button className="w-full" variant="flat" onPress={() => {
                    editCategoryStatus(categoryId, !isDraft);
                  }}
                >
                  {isDraft ? "Опубликовать" : "Сделать черновиком"}
                </Button>

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

export default EditCategoryButton;