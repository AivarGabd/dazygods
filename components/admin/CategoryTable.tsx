"use client";

import React, { useEffect, useState } from "react";
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
import EditItemData from "../templates/EditItemData";
import { Selection } from "@react-types/shared";
import { Item } from "@/app/types";


type row = {
  key: string;
  image: string;
  title: string;
  visits: number;
  draft: boolean;
  category: string;
}

const CategoryTable = ({ categoryId, categoryName }: { categoryId: string, categoryName: string }) => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = [
    {
      label: "Картинка",
      key: "image",
    },
    {
      label: "Название",
      key: "title",
    },
    {
      label: "Посещения",
      key: "visits",
    },
    {
      label: "Видимость",
      key: "draft",
    },
  ];

  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: () => getAllItems(categoryId),
  });

  const [selectedCell, setSelectedCell] = useState<Selection>(new Set([]));

  useEffect(() => {
    if (!isOpen) setSelectedCell(new Set([]));
  }, [isOpen]);

  if (!data) return <div>Loading...</div>;

  

  const rows:row[] = data.map((item: Item) => ({
    key: item._id?.toString() || "",
    image: item.images[0],
    title: item.title,
    visits: item.visits,
    draft: item.draft,
  }));

  let selectedItem: Item | undefined = undefined;
  if (Array.from(selectedCell).length) {
    selectedItem = data.find(
      (item: Item) => item._id?.toString() == Array.from(selectedCell)[0].toString()
    ) as Item;
  }

  return (
    <div className="flex flex-col gap-4">
      <Table
        aria-label="Example static collection table"
        isCompact
        removeWrapper
        selectionMode="single"
        selectedKeys={selectedCell}
        onSelectionChange={(keys: Selection) => {
          onOpen();
          setSelectedCell(keys);
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
                    <div>
                      {row[columnKey as keyof typeof row]}

                      {columnKey === "draft" && (
                        <>{row.draft ? "Черновик" : "Опубликовано"}</>
                      )}
                    </div>
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
        size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Редактирование товара
              </ModalHeader>
              <ModalBody>
                <EditItemData item={selectedItem as Item} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <AddNewDraftButton categoryName={categoryName} />
    </div>
  );
};

export default CategoryTable;
