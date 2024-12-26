import { Fragment } from "react";
import { useAuth } from "../utils/AuthProvider";
import Header from "../components/Header";
import Calendar from "../components/Kegiatan/Calendar";
import Cloud from "../components/Kegiatan/BackgroundClouds";
import Footer from "../components/Footer";
import Hero from "../assets/images/Kegiatan/hero.png";

const Kegiatan = () => {
  const { user, isLoggedIn, hasVoted } = useAuth();
  return (
    <Fragment>
      <Header user={user} />
      <div className="relative bg-blue-gradient p-10">
        <Cloud />
        <img src={Hero} className="mx-auto mt-28 block w-full md:w-3/4" />
        <Calendar />
      </div>
      <div className="relative bg-footer-gradient">
        <Footer />
      </div>
    </Fragment>
  );
};
export default Kegiatan;
