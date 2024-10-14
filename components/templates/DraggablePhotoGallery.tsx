"use client";

import { deleteItemImages, updateImagesOrder } from "@/app/actions";
import { useIsMobile } from "@/lib/useIsMobile";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { useCallback, useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";

interface DragItem {
  index: number;
  id: string;
  type: string;
}
const ItemTypes = {
  IMAGE: "image",
};

const ImageCard = ({
  id,
  image,
  index,
  moveCard,
  deleteImage,
  isMobile,
}: {
  id: string;
  image: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  deleteImage: (index: number) => void;
  isMobile: boolean;
}) => {

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.IMAGE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 bg-gray-100 p-2 rounded-lg"
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <img
        src={image}
        width={isMobile ? 100 : 200}
        height={isMobile ? 100 : 200}
      ></img>
      <Button
        size="sm"
        className="m-auto"
        variant="solid"
        color="danger"
        isIconOnly
        onClick={() => deleteImage(index)}
      >
        <X />
      </Button>
    </div>
  );
};

const Container = ({
  images,
  itemId,
  setImages,
}: {
  images: string[];
  itemId: string;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const isMobile = useIsMobile();

  const deleteImage = (index: number) => {
    deleteItemImages(itemId, index).then((data) => {
      setImages(data);
    });
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevImages) =>
      update(prevImages, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevImages[dragIndex]],
        ],
      })
    );
    //update images order in db
    updateImagesOrder(itemId, images);
  }, []);

  const renderImageCard = useCallback((image: string, index: number) => {
    return (
      <ImageCard
        key={index}
        id={image}
        image={image}
        index={index}
        moveCard={moveCard}
        deleteImage={deleteImage}
        isMobile={isMobile}
      />
    );
  }, []);
  return (
    <div className="w-full  flex gap-2 max-w-full overflow-x-auto">
      {images.map((image, index) => renderImageCard(image, index))}
    </div>
  );
};

const DraggablePhotoGallery = ({
  images,
  itemId,
  setImages,
}: {
  images: string[];
  itemId: string;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}) => (
  <DndProvider backend={HTML5Backend}>
    <Container images={images} itemId={itemId} setImages={setImages} />
  </DndProvider>
);

export default DraggablePhotoGallery;
