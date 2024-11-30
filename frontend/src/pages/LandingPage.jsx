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
      <Hero id="hero" />
      <div className="relative -z-20 bg-[#EB5E0B]">
        <img
          src={DiceDivider}
          className="absolute -left-1/4 w-full -translate-y-1/2 scale-150 overflow-x-hidden object-cover object-center sm:left-0 sm:scale-125 md:scale-100"
        />

        <BCEDescription />
        <Carousel />
        {/* <CampusInformation /> */}
      </div>
      <div className="relative z-0 overflow-hidden bg-landing-page-background-gradient pb-20">
        <TopLeaderboard />
      </div>
      <div className="relative">
        <img
          src={CoinDriver}
          className="absolute -left-1/4 -translate-y-1/2 scale-150 overflow-x-hidden sm:left-0 sm:scale-125 md:scale-100"
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
