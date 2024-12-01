import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/CampusDetail/Hero";
import Header from "../components/Header";
import leftCloud from "../assets/images/CampusDetail/cloud_left.png";
import rightCloud from "../assets/images/CampusDetail/cloud_right.png";
import ImageGallery from "../components/CampusDetail/ImageGallery";

const DetailKampus = () => {
  // nah fetch kan lah nanti bos, blum ada route nya
  const { id } = useParams();

  return (
    <Fragment>
      <Header />
      <Hero />
      <div className="bg-[#EB5E0B]">
        <div className="relative space-y-3 py-5 sm:py-16">
          <img
            src={leftCloud}
            className="absolute left-0 hidden max-w-48 sm:inline-block"
          />
          <img
            src={rightCloud}
            className="absolute right-0 hidden max-w-48 sm:inline-block"
          />
          <h2 className="text-center font-pixelify text-4xl text-white">
            Informasi Umum
          </h2>
          <p className="text-center font-montserrat font-bold text-white">
            Universitas Gadjah Mada
          </p>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-10 px-5 py-5 sm:px-20">
          <table className="grow table-fixed">
            <tr className="gap-3 border-b border-t border-white">
              <td className="w-[25%] px-2 py-2 font-bold text-white">
                Akreditasi
              </td>
              <td className="w-[5px] px-2 py-2 text-white">:</td>
              <td className="w-auto grow px-2 py-2 text-white">
                <p className="max-w-[700px] text-justify">A</p>
              </td>
            </tr>
            <tr className="gap-3 border-b border-t border-white">
              <td className="w-[25%] px-2 py-2 font-bold text-white">
                Rank Internasional
              </td>
              <td className="w-[5px] px-2 py-2 text-white">:</td>
              <td className="w-auto grow px-2 py-2 text-white">
                <p className="max-w-[700px] text-justify">655</p>
              </td>
            </tr>
            <tr className="gap-3 border-b border-t border-white">
              <td className="w-[25%] px-2 py-2 font-bold text-white">
                Jumlah Prodi
              </td>
              <td className="w-[5px] px-2 py-2 text-white">:</td>
              <td className="w-auto grow px-2 py-2 text-white">
                <p className="max-w-[700px] text-justify">93</p>
              </td>
            </tr>
            <tr className="gap-3 border-b border-t border-white">
              <td className="w-[25%] px-2 py-2 font-bold text-white">Lokasi</td>
              <td className="w-[5px] px-2 py-2 text-white">:</td>
              <td className="w-auto grow px-2 py-2 text-white">
                <p className="max-w-[700px] text-justify">
                  Kabupaten Sleman, Yogyakarta
                </p>
              </td>
            </tr>
            <tr className="gap-3 border-b border-t border-white">
              <td className="w-[25%] px-2 py-2 font-bold text-white">
                Website
              </td>
              <td className="w-[5px] px-2 py-2 text-white">:</td>
              <td className="w-auto grow px-2 py-2 text-white">
                <p className="max-w-[700px] text-justify">www.ugm.ac.id</p>
              </td>
            </tr>
          </table>
          {/* <div className="aspect-square w-80 rounded-lg bg-white"></div> */}
          <ImageGallery />
        </div>
      </div>
    </Fragment>
  );
};

export default DetailKampus;
