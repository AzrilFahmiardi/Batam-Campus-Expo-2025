import { useEffect } from "react";
import { Link } from "react-router-dom";
import BarBackground from "../../assets/images/LandingPage/BarBackground.png";
import CoinBackground from "../../assets/images/LandingPage/CoinBackground.png";
import createChart from "../../utils/renderChart";

const TopLeaderboard = () => {
  const data = [
    { campus: "Universitas Harvard", votes: 4025 },
    { campus: "Institut Teknologi Massachusetts", votes: 1882 },
    { campus: "Politeknik Negeri Singapore", votes: 1809 },
    { campus: "Universitas Boston", votes: 1322 },
    { campus: "Universitas Tokyo", votes: 1122 },
  ];

  useEffect(() => {
    const chart = createChart("chartdiv", data);

    return () => {
      chart.dispose();
    };
  }, []);

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
      <div className="mx-auto max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl">
        <div className="h-[400px]">
          <div id="chartdiv" className="h-full"></div>
        </div>
        <Link
          to={"/kampus"}
          className="pixel-border-selengkapnya block bg-blue-pixel-gradient py-5 text-center font-pixelify text-xl font-bold text-white duration-200 hover:brightness-90 md:text-2xl"
        >
          Vote Universitas Favoritmu Sekarang!
        </Link>
      </div>
    </div>
  );
};
export default TopLeaderboard;
