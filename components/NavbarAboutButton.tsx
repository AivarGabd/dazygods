'use client'

import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Info } from "lucide-react";
import About from "./templates/About";

const NavbarAboutButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
   <>
    <Button
            onPress={onOpen}
            startContent={<Info size={18} />}
            className="text-sm font-semibold text-default-600 bg-default-100"
            variant="flat"
          >
            О нас
          </Button>

           <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <About />
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

export default NavbarAboutButton;
