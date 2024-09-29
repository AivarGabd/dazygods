"use client";

import { Button } from "@nextui-org/react";
import { MessageCircle } from "lucide-react";

const AskQuestionButton = () => {
  return (
    <Button
      className="w-fit font-medium"
      variant="flat"
      startContent={<MessageCircle size={18} />}
    >
      Задать вопрос
    </Button>
  );
};

export default AskQuestionButton;
