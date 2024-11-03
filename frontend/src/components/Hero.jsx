import { useState, useEffect } from "react";

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

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to format the countdown into DD:HH:MM:SS
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400); // 86400 seconds in a day
    const hrs = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${days} : ${hrs} : ${mins} : ${secs}`;
  };

  return (
    <section
      className="flex flex-col items-center justify-center text-center py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 relative h-screen"
      style={{
        background:
          "linear-gradient(180deg, rgba(41, 128, 185, 1), rgba(109, 213, 250, 1), rgba(255, 255, 255, 1))",
      }}
    >
      <div className="max-w-screen-lg w-full h-auto flex flex-col items-center justify-center relative">
        <img
          src="./src/assets/images/Hero-Logo.svg"
          alt="Hero"
          className="mb-8 sm:mb-10 md:mb-12"
        />
        <div className="relative flex justify-center">
          <img src="./src/assets/images/count-down.svg" alt="Countdown" />
          <div className="absolute flex flex-col items-center justify-center inset-0">
            <p className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-pixelify">
              {formatTime(countdown)}
            </p>
            <p className="text-white font-bold font-pixelify text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              days | hours | minutes | seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
