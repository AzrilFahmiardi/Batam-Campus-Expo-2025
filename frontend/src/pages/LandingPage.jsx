import BCEDescription from "../components/LandingPage/BCEDescription";
import CampusInformation from "../components/LandingPage/CampusInformation";
import Carousel from "../components/LandingPage/Carousel";
import Contact from "../components/LandingPage/Contact";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import Location from "../components/LandingPage/Location";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <BCEDescription />
      <Carousel />
      <CampusInformation />
      <Location />
      <Contact />
    </div>
  );
};
export default LandingPage;
