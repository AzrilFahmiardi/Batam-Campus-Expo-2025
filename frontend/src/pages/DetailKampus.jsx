import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Hero from "../components/CampusDetail/Hero";
import Header from "../components/Header";
import leftCloud from "../assets/images/CampusDetail/cloud_left.png";
import rightCloud from "../assets/images/CampusDetail/cloud_right.png";
import ImageGallery from "../components/CampusDetail/ImageGallery";
import FacultyCard from "../components/CampusDetail/FacultyCard";
import Footer from "../components/Footer";
import { getUniversitybyId, getFakultas } from "../utils/UniversityFetch";

const DetailKampus = () => {
  const { id } = useParams();
  const [universities, setUniversities] = useState([]);
  const [fakultas, setFakultas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const universitas = await getUniversitybyId(id);
        const fakultas = await getFakultas(id);
        setFakultas(fakultas);
        setUniversities(universitas);
        setIsLoading(false);
        console.log(universitas);
      } catch (err) {
        console.error("Error fetching university data by id: ", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  
  return (
    <Fragment>
      <Header />
      <Hero universities={universities} />
      <div className="bg-landing-page-background-gradient">
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
            {universities.nama}
          </p>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-10 px-5 pb-10 sm:px-20 md:flex-row">
          <table className="grow table-fixed  max-w-[700px]">
            <tbody>
              <tr className="gap-3 border-b border-t border-white">
                <td className="w-[25%] px-2 py-2 font-bold text-white">
                  Akreditasi
                </td>
                <td className="w-[5px] px-2 py-2 text-white">:</td>
                <td className="w-auto grow px-2 py-2 text-white">
                  <p className="max-w-[700px] text-justify">
                    {universities.akreditasi}
                  </p>
                </td>
              </tr>
              <tr className="gap-3 border-b border-t border-white">
                <td className="w-[25%] px-2 py-2 font-bold text-white">
                  Rank Internasional
                </td>
                <td className="w-[5px] px-2 py-2 text-white">:</td>
                <td className="w-auto grow px-2 py-2 text-white">
                  <p className="max-w-[700px] text-justify">
                    {universities.rank_international}
                  </p>
                </td>
              </tr>
              <tr className="gap-3 border-b border-t border-white">
                <td className="w-[25%] px-2 py-2 font-bold text-white">
                  Jumlah Prodi
                </td>
                <td className="w-[5px] px-2 py-2 text-white">:</td>
                <td className="w-auto grow px-2 py-2 text-white">
                  <p className="max-w-[700px] text-justify">
                    {universities.jumlah_prodi}
                  </p>
                </td>
              </tr>
              <tr className="gap-3 border-b border-t border-white">
                <td className="w-[25%] px-2 py-2 font-bold text-white">
                  Lokasi
                </td>
                <td className="w-[5px] px-2 py-2 text-white">:</td>
                <td className="w-auto grow px-2 py-2 text-white">
                  <p className="max-w-[700px] text-justify">
                    {universities.lokasi}
                  </p>
                </td>
              </tr>
              <tr className="gap-3 border-b border-t border-white">
                <td className="w-[25%] px-2 py-2 font-bold text-white">
                  Website
                </td>
                <td className="w-[5px] px-2 py-2 text-white">:</td>
                <td className="w-auto grow px-2 py-2 text-white">
                  <p className="max-w-[700px] text-justify">
                    <a target="blank" href={universities.web_kampus}>
                      {universities.web_kampus}
                    </a>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="aspect-square w-80 rounded-lg bg-white"></div> */}
          <ImageGallery universities={universities}/>
        </div>
        <div className="h-auto space-y-10 py-10 sm:space-y-16 sm:py-16 md:space-y-20 md:py-20">
          <h2 className="text-center font-pixelify text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Fakultas dan Jurusan
          </h2>
          <div className="flex h-auto flex-wrap justify-center gap-3 px-5 sm:gap-5 md:px-10 lg:gap-8">
            {fakultas.map((faculty, index) => (
              <FacultyCard
                index={index}
                key={faculty.kode_fakultas}
                faculty={faculty}
              />
            ))}
          </div>
          <Link
            to="/"
            className="block text-center font-montserrat text-base font-bold text-white sm:text-xl md:text-2xl"
          >
            Lebih Banyak
          </Link>
        </div>
      </div>
      <div className="bg-footer-gradient">
        <Footer />
      </div>
    </Fragment>
  );
};

export default DetailKampus;
