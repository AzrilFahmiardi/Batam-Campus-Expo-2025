import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import itb from "../../assets/images/itb.png";
import ShadowCarousel from "../../assets/images/LandingPage/shadow-carousel.png";

import "swiper/css";
import { Autoplay } from "swiper/modules";

const Carousel = () => {
  return (
    <div className="p-10">
      <img
        src={ShadowCarousel}
        alt="Shadow"
        className="absolute inset-x-0 -bottom-1 -z-10 mx-auto"
      />

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
