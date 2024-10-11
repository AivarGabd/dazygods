"use client";

import { Button } from "@nextui-org/react";
import { Undo2 } from "lucide-react";

const AboutReturnButton = () => {
  return (
    <Button
      variant="flat"
      className="font-medium"
      endContent={<Undo2 size={18} />}
      onClick={() => {
        
      }}
    >
      О возврате
    </Button>
  );
};

export default AboutReturnButton;
