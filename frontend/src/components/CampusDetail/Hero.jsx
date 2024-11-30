import React, { Fragment } from "react";
import ugmLogo from "../../assets/images/CampusPage/ugm-logo-card.png";

const Hero = () => {
  return (
    <Fragment>
      {/* nanti ganti juga image nya */}
      <div className="flex h-screen items-end bg-[url('/src/assets/images/CampusPage/ugmhero.png')] bg-cover bg-center">
        <div
          className="flex w-full items-center justify-center gap-10 p-5 sm:p-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #E95B0B 50%)",
          }}
        >
          <div className="hidden rounded-full bg-white p-6 shadow-inner sm:inline-block">
            <img
              src={ugmLogo}
              alt="Universitas Gadjah Mada"
              className="sm:size-32"
            />
          </div>
          <div className="space-y-3 text-justify font-montserrat text-white sm:max-w-[75%]">
            <h2 className="text-center text-xl font-bold sm:text-left md:text-5xl">
              Universitas Gadjah Mada
            </h2>
            <p className="max-h-32 overflow-y-auto text-sm font-light sm:max-h-full">
              Selain menjadi salah satu daerah yang kaya akan budaya, Yogyakarta
              juga menjadi tempat yang banyak dituju oleh para pelajar di
              seluruh Indonesia. Universitas Gadjah Mada memang menjadi kampus
              yang sangat diperhitungkan kualitasnya, baik dalam skala nasional
              maupun internasional lho, Quipperian! Sebagai contoh, menurut
              pemeringkatan QS untuk Graduate Employability 2019, UGM berada
              pada peringkat 301-500 universitas terbaik dunia. Sementera itu,
              kampus ini juga masuk dalam pemeringkatan universitas terbaik
              versi The Times Higher Education (THE) 2020 dalam peringkat 1001+
              dunia.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
