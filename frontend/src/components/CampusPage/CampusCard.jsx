import logoCard from "../../assets/images/CampusPage/ugm-logo-card.png";
import locationLogo from "../../assets/images/CampusPage/location-logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const CampusCard = ({ university, delay }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return null; // Tidak menampilkan card sama sekali jika gambar gagal load
  }

  if (!university) {
    return (
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={delay}
        data-aos-once="true"
        className="grid cursor-pointer overflow-hidden rounded-xl bg-white pr-[3.9rem] md:mb-3 md:mr-3 md:flex md:h-[300px] md:flex-col md:pr-0"
      >
        <div className="flex gap-10 px-5 py-4">
          <div className="h-16 w-16 rounded bg-gray-200"></div>
          <div className="flex-1">
            <div className="mb-3 h-6 w-3/4 rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-4 w-2/3 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink to={`/kampus/${university.kode_univ}`} className={"group p-2"}>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={delay}
        data-aos-once="true"
        className="relative grid h-[100px] cursor-pointer grid-cols-2 overflow-hidden rounded-xl bg-white pr-[3.9rem] md:flex md:h-[300px] md:flex-col md:pr-0"
      >
        <div className="relative w-[150px] overflow-y-hidden sm:w-[700px] md:w-full">
          <div className="absolute left-0 top-0 z-20 grid h-full w-full items-center bg-[rgba(0,0,0,0.5)] text-sm text-white opacity-0 transition duration-200 group-hover:opacity-100">
            <p className="flex items-center justify-center gap-1 font-pixelify">
              Lihat Kampus
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
                />
              </svg>
            </p>
          </div>
          <img
            src={university.cardImage}
            alt="Campus Image"
            className="h-[100px] w-[200px] rounded-l-xl object-cover object-center sm:h-[190px] md:w-full md:rounded-t-xl md:rounded-bl-none"
            onError={() => setImageError(true)}

          />
          <p className="absolute left-2 top-2 rounded-xl bg-gradient-to-b from-[#EB5E0B] to-[#9E0202] px-2 py-1 font-montserrat text-[0.2em] font-bold text-white md:text-[0.8em]">
            Rank {university.rank_international}
          </p>
          <p className="absolute bottom-6 right-2 rounded-xl bg-[#3A3A3A]/[.77] px-2 py-1 font-montserrat text-[0.5em] font-bold text-white sm:bottom-6 sm:right-[64em] md:bottom-2 md:right-2 md:text-[0.7em]">
            Akreditasi {university.akreditasi}
          </p>
        </div>
        <div className="flex w-[300px] flex-col gap-5 px-5 py-4 md:flex-row md:py-2">
          <img
            src={university.logo}
            alt="logo"
            className="md:w-cover hidden h-[90px] w-[100px] p-1 md:block md:object-cover"
          />
          <div className="text-left font-montserrat">
            <p className="my-2 max-w-[85%] truncate text-xs font-bold text-[#3A3A3A] md:mb-1 md:text-base">
              {/* {university.nama.length > 20
                ? `${university.nama.substring(0, 20)}...`
                : university.nama} */}
              {university.nama}
            </p>
            <div className="flex h-[50px]">
              <div className="">
                <p className="w-full text-[0.6em] md:text-xs">
                  {university.jumlah_prodi} Program Studi
                </p>
                <p className="mt-0 flex w-full items-center gap-1 text-[0.5em] font-semibold md:mt-2 md:w-[250px] md:text-[0.7em]">
                  <img src={locationLogo} alt="location" className="size-4" />
                  {(university?.lokasi?.length || 0) > 30
        ? `${university?.lokasi?.substring(0, 20)}...`
        : university?.lokasi || 'Lokasi tidak tersedia'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default CampusCard;
