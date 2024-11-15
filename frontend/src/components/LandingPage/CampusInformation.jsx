import itb from "../../assets/images/itb.png";
import { Link } from "react-router-dom";
import DiceCampusInformation from "../../assets/images/LandingPage/DiceCampusInformation.png";
import CloudCampusInformation from "../../assets/images/LandingPage/CloudCampusInformation.png";
import ArrowButton from "../../assets/images/LandingPage/arrow-button.png";

const CampusInformation = () => {
  return (
    <div className="relative space-y-10 px-10 py-20 md:px-36">
      <img
        src={CloudCampusInformation}
        className="absolute right-0 top-20 z-10 drop-shadow-lg"
      />
      <img
        src={DiceCampusInformation}
        className="absolute -left-5 bottom-0 max-w-[150px]"
      />

      <h2 className="text-center font-pixelify text-6xl font-bold text-white">
        Informasi Kampus
      </h2>

      <div className="relative mx-auto w-[90%] items-center">
        <div className="detailed-pixel-border bg-white p-12">
          <div className="flex justify-center">
            <button>
              <img src={ArrowButton} alt="" className="-rotate-90" />
            </button>
            <div className="bg-pink flex flex-col md:flex-row">
              <CampusCard
                imgUrl={itb}
                campusName="Institut Teknologi Bandung"
              />
              <CampusCard
                imgUrl={itb}
                campusName="Institut Teknologi Bandung"
              />
              <CampusCard
                imgUrl={itb}
                campusName="Institut Teknologi Bandung"
              />
            </div>
            <button>
              <img src={ArrowButton} alt="" className="rotate-90" />
            </button>
          </div>

          <div className="mx-auto mt-5 w-[87%] text-center drop-shadow-2xl">
            <div className="FAQ-border bg-blue-pixel-gradient p-4 text-white duration-200 hover:brightness-90 sm:p-6 lg:p-9">
              <button className="font-pixelify text-sm font-bold md:text-3xl lg:text-5xl">
                Selengkapnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CampusCard = ({ imgUrl, campusName }) => {
  return (
    <div className="my-5 flex h-[450px] flex-col justify-center gap-5 rounded-xl px-5 py-10 shadow-2xl md:mx-5">
      <img src={imgUrl} />
      <p className="text-center font-montserrat text-lg font-bold">
        {campusName}
      </p>
    </div>
  );
};
export default CampusInformation;
