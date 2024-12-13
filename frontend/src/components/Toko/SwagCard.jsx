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
        <div className="mb-3 space-y-1 sm:space-y-3">
          <p className="font-montserrat text-sm font-semibold text-gray-800 sm:text-2xl">
            T-shirt long sleeve (White)
          </p>
          <p className="line-clamp-3 text-justify font-montserrat text-[0.6rem] text-gray-800 sm:line-clamp-5 sm:text-xs">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
            nemo praesentium voluptates hic, similique ipsam illum voluptas
            porro distinctio officiis delectus fugiat pariatur.
          </p>
        </div>
        <div className="">
          <a
            href="#"
            target="_blank"
            className="flex w-fit items-center gap-1 rounded-full bg-[#EB5E0B] px-3 py-1 font-pixelify text-xs text-white duration-200 hover:brightness-90 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            Link
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SwagCard;
