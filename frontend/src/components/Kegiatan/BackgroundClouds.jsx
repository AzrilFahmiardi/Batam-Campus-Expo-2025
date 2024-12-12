import Cloudone from "../../assets/images/Voting/cloud1.png";
import Cloudtwo from "../../assets/images/LandingPage/AboutCloud1.png";
import cloudthree from "../../assets/images/Voting/cloud3.png";
import CloudBottomLeft from "../../assets/images/LandingPage/CloudBottomLeft.png";
import CloudBottomRight from "../../assets/images/LandingPage/CloudBottomRight.png";

const BackgroundClouds = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={Cloudone}
        className="absolute -right-16 w-[30%] translate-y-20 sm:-right-20 md:w-[20%] lg:-right-32 lg:translate-y-16"
        alt="Cloud decoration"
      />
      <img
        src={Cloudtwo}
        className="absolute left-1/4 top-20 -z-10 w-[25%] sm:left-[32%] sm:w-[18%]"
      />
      <img
        src={cloudthree}
        className="absolute -left-5 top-[23%] w-[30%] sm:top-1/4 sm:w-[20%]"
      />
      <img
        src={cloudthree}
        className="absolute -right-12 top-[25%] w-[35%] sm:-right-5 sm:top-[28%] sm:w-[20%]"
      />
      <img
        src={Cloudone}
        className="absolute left-1/4 top-[44%] w-[30%] sm:top-[42%] sm:w-[20%]"
        alt="Cloud decoration"
      />
      <img
        src={Cloudtwo}
        className="left-2- absolute bottom-1/3 w-[30%] sm:bottom-1/4 sm:left-14 sm:w-[18%]"
      />
      <img src={CloudBottomLeft} className="absolute bottom-0 left-0 w-1/2" />
      <img src={CloudBottomRight} className="absolute bottom-0 right-0 w-1/2" />
    </div>
  );
};

export default BackgroundClouds;
