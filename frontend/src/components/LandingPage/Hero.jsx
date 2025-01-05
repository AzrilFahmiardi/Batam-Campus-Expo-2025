import { useState, useEffect } from "react";
import CloudBottomRight from "../../assets/images/LandingPage/CloudBottomRight.png";
import CloudBottomLeft from "../../assets/images/LandingPage/CloudBottomLeft.png";
import CloudBesideCountdown from "../../assets/images/LandingPage/CloudBesideCountdown.png";
import CloudHeroTopLeft from "../../assets/images/LandingPage/CloudHeroTopLeft.png";
import CloudHeroTopRight from "../../assets/images/LandingPage/CloudHeroTopRight.png";
import BCELogoHero from "../../assets/images/LandingPage/BCEHeroLogo.png";
import Count from "../../assets/images/LandingPage/Count.png";
import PinLocation from "../../assets/images/LandingPage/Location.png";
import "animate.css";
import { Link } from "react-router-dom";

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
      className="relative flex h-[100vh] flex-col items-center justify-center overflow-hidden py-10 text-center sm:h-[120vh] sm:py-14 md:py-16 lg:py-20 xl:py-24"
      style={{
        background:
          "linear-gradient(180deg, rgba(41, 128, 185, 1), rgba(109, 213, 250, 1), rgba(255, 255, 255, 1))",
      }}
    >
      <img
        src={CloudHeroTopRight}
        className="animate__animated animate__fadeInRight animate__slower absolute -right-10 top-24 max-w-48 md:right-0 md:max-w-full"
      />
      <img
        src={CloudHeroTopLeft}
        className="animate__animated animate__fadeInLeft animate__slower absolute left-0 top-24 max-w-36 translate-y-full md:max-w-full md:translate-y-1/3"
      />
      <img
        src={CloudBottomLeft}
        className="animate__animated animate__fadeInLeft animate__slower absolute bottom-5 left-0 md:w-1/3"
      />
      <img
        src={CloudBottomRight}
        className="animate__animated animate__fadeInRight animate__slower absolute bottom-5 right-0 md:w-1/3"
      />

      <div className="animate__animated animate__zoomIn animate__slower relative flex h-auto w-full max-w-screen-lg flex-col items-center justify-center px-10 sm:px-5">
        <img src={BCELogoHero} className="mb-3 md:mb-0" />
        <div className="mb-3 font-montserrat text-white">
          <div className="mb-2 inline-flex items-center justify-start gap-2 rounded-[20px] bg-[rgba(41,128,185,0.48)] px-5 py-2 sm:gap-3">
            <img src={PinLocation} className="h-[10px] sm:h-[25px] sm:p-1" />
            <p className="text-[7px] sm:text-xs md:text-base">
              Jl. Engku Putri, Tlk. Tering, Kec. Batam Kota, Kota Batam,
              Kepulauan Riau
            </p>
          </div>
          {/* <div className="inline-flex items-center justify-start gap-2 rounded-[20px] bg-[rgba(41,128,185,0.48)] px-5 py-2 sm:gap-3">
            <img src={PinLocation} className="h-[10px] sm:h-[25px] sm:p-1" />
            <p className="text-[7px] sm:text-xs md:text-base">
              Jl. Berdua tapi gak jadian, Kec. Harapan, Kota Batam
            </p>
          </div> */}
        </div>
        <div className="relative flex justify-center">
          <img
            src={CloudBesideCountdown}
            className="animate__animated animate__fadeIn animate__slower absolute -left-10 bottom-0 z-10 max-w-36 translate-y-1/2 md:left-0 md:w-1/2 md:max-w-52 md:-translate-x-1/4 md:translate-y-1"
          />
          <img
            src={Count}
            className="animate__animated animate__zoomIn animate__slower mt-2 h-[70px] sm:h-[110px] md:h-[130px] lg:h-[160px]"
          />
          <div className="animate__animated animate__zoomIn animate__slower absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-pixelify text-2xl font-bold tracking-widest text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {formatTime(countdown)}
            </p>
            <p className="font-pixelify text-xs font-bold tracking-widest text-white sm:text-sm md:text-base lg:text-lg xl:text-xl">
              days | hours | minutes | seconds
            </p>
          </div>
        </div>
        <div className="mt-5">
          <Link
            to={"/ticket"}
            className="rounded-full bg-[#EB5E0B] px-4 py-2 font-pixelify text-sm font-bold text-white shadow-lg hover:opacity-80 sm:px-5 sm:py-2 sm:text-base md:px-8 md:py-4"
          >
            Get Your Ticket Now!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
