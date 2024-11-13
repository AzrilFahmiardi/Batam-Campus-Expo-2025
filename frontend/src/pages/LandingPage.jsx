import BCEDescription from "../components/LandingPage/BCEDescription";
import CampusInformation from "../components/LandingPage/CampusInformation";
import Carousel from "../components/LandingPage/Carousel";
import Contact from "../components/LandingPage/Contact";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import Location from "../components/LandingPage/Location";
import TopLeaderboard from "../components/LandingPage/TopLeaderboard";
import FAQ from "../components/LandingPage/FAQ";
import DiceDivider from "../assets/images/LandingPage/DiceDivider.png";
import CoinDriver from "../assets/images/LandingPage/Coin-transisi.png";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <div className="relative -z-20 bg-[#EB5E0B]">
        <img
          src={DiceDivider}
          className="absolute left-0 top-0 z-10 -translate-y-1/2"
        />
        <BCEDescription />
        <Carousel />
      </div>
      <div className="relative -z-20 bg-landing-page-background-gradient pb-20">
        <TopLeaderboard />
      </div>
      <div className="relative">
        <img
          src={CoinDriver}
          alt=""
          className="absolute left-0 top-0 -z-20 -translate-y-1/2"
        />
        <FAQ />
        <Location />
        <Contact />
      </div>
    </div>
  );
};
export default LandingPage;
