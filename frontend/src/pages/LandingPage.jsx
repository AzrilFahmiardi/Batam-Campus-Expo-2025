import { Fragment } from "react";
import CoinDriver from "../assets/images/LandingPage/Coin-transisi.png";
import DiceDivider from "../assets/images/LandingPage/DiceDivider.png";
import BCEDescription from "../components/LandingPage/BCEDescription";
import Carousel from "../components/LandingPage/Carousel";
import Contact from "../components/LandingPage/Contact";
import FAQ from "../components/LandingPage/FAQ";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import Location from "../components/LandingPage/Location";
import TopLeaderboard from "../components/LandingPage/TopLeaderboard";
import CampusInformation from "../components/LandingPage/CampusInformation";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <Fragment>
      <Header />
      <Hero />
      <div className="relative -z-20 bg-[#EB5E0B] pb-20">
        <img
          src={DiceDivider}
          className="absolute left-0 top-0 z-10 -translate-y-1/2"
        />
        <BCEDescription />
        <Carousel />
      </div>
      <div className="relative -z-20 bg-landing-page-background-gradient pb-20">
        <CampusInformation />
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
      <Footer />
    </Fragment>
  );
};
export default LandingPage;
