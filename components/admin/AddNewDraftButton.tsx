"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import { PlusIcon } from "lucide-react";
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
import { Item } from "@/app/types";
import EditItemData from "../templates/EditItemData";

const AddNewDraftButton = ({categoryName}:{categoryName:string}) => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
  const newDraftItem: Item = {
    _id: "",
    title: "",
    description: "",
    price: "",
    images: [],
    categoryKey: categoryName.toLowerCase(),
    draft: true,
    code: "",
    count: 0,
    peculiarities: [],
    characteristics: [],
    questions: [],
    stock: "0",
    visits: 0,
    purchases: 0,
  };
  return (
    <>
      <Button
        variant="flat"
        startContent={<PlusIcon />}
        className="font-medium text-left w-full lg:w-[300px]"
        onPress={onOpen}
      >
        Добавить новый черновик товара
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobile ? "bottom" : "center"}
         size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Новый черновик
              </ModalHeader>
              <ModalBody>
             
               <EditItemData item={newDraftItem} asNewDraft={true} />
              </ModalBody>
             
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewDraftButton;
