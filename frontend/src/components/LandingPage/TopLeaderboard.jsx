import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BarBackground from "../../assets/images/LandingPage/BarBackground.png";
import CoinBackground from "../../assets/images/LandingPage/CoinBackground.png";
import createChart from "../../utils/renderChart";
import { getAllUniversity } from "../../utils/UniversityFetch";
import { a } from "framer-motion/client";

const TopLeaderboard = () => {
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCHIN FOR UNIVERSITIES CHART
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUniversity();
        const formattedData = data.slice(0, 4).map((uni) => ({
          campus: uni.nama,
          votes: uni.jumlah_voting,
          logo: uni.logo,
        }));
        setUniversities(formattedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching university data: ", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (universities.length > 0) {
      const chart = createChart("chartdiv", universities);

      return () => chart.dispose();
    }
  }, [universities]);
  return (
    <div className="space-y-10 px-10 py-20 md:px-36">
      <img
        src={CoinBackground}
        className="absolute -left-20 top-1/2 max-w-[200px] md:max-w-[250px]"
      />
      <img
        src={BarBackground}
        className="absolute -bottom-20 right-0 max-w-40 md:-bottom-40 md:max-w-full"
      />
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
          to={"/voting"}
          className="pixel-border-selengkapnya block bg-blue-pixel-gradient py-5 text-center font-pixelify text-xl font-bold text-white duration-200 hover:brightness-90 md:text-2xl"
        >
          Vote Kampus Favoritmu Sekarang!
        </Link>
      </div>
    </div>
  );
};
export default TopLeaderboard;
