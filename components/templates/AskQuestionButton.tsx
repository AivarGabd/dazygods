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
import EmailInput from "./EmailInput";
import { useState, FormEvent } from "react";
import { askQuestion } from "@/app/actions";

const AskQuestionButton = ({
  itemId,
  size,
  styles,
}: {
  itemId: string;
  size?: "sm" | "md";
  styles?: string;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const isMobile = useIsMobile();

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);
  const isQuestionValid = question != null && question.length >= 5;
  const isButtonDisabled = !isEmailValid || !isQuestionValid;



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const question = formData.get("question") as string;
    const result = await askQuestion({email, question, itemId});
    if (result.success) {
      onClose();
      setQuestion(null);
      setIsEmailValid(false);
    }
  };

  return (
    <>
      <Button
        className={cn("w-fit font-medium", styles)}
        variant="flat"
        size={size}
        startContent={<MessageCircle size={18} />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
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
                Вопрос по товару
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <EmailInput
                      isEmailValid={isEmailValid}
                      setIsEmailValid={setIsEmailValid}
                    />
                    <Input
                      type="text"
                      placeholder="Ваш вопрос"
                      isInvalid={question != null && question.length < 5}
                      color={
                        question != null
                          ? question.length < 5
                            ? "danger"
                            : "success"
                          : "default"
                      }
                      isClearable
                      onClear={() => setQuestion(null)}
                      value={question != null ? question : ""}
                      onChange={(e) => setQuestion(e.target.value)}
                    ></Input>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      className="font-semibold"
                      color="danger"
                      variant="light"
                      onPress={onClose}
                    >
                      Отмена
                    </Button>
                    <Button
                      variant="flat"
                      type="submit"
                      disabled={isButtonDisabled}
                      className={`font-semibold ${isButtonDisabled ? "text-gray-500 opacity-50" : ""}`}
                    >
                      Отправить вопрос
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AskQuestionButton;
