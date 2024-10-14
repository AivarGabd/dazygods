"use client";

import { Item } from "@/app/types";

import { useIsMobile } from "@/lib/useIsMobile";
import {
  Button,
  Input,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  Textarea,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DraggablePhotoGallery from "./DraggablePhotoGallery";
import { addNewDraftItem } from "@/app/actions";

const EditItemPhotos = ({
  images,
  setImages,
  itemId,
}: {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  itemId: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();

    acceptedFiles.forEach((file, index) => {
      formData.append(`image${index}`, file);
      formData.append("itemId", itemId);
    });

    fetch("/api/uploadFile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImages([...images, ...data.imgLinks]);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  return (
    <>
      <Button onPress={onOpen} variant="flat" size="sm" className="font-semibold">Редактировать фотографии и их очередь</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col gap-4">
                <DraggablePhotoGallery
                  images={images}
                  setImages={setImages}
                  itemId={itemId}
                />

                <div className="flex flex-col gap-2 а">
                  <div className="font-semibold">Добавить фото</div>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 rounded-lg bg-default-100"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Перетащите изображения сюда...</p>
                    ) : (
                      <p>Перетащите изображения сюда или нажмите для выбора</p>
                    )}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default function EditItemData({
  item,
  asNewDraft,
}: {
  item: Item;
  asNewDraft?: boolean;
}) {
  const [images, setImages] = useState(item.images);

  if (!item) return <>Loading...</>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (asNewDraft) {
      addNewDraftItem(item).then((newDraftItem) => {
        console.log(newDraftItem);
      });
    } else {
      //editItemData(item._id, !item.draft);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Input label="Название" defaultValue={item.title}></Input>
        <Input type="number" label="Цена" defaultValue={item.price}></Input>
        <Input type="number" label="Артикул" defaultValue={item.code}></Input>
        <Input
          type="number"
          label="Количество в наличии"
          defaultValue={item.stock.toString()}
        ></Input>
        <Textarea label="Описание" defaultValue={item.description}></Textarea>

       {asNewDraft ? <></> : <div>
        <div>
          <EditItemPhotos
            images={images}
            setImages={setImages}
            itemId={item._id?.toString() || ""}
          />
        </div>
        </div>}
      </div>
     <div className="flex w-full justify-end gap-2">
     {asNewDraft ? (
        <Button
          variant="flat"
          className="font-semibold mt-2 lg:mt-6"
          type="submit"
        >
          Добавить новый черновик
        </Button>
      ) : (
        <Button
          variant="flat"
          className="font-semibold mt-2 lg:mt-6"
          type="submit"
        >
          {item.draft ? "Сделать товар видимым" : "Сделать товар черновиком"}
        </Button>
      )}
     </div>
    </form>
  );
}
