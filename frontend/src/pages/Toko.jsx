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
import ipb_keychain from "../assets/images/Toko/ipb_keychain.PNG";
import itb_keychain from "../assets/images/Toko/itb_keychain.PNG";
import its_keychain from "../assets/images/Toko/its_keychain.JPG";
import poltek_batam_keychain from "../assets/images/Toko/poltek_batam_keychain.JPG";
import ub_keychain from "../assets/images/Toko/ub_keychain.JPG";
import ugm_keychain from "../assets/images/Toko/ugm_keychain.JPG";
import ui_keychain from "../assets/images/Toko/ui_keychain.PNG";
import unair_keychain from "../assets/images/Toko/unair_keychain.JPG";
import undip_keychain from "../assets/images/Toko/undip_keychain.JPG";
import unpad_keychain from "../assets/images/Toko/unpad_keychain.JPG";
import uns_keychain from "../assets/images/Toko/uns_keychain.JPG";
import Lanyard from "../assets/images/Toko/Lanyard.JPG";
import totebag_bce_v1 from "../assets/images/Toko/totebag_bce_v1.JPG";
import totebag_bce_v2 from "../assets/images/Toko/totebag_bce_v2.JPG";
import totebag_bce_v3 from "../assets/images/Toko/totebag_bce_v3.JPG";
import sticker_pack from "../assets/images/Toko/sticker_pack.JPG";

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
            name={"Sticker Pack"}
            description="Tersedia 2 Variasi:
            1. Sticker pack
            2. Kampus Impian: UNS. UNPAD, UNNES, UNDIP, UI, UGM, UB, PPNS, POLTEK BATAM, ITS, ITB, UNAND (dapat dibeli satuan)"
            price={10000}
            img={sticker_pack}
          />
          <SwagCard
            name={"Lanyard"}
            description={
              "Lanyard dengan panjang ±90 cm dan lebar ±2cm bahan tali terbuat dari nylon yang tahan lama. "
            }
            img={Lanyard}
            price={20000}
          />
          <SwagCard
            name={"Kipas"}
            description={
              "kipas berbahan art cartoon ukuran 15 × 15 cm yang ringan dan mudah dibawa kemanapun. "
            }
            price={10000}
          />
          <SwagCard
            img={kaosa}
            name="Jersey Batam Campus Expo"
            description="Jersey eksklusif Batam Campus Expo dengan bahan yang lembut, nyaman, serta menyerap keringat. "
            price={150000}
          />
          <SwagCard
            img={kaosb}
            name="Jersey Batam Campus Expo"
            description={
              "Jersey eksklusif Batam Campus Expo dengan bahan yang lembut, nyaman, serta menyerap keringat."
            }
            price={150000}
          />
          <SwagCard
            name={"Totebag"}
            description="Totebag dengan bahan kanvas drill berukuran 40 × 33 ×7 cm, disertai dengan resleting."
            price={20000}
            img={totebag_bce_v1}
          />
          <SwagCard
            name={"Totebag"}
            description="Totebag dengan bahan kanvas drill berukuran 40 × 33 ×7 cm, disertai dengan resleting."
            price={20000}
            img={totebag_bce_v2}
          />
          <SwagCard
            name={"Totebag"}
            description="Totebag dengan bahan kanvas drill berukuran 40 × 33 ×7 cm, disertai dengan resleting."
            price={20000}
            img={totebag_bce_v3}
          />
          <SwagCard
            name={"Keychain Akrilik UI"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={ui_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik ITB"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={itb_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik UGM"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={ugm_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik Polibatam"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={poltek_batam_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik IPB"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={ipb_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik ITS"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={its_keychain}
          />

          <SwagCard
            name={"Keychain Akrilik UB"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={ub_keychain}
          />

          <SwagCard
            name={"Keychain Akrilik UNAIR"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={unair_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik UNDIP"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={undip_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik UNPAD"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={unpad_keychain}
          />
          <SwagCard
            name={"Keychain Akrilik UNS"}
            description={
              "Variasi gambar: UI, ITB, UGM, ITS, UB, UNAIR, UNDIP, UNPAD, UNS, POLTEK BATAM, IPB"
            }
            price={10000}
            img={uns_keychain}
          />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Toko;
