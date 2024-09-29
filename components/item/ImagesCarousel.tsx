"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useIsMobile } from "@/lib/useIsMobile";

const ImagesCarousel = ({ images }: { images: string[] }) => {
  const isMobile = useIsMobile();

  return (
    <Swiper
      direction={isMobile ? "horizontal" : "vertical"}
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {images.map((x) => (
        <SwiperSlide>
          <img src={x} alt={x} className="h-[100px]" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagesCarousel;
