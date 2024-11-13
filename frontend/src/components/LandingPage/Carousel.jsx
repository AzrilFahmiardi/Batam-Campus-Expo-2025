import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import itb from "../../assets/images/itb.png";

import "swiper/css";
import { Autoplay } from "swiper/modules";

const Carousel = () => {
  return (
    <div className="p-10 md:px-10 lg:px-20 lg:py-0">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        centeredSlides={true}
        loop={true}
        modules={[Autoplay]}
        className="p-5"
      >
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <CampusCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const CampusCard = () => {
  return (
    <div className="rounded-full bg-white p-2 shadow-lg lg:p-3">
      <img src={itb} alt="Campus" />
    </div>
  );
};

export default Carousel;
