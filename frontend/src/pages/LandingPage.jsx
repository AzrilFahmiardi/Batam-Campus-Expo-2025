import BCEDescription from "../components/LandingPage/BCEDescription";
import CampusInformation from "../components/LandingPage/CampusInformation";
import Carousel from "../components/LandingPage/Carousel";
import Contact from "../components/LandingPage/Contact";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import Location from "../components/LandingPage/Location";
import TopLeaderboard from "../components/LandingPage/TopLeaderboard";
import DiceDivider from "../assets/images/LandingPage/DiceDivider.png";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <div className="bg-landing-page-background-gradient relative -z-20">
        <img
          src={DiceDivider}
          className="absolute left-0 top-0 z-10 -translate-y-1/2"
        />
        <BCEDescription />
        <Carousel />
        <CampusInformation />
        <TopLeaderboard />
      </div>
      <Location />
      <Contact />
    </div>
  );
};
export default LandingPage;
