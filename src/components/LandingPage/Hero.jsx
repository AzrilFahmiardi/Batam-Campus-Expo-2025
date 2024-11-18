import { useState, useEffect } from "react";
import CloudBottomRight from "../../assets/images/LandingPage/CloudBottomRight.png";
import CloudBottomLeft from "../../assets/images/LandingPage/CloudBottomLeft.png";
import CloudBesideCountdown from "../../assets/images/LandingPage/CloudBesideCountdown.png";
import CloudHeroTopLeft from "../../assets/images/LandingPage/CloudHeroTopLeft.png";
import CloudHeroTopRight from "../../assets/images/LandingPage/CloudHeroTopRight.png";
import "animate.css";

const Hero = () => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const totalSeconds = 1 * 86400 + 15 * 3600 + 22 * 60 + 20; // Convert to seconds (1 day + 15 hours + 22 minutes + 20 seconds)
    setCountdown(totalSeconds);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1; // Decrease countdown by 1 second
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400); // 86400 seconds in a day
    const hrs = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${days} : ${hrs} : ${mins} : ${secs}`;
  };

  return (
    <section
      className="relative -z-20 flex h-[120vh] flex-col items-center justify-center overflow-hidden py-10 text-center sm:py-14 md:py-16 lg:py-20 xl:py-24"
      style={{
        background:
          "linear-gradient(180deg, rgba(41, 128, 185, 1), rgba(109, 213, 250, 1), rgba(255, 255, 255, 1))",
      }}
    >
      <img
        src={CloudHeroTopRight}
        className="animate__animated animate__fadeInRight animate__slower absolute right-0 top-24 -z-10 max-w-36 md:max-w-full"
      />
      <img
        src={CloudHeroTopLeft}
        className="animate__animated animate__fadeInLeft animate__slower absolute left-0 top-24 -z-10 max-w-36 translate-y-full md:max-w-full md:translate-y-1/3"
      />
      <img
        src={CloudBottomLeft}
        className="animate__animated animate__fadeInLeft animate__slower absolute bottom-10 left-0 -z-10 md:w-1/3"
      />
      <img
        src={CloudBottomRight}
        className="animate__animated animate__fadeInRight animate__slower absolute bottom-10 right-0 -z-10 md:w-1/3"
      />

      <div className="animate__animated animate__zoomIn animate__slower relative flex h-auto w-full max-w-screen-lg flex-col items-center justify-center px-5 sm:px-10">
        <img
          src="./src/assets/images/Hero-Logo.svg"
          className="mb-8 sm:mb-10 md:mb-12"
        />
        <div className="relative flex justify-center">
          <img
            src={CloudBesideCountdown}
            className="animate__animated animate__fadeIn animate__slower absolute bottom-0 left-0 z-10 max-w-52 translate-y-1/2 md:w-1/2 md:-translate-x-1/4 md:translate-y-1"
          />
          <img
            src="./src/assets/images/count-down.svg"
            className="animate__animated animate__zoomIn animate__slower"
          />
          <div className="animate__animated animate__zoomIn animate__slower absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-pixelify text-2xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {formatTime(countdown)}
            </p>
            <p className="font-pixelify text-xs font-bold text-white sm:text-sm md:text-base lg:text-lg xl:text-xl">
              days | hours | minutes | seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
