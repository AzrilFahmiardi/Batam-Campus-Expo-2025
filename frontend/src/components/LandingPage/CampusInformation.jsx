import itb from "../../assets/images/itb.png";
import { Link } from "react-router-dom";
import DiceCampusInformation from "../../assets/images/LandingPage/DiceCampusInformation.png";
import CloudCampusInformation from "../../assets/images/LandingPage/CloudCampusInformation.png";

const CampusInformation = () => {
  return (
    <div className="relative space-y-10 px-10 py-20 md:px-36">
      <img src={CloudCampusInformation} className="l absolute right-0 top-20" />
      <img
        src={DiceCampusInformation}
        className="absolute -left-5 bottom-0 max-w-[150px]"
      />
      <h2 className="text-center font-pixelify text-5xl font-bold text-white">
        Informasi Kampus
      </h2>
      <div className="grid place-items-center">
        <div className="detailed-pixel-border mx-auto bg-white px-20 py-10 shadow-2xl md:px-28">
          <div className="flex flex-col md:flex-row">
            <CampusCard imgUrl={itb} campusName="Institut Teknologi Bandung" />
            <CampusCard imgUrl={itb} campusName="Institut Teknologi Bandung" />
            <CampusCard imgUrl={itb} campusName="Institut Teknologi Bandung" />
          </div>
          <Link
            to={"/kampus"}
            className="pixel-border-selengkapnya block bg-blue-pixel-gradient py-5 text-center font-pixelify text-xl font-bold text-white duration-200 hover:brightness-90"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
};

const CampusCard = ({ imgUrl, campusName }) => {
  return (
    <div className="my-5 flex flex-col gap-5 rounded-xl px-5 py-10 shadow-2xl md:mx-5">
      <img src={imgUrl} />
      <p className="text-center font-montserrat text-lg font-bold">
        {campusName}
      </p>
    </div>
  );
};
export default CampusInformation;
