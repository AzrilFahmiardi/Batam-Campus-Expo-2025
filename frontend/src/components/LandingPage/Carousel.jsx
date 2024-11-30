import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ShadowCarousel from "../../assets/images/LandingPage/shadow-carousel.png";
import { getAllUniversity } from '../../utils/UniversityFetch';

// Komponen Loading Skeleton
const LogoSkeleton = () => (
  <motion.div 
    className="flex-shrink-0 sm:px-4 h-[100px] sm:h-[250px] w-[120px] sm:w-[220px] md:w-[240px] lg:w-[270px] sm:mx-5 bg-blue-gradient py-5 px-7 mx-3 md:py-7 md:px-10 rounded-2xl animate-pulse"
  >

  </motion.div>
);

const Carousel = () => {
  const carouselRef = useRef(null);
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedLogos, setLoadedLogos] = useState({});

  // FETCHING FOR CAROUSEL LOGO
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUniversity();
        setUniversities(data);
        console.log(data);
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching university data: ", err);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Handler untuk melacak logo yang sudah dimuat
  const handleLogoLoad = (id) => {
    setLoadedLogos(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const campusItems = universities.map((uni, index) => ({
    id: index,
    image: uni.logo,
  }));

  return (
    <div className="relative p-4 sm:p-10 md:mt-20">
      {/* <img
        src={ShadowCarousel}
        alt="Shadow"
        className="absolute inset-x-0 -bottom-1 -z-10 mx-auto"
      /> */}

      <div className="overflow-hidden pb-7">
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
          {isLoading 
            ? Array(6).fill().map((_, index) => <LogoSkeleton key={index} />) 
            : campusItems.map((item) => (
              <motion.div 
                key={item.id} 
              className="flex-shrink-0 sm:px-4 w-[120px] sm:w-[220px] md:w-[240px] lg:w-[270px] mx-1 sm:mx-5 py-2 sm:py-5 px-2 rounded-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="rounded-full  max-w-fit p-5 bg-white drop-shadow-[20px_20px_7px_rgba(0,0,0,0.25)] sm:drop-shadow-[35px_35px_10px_rgba(0,0,0,0.25)]">
                  {!loadedLogos[item.id] && (
                    <div className="animate-pulse bg-gray-300 w-[80px] sm:w-[220px] md:w-[240px] lg:w-[270px] h-[80px] sm:h-[220px] md:h-[240px] lg:h-[270px]" />
                  )}
                  <img 
                    src={item.image} 
                    alt={`Campus ${item.id}`} 
                    className={`w-[100px] sm:w-[130px] md:w-[150px] lg:w-[170px] h-auto ${!loadedLogos[item.id] ? 'hidden' : ''}`}
                    onLoad={() => handleLogoLoad(item.id)}
                  />
                </div>
              </motion.div>
          ))}
          
          {!isLoading && campusItems.map((item) => (
            <motion.div 
              key={`duplicate-${item.id}`} 
              className="flex-shrink-0 px-2 sm:px-4 w-[120px] sm:w-[200px]"
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-full bg-white max-w-fit p-1 sm:p-2">
                {!loadedLogos[item.id] && (
                  <div className="animate-pulse bg-gray-300 w-[80px] sm:w-[130px] h-[80px] sm:h-[130px]" />
                )}
                <img 
                  src={item.image} 
                  alt={`Campus ${item.id}`} 
                  className={`w-[80px] sm:w-[130px] h-auto ${!loadedLogos[item.id] ? 'hidden' : ''}`}
                  onLoad={() => handleLogoLoad(item.id)}
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