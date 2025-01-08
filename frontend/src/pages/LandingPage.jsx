import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CoinDriver from "../assets/images/LandingPage/Coin-transisi.png";
import DiceDivider from "../assets/images/LandingPage/DiceDivider.png";
import BCEDescription from "../components/LandingPage/BCEDescription";
import Carousel from "../components/LandingPage/Carousel";
import Contact from "../components/LandingPage/Contact";
import FAQ from "../components/LandingPage/FAQ";
import Header from "../components/Header";
import Hero from "../components/LandingPage/Hero";
import Location from "../components/LandingPage/Location";
// import CampusInformation from "../components/LandingPage/CampusInformation";
import TopLeaderboard from "../components/LandingPage/TopLeaderboard";
import Footer from "../components/Footer";
import { useAuth } from "../utils/AuthProvider";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { user, isLoggedIn, hasVoted } = useAuth();

  return (
    <Fragment>
      <Header user={user} />
      <Hero user={user} id="hero" />
      <div className="relative z-0 bg-[#EB5E0B]">
        <img
          src={DiceDivider}
          className="absolute -left-1/4 w-full -translate-y-1/2 scale-150 sm:scale-150 md:left-0 md:scale-100"
        />

        <BCEDescription />
        <Carousel />
        <div className="px-5">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
            <p className="font-montserrat text-7xl font-bold text-white sm:text-9xl">
              480
            </p>
            <div className="mb-5 space-y-3 sm:mb-0">
              <p className="text-center font-montserrat text-xl font-bold text-white sm:text-left sm:text-4xl">
                Total Pendaftar!!
              </p>
              <p className="max-w-64 text-center font-montserrat text-sm text-white sm:max-w-xs sm:text-justify sm:text-base">
                Segera daftarkan dirimu ke dalam acara ini! dapatkan pengalaman
                yang sangat menarik di Batam Campus Expo 2025!
              </p>
            </div>
          </div>
        </div>
        {/* <CampusInformation /> */}
      </div>
      <div className="relative z-0 overflow-hidden bg-landing-page-background-gradient pb-20">
        <TopLeaderboard />
      </div>
      <div className="relative">
        <img
          src={CoinDriver}
          className="absolute -left-1/4 -translate-y-1/2 scale-150 sm:scale-150 md:left-0 md:scale-100"
        />
        <FAQ />
        <Location />
        <Contact />
      </div>
      <div className="bg-footer-gradient">
        <Footer />
      </div>
    </Fragment>
  );
};
export default LandingPage;
