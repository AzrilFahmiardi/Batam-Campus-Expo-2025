import React from "react";
import shirt from "../../assets/images/Toko/shirt.png";
import bceLogoWhite from "../../assets/images/Toko/bce-logo-white.png";

const SwagCard = () => {
  return (
    <div className="flex w-full gap-3 rounded-3xl bg-white p-4 shadow-lg">
      <div className="relative grid aspect-square h-20 place-items-center self-center rounded-2xl bg-[#EB5E0B] p-2 shadow-md sm:h-48">
        <img
          src={bceLogoWhite}
          alt="Batam Campus Expo"
          className="absolute left-1 top-1 w-4 sm:left-2 sm:top-2 sm:w-8"
        />
        <img src={shirt} alt="item" />
      </div>
      <div className="grid grid-rows-[1fr_auto] p-2">
        <div className="mb-3 space-y-3">
          <p className="font-montserrat text-base font-semibold text-gray-800 sm:text-2xl">
            T-shirt long sleeve (White)
          </p>
          <p className="text-justify font-montserrat text-[0.6rem] text-gray-800">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
            nemo praesentium voluptates hic, similique ipsam illum voluptas
            porro distinctio officiis delectus fugiat pariatur.
          </p>
        </div>
        <div className="">
          <button className="rounded-full bg-[#EB5E0B] px-3 py-1.5 font-pixelify text-xs text-white duration-200 hover:brightness-90 sm:text-sm">
            add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwagCard;
