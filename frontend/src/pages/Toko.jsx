import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bce from "../assets/images/Toko/bce.svg";
import merchandise from "../assets/images/Toko/merchandise.svg";
import coin from "../assets/images/Toko/coin.png";
import dice from "../assets/images/Toko/dice.png";
import SwagCard from "../components/Toko/SwagCard";
import kaosa from "../assets/images/Toko/kaosa.jpg";
import kaosb from "../assets/images/Toko/kaosb.jpg";

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
          <SwagCard
            img={kaosa}
            name="Jersey Batam Campus Expo"
            description="Jersey eksklusif Batam Campus Expo dengan bahan yang lembut, nyaman, serta menyerap keringat. "
            price={150000}
            isPreOrder={true}
          />
          <SwagCard
            img={kaosb}
            name="Jersey Batam Campus Expo"
            description={
              "Jersey eksklusif Batam Campus Expo dengan bahan yang lembut, nyaman, serta menyerap keringat."
            }
            price={150000}
            isPreOrder={true}
          />
          <SwagCard
            name={"Sticker Pack"}
            description="Tersedia 2 Variasi:
            1. Sticker pack
            2. Kampus Impian: UNS. UNPAD, UNNES, UNDIP, UI, UGM, UB, PPNS, POLTEK BATAM, ITS, ITB, UNAND (dapat dibeli satuan)
"
            price={10000}
          />
          <SwagCard
            name={"Keychain Akrilik"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
          />
          <SwagCard
            name={"Kipas"}
            description={
              "kipas berbahan art cartoon ukuran 15 × 15 cm yang ringan dan mudah dibawa kemanapun. "
            }
            price={10000}
          />
          <SwagCard
            name={"Lanyard"}
            description={
              "Lanyard dengan panjang ±90 cm dan lebar ±2cm bahan tali terbuat dari nylon yang tahan lama. "
            }
            price={20000}
          />
          <SwagCard
            name={"Totebag"}
            description="Totebag dengan bahan kanvas drill berukuran 40 × 33 ×7 cm, disertai dengan resleting."
            price={20000}
          />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Toko;
