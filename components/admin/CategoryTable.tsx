"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Image,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "react-query";
import { getAllItems } from "@/app/actions";
import { useIsMobile } from "@/lib/useIsMobile";
import AddNewDraftButton from "./AddNewDraftButton";

const CategoryTable = ({ categoryId }: { categoryId: string }) => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = [
    {
      label: "Image",
      key: "image",
    },
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Посещения",
      key: "visits",
    },
  ];

  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: () => getAllItems(categoryId),
  });

  const [selectedKeys, setSelectedKeys] = useState<
    "all" | Iterable<string | number> | undefined
  >(new Set([]));

  if (!data) return <div>Loading...</div>;

  const rows = data.map((item) => ({
    key: item.id,
    image: item.images[0],
    title: item.title,
    visits: item.visits,
  }));

  return (
    <div className="flex flex-col gap-4">
      <Table
        aria-label="Example static collection table"
        isCompact
        removeWrapper
        selectionMode="single"
        defaultSelectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          onOpen();
          setSelectedKeys(keys);
        }}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "image" ? (
                    <Image
                      src={row[columnKey]}
                      alt={row.title}
                      width={100}
                      height={100}
                    />
                  ) : (
                    row[columnKey as keyof typeof row]
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobile ? "top" : "center"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
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

      <AddNewDraftButton />
    </div>
  );
};

export default CategoryTable;
