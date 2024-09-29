"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const ImagesCarousel = ({ images }: { images: string[] }) => {
  return (
    <Swiper
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
