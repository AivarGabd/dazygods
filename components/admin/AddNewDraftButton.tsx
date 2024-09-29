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

const AddNewDraftButton = () => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant="flat"
        startContent={<PlusIcon />}
        className="font-medium text-left w-full lg:w-[300px]"
        onPress={onOpen}
      >
        Добавить новый товар
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobile ? "bottom" : "center"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Новый черновик
              </ModalHeader>
              <ModalBody>
                <Input label="Название"></Input>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewDraftButton;
