import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bce from "../assets/images/Toko/bce.svg";
import merchandise from "../assets/images/Toko/merchandise.svg";
import coin from "../assets/images/Toko/coin.png";
import dice from "../assets/images/Toko/dice.png";
import SwagCard from "../components/Toko/SwagCard";

const Toko = () => {
  return (
    <Fragment>
      <Header />
      <div className="relative flex flex-col items-center justify-center gap-3 bg-footer-gradient p-10 pt-24">
        <img
          src={coin}
          className="absolute left-2 top-10 max-w-16 sm:left-10 sm:top-20 sm:max-w-40"
        />
        <img
          src={dice}
          className="absolute right-2 top-40 max-w-16 sm:right-10 sm:top-36 sm:max-w-40"
        />
        <img
          src={bce}
          alt="Batam Campus Expo"
          draggable="false"
          className="animate__animated animate__zoomIn max-w-[250px] lg:max-w-sm"
        />
        <img
          src={merchandise}
          alt="Batam Campus Expo"
          draggable="false"
          className="animate__animated animate__zoomIn max-w-full sm:max-w-sm lg:max-w-3xl"
        />
        <p className="mt-10 font-pixelify text-sm text-white sm:text-base md:mt-20 md:text-3xl">
          Get Your&apos;s Now!!
        </p>

        <div className="grid w-full grid-cols-1 gap-3 py-5 sm:grid-cols-2 sm:py-10 md:py-20 xl:grid-cols-3">
          <SwagCard />
          <SwagCard />
          <SwagCard />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Toko;
