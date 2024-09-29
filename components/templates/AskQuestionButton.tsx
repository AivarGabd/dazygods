"use client";

import { MessageCircle } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useIsMobile } from "@/lib/useIsMobile";
import { cn } from "@/lib/utils";

const AskQuestionButton = ({
  itemId,
  size,
  styles,
}: {
  itemId: string;
  size?: "sm" | "md";
  styles?: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isMobile = useIsMobile();

  return (
    <>
      <Button
        className={cn("w-fit font-medium", styles)}
        variant="flat"
        size={size}
        startContent={<MessageCircle size={18} />}
        onClick={(e) => {
          e.preventDefault();
          onOpen();
        }}
      >
        Задать вопрос
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
                Вопрос администратору сайта
              </ModalHeader>
              <ModalBody>
                <Input type="email" placeholder="Ваш email"></Input>
                <Input type="text" placeholder="Ваше имя"></Input>
                <Input type="text" placeholder="Ваш вопрос"></Input>
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

export default AskQuestionButton;
