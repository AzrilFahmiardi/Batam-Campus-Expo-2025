import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";

const SwagCard = ({ img, name, description, price, isPreOrder }) => {
  return (
    <div className="flex w-full gap-3 rounded-3xl bg-white p-4 shadow-lg">
      <div className="relative grid aspect-square h-20 place-items-center self-center rounded-2xl bg-[#EB5E0B] shadow-md sm:h-48">
        {img ? (
          <img src={img} alt="item" className="rounded-2xl" />
        ) : (
          <p className="text-base font-semibold text-white sm:text-lg">
            No Image
          </p>
        )}
      </div>
      <div className="grid grid-rows-[1fr_auto] p-2">
        <div className="mb-3 space-y-1 sm:space-y-2">
          <p className="font-montserrat text-sm font-semibold text-gray-800 sm:text-xl">
            {name}
          </p>
          <p className="w-fit rounded-full font-montserrat text-xs font-semibold text-[#EB5E0B] sm:bg-[#EB5E0B] sm:px-2 sm:py-0.5 sm:text-white">
            Rp. {formatCurrency(price)}
          </p>
          <p className="line-clamp-3 text-justify font-montserrat text-[0.6rem] text-gray-800 sm:line-clamp-5 sm:text-xs">
            {isPreOrder && <b>[Pre-Order]</b>} {description}
          </p>
        </div>
        <div className="">
          <a
            href="https://bit.ly/MERCHBCE2025"
            target="_blank"
            className="flex w-fit items-center gap-1 rounded-full bg-[#EB5E0B] px-3 py-1 font-pixelify text-xs text-white duration-200 hover:brightness-90 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            Pre Order
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
