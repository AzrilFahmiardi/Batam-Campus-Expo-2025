import React, { Fragment } from "react";

const Hero = ({ universities }) => {
  return (
    <Fragment>
      <div
        className="flex h-screen items-end bg-cover bg-center"
        style={{
          backgroundImage: `url('/CardImage/${universities.kode_univ}_1.webp')`,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tambahkan warna latar belakang

          backgroundBlendMode: 'darken',
        }}
      >
        <div
          className="flex w-full items-center justify-center gap-10 p-5 sm:p-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #E95B0B 50%)",
          }}
        >
          <div className="hidden rounded-full bg-white p-6 shadow-inner sm:inline-block">
            <img
              src={universities.logo}
              alt="Universitas"
              className="sm:size-32"
            />
          </div>
          <div className="space-y-3 text-justify font-montserrat text-white sm:max-w-[75%]">
            <h2 className="text-center text-xl font-bold sm:text-left md:text-5xl">
              {universities.nama}
            </h2>
            <p className="max-h-32 overflow-y-auto text-sm font-light sm:max-h-full">
              {universities.deskripsi}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
