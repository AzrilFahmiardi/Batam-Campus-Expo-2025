import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import itb from "../../assets/images/itb.png";
import ShadowCarousel from "../../assets/images/LandingPage/shadow-carousel.png";

const Carousel = () => {
  const carouselRef = useRef(null);

  const campusItems = [...Array(25)].map((_, index) => ({
    id: index,
    image: itb
  }));

  return (
    <div className="relative p-4 sm:p-10 md:mt-20">
      <img
        src={ShadowCarousel}
        alt="Shadow"
        className="absolute inset-x-0 -bottom-1 -z-10 mx-auto"
      />

      <div className="overflow-hidden">
        <motion.div 
          ref={carouselRef}
          className="flex"
          animate={{
            x: ["-50%", "0%"],
            transition: {
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }
          }}
        >
          {campusItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="flex-shrink-0 sm:px-4 w-[120px] sm:w-[220px] md:w-[240px] lg:w-[270px] sm:mx-5 bg-blue-gradient py-5 px-7 mx-3 md:py-7 md:px-10 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-full bg-white max-w-fit p-1 sm:p-2">
                <img 
                  src={item.image} 
                  alt={`Campus ${item.id}`} 
                  className="w-[80px] sm:w-[220px] md:w-[240px] lg:w-[270px] h-auto"
                />
              </div>
            </motion.div>
          ))}
          
          {campusItems.map((item) => (
            <motion.div 
              key={`duplicate-${item.id}`} 
              className="flex-shrink-0 px-2 sm:px-4 w-[120px] sm:w-[200px]"
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-full bg-white max-w-fit p-1 sm:p-2">
                <img 
                  src={item.image} 
                  alt={`Campus ${item.id}`} 
                  className="w-[80px] sm:w-[130px] h-auto"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;