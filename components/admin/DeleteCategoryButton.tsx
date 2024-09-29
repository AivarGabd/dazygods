"use client";

import { Button } from "@nextui-org/react";
import { Trash } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { deleteCategory } from "@/app/actions";
import { CategoryType } from "@/app/types";

const DeleteCategoryButton = ({
  categoryId,
  setCategoriesArrayState,
}: {
  categoryId: string;
  setCategoriesArrayState: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = () => {
    deleteCategory(categoryId).then((res) => {
      setCategoriesArrayState((prev) =>
        prev.filter((category) => category._id !== categoryId)
      );
      onClose();
    });
  };

  return (
    <>
      <Button
        color="danger"
        variant="flat"
        className="font-medium text-rose-600 w-full"
        startContent={<Trash size={18} />}
        onPress={onOpen}
      >
        Полностью удалить категорию
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Удаление категории
              </ModalHeader>
              <ModalBody>
                Безвозвратно удалить категорию и все связанные с ней товары?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Отменить
                </Button>
                <Button
                  color="success"
                  variant="flat"
                  className="font-medium text-green-600"
                  onPress={onSubmit}
                >
                  Подтвердить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCategoryButton;
