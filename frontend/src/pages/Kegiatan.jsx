<<<<<<< HEAD
const Kegiatan = () => {
  return <div>Kegiatan</div>;
};
export default Kegiatan;
=======
import { Fragment } from "react";
import { useAuth } from "../utils/AuthProvider";
import Header from "../components/Header";
import Calendar from "../components/Kegiatan/Calendar";
import Cloud from "../components/Kegiatan/BackgroundClouds";
import Footer from "../components/Footer";

const Kegiatan = () => {
  const { user, isLoggedIn, hasVoted } = useAuth();
  return (
    <Fragment>
      <Header user={user} />
      <div className="relative bg-blue-gradient p-10">
        <Cloud />
        <h1 className="mt-28 text-center font-pixelify text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Kalender Kegiatan
        </h1>
        <Calendar />
      </div>
      <div className="relative bg-footer-gradient">
        <Footer />
      </div>
    </Fragment>
  );
};
export default Kegiatan;
>>>>>>> kegiatan
