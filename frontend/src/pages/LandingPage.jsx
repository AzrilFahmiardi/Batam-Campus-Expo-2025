import { Fragment, useState,useEffect } from "react";
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
import TopLeaderboard from "../components/LandingPage/TopLeaderboard";
import Footer from "../components/Footer";
import { useAuth } from "../utils/AuthProvider";



const LandingPage = () => {
  const { user, isLoggedIn, hasVoted } = useAuth();

  return (
    <Fragment>
      <Header user={user}/>
      <Hero id="hero" />
      <div className="relative -z-20 bg-[#EB5E0B]">
      <div
        className="w-full absolute -top-5"
        style={{
          backgroundImage: `url(${DiceDivider})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'contain',
          height: '70px',

        }}
      ></div>
        
        <BCEDescription />
        <Carousel />
      </div>
      <div className="relative -z-20 overflow-hidden bg-landing-page-background-gradient pb-20">
        <TopLeaderboard />
      </div>
      <div className="relative">
      <div
        className="w-full absolute -top-8"
        style={{
          backgroundImage: `url(${CoinDriver})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'contain',
          height: '100px',

        }}
      ></div>
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
