import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import itb from "../../assets/images/itb.png";

import "swiper/css";
import { Autoplay } from "swiper/modules";

const Carousel = () => {
  return (
    <div className="px-20">
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        centeredSlides={true}
        loop={true}
        modules={[Autoplay]}
        className="p-10"
      >
        <SwiperSlide>
          <CampusCard />
        </SwiperSlide>
        <SwiperSlide>
          <CampusCard />
        </SwiperSlide>
        <SwiperSlide>
          <CampusCard />
        </SwiperSlide>
        <SwiperSlide>
          <CampusCard />
        </SwiperSlide>
        <SwiperSlide>
          <CampusCard />
        </SwiperSlide>
        <SwiperSlide>
          <CampusCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const CampusCard = () => {
  return (
    <div className="rounded-full bg-white">
      <img src={itb} />
    </div>
  );
};

export default Carousel;
