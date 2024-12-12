import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bce from "../assets/images/Toko/bce.svg";
import merchandise from "../assets/images/Toko/merchandise.svg";
import SwagCard from "../components/Toko/SwagCard";

const Toko = () => {
  return (
    <Fragment>
      <Header />
      <div className="relative flex flex-col items-center justify-center gap-3 bg-footer-gradient p-10 pt-24">
        <img
          src={bce}
          alt="Batam Campus Expo"
          className="max-w-[250px] lg:max-w-sm"
        />
        <img
          src={merchandise}
          alt="Batam Campus Expo"
          className="max-w-full sm:max-w-sm lg:max-w-3xl"
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
