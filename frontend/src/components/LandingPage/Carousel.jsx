import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShadowCarousel from "../../assets/images/LandingPage/shadow-carousel.png";
import { getAllUniversity } from "../../utils/UniversityFetch";

// Komponen Loading Skeleton
const LogoSkeleton = () => (
  <motion.div className="mx-3 h-[100px] w-[120px] flex-shrink-0 animate-pulse rounded-2xl bg-blue-gradient px-7 py-5 sm:mx-5 sm:h-[250px] sm:w-[220px] sm:px-4 md:w-[240px] md:px-10 md:py-7 lg:w-[270px]"></motion.div>
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
        setUniversities([...data, ...data, ...data]);

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
    setLoadedLogos((prev) => ({
      ...prev,
      [id]: true,
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
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          }}
        >
          {isLoading
            ? Array(6)
                .fill()
                .map((_, index) => <LogoSkeleton key={index} />)
            : campusItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="mx-1 w-[120px] flex-shrink-0 rounded-2xl px-2 py-2 sm:mx-5 sm:w-[220px] sm:px-4 sm:py-5 md:w-[240px] lg:w-[270px]"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="max-w-fit rounded-full bg-white p-3 drop-shadow-[20px_20px_7px_rgba(0,0,0,0.25)] sm:p-4 sm:drop-shadow-[35px_35px_10px_rgba(0,0,0,0.25)] md:p-5">
                    {!loadedLogos[item.id] && (
                      <div className="h-[80px] w-[80px] animate-pulse bg-gray-300 sm:h-[220px] sm:w-[220px] md:h-[240px] md:w-[240px] lg:h-[270px] lg:w-[270px]" />
                    )}
                    <img
                      src={item.image}
                      alt={`Campus ${item.id}`}
                      className={`h-auto w-[100px] sm:w-[130px] md:w-[150px] lg:w-[170px] ${!loadedLogos[item.id] ? "hidden" : ""}`}
                      onLoad={() => handleLogoLoad(item.id)}
                    />
                  </div>
                </motion.div>
              ))}

          {!isLoading &&
            campusItems.map((item) => (
              <motion.div
                key={`duplicate-${item.id}`}
                className="w-[120px] flex-shrink-0 px-2 sm:w-[200px] sm:px-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="max-w-fit rounded-full bg-white p-1 sm:p-2">
                  {!loadedLogos[item.id] && (
                    <div className="h-[80px] w-[80px] animate-pulse bg-gray-300 sm:h-[130px] sm:w-[130px]" />
                  )}
                  <img
                    src={item.image}
                    alt={`Campus ${item.id}`}
                    className={`h-auto w-[80px] sm:w-[130px] ${!loadedLogos[item.id] ? "hidden" : ""}`}
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
