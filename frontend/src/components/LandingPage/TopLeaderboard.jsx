import { Link } from "react-router-dom";
import BarBackground from "../../assets/images/LandingPage/BarBackground.png";
import CoinBackground from "../../assets/images/LandingPage/CoinBackground.png";

const TopLeaderboard = () => {
  return (
    <div className="relative space-y-10 px-10 py-20 md:px-36">
      <img
        src={CoinBackground}
        className="absolute -left-20 top-1/2 max-w-[250px]"
      />
      <img src={BarBackground} className="absolute -bottom-40 right-0" />
      <div className="space-y-5">
        <h2 className="text-center font-pixelify text-4xl font-bold text-white md:text-6xl">
          Top Leaderboard From Voting
        </h2>
        <p className="text-center font-montserrat text-sm font-light text-white">
          20 kampus yang terpilih melalui voting tertinggi akan mengadakan{" "}
          <i>booth</i> dikegiatan offline nanti !!!
        </p>
      </div>
      <div className="mx-auto max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        {/* nanti height nya ganti klo udah ada chartnya */}
        <div className="h-[400px]"></div>
        <Link
          to={"/kampus"}
          className="bg-blue-pixel-gradient pixel-border-selengkapnya block py-5 text-center font-pixelify text-xl font-bold text-white duration-200 hover:brightness-90 md:text-2xl"
        >
          Vote Universitas Favoritmu Sekarang!
        </Link>
      </div>
    </div>
  );
};
export default TopLeaderboard;
