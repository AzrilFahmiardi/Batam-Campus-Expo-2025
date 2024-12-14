import { Fragment, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/CampusDetail/Hero";
import Footer from "../components/Footer";
import ImageGallery from "../components/CampusDetail/ImageGallery";
import FacultyCard from "../components/CampusDetail/FacultyCard";
import leftCloud from "../assets/images/CampusDetail/cloud_left.png";
import rightCloud from "../assets/images/CampusDetail/cloud_right.png";
import { getUniversitybyId, getFakultas, getAllProdi } from "../utils/UniversityFetch";

const DetailKampus = () => {
  const { id } = useParams();
  const [universities, setUniversities] = useState({});
  const [fakultas, setFakultas] = useState([]);
  const [majors, setMajors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const universityData = await getUniversitybyId(id);
        const fakultasData = await getFakultas(id);
        const majorsData = await getAllProdi(id);

        console.log(majorsData);
        

        setUniversities(universityData);
        setFakultas(fakultasData);
        setMajors(majorsData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching university data:", err);
        setError("Gagal memuat data universitas");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <Fragment>
      <Header />
      <Hero universities={universities} />
      <div className="bg-landing-page-background-gradient">
        {/* Informasi Umum Section */}
        <div className="relative space-y-3 py-5 sm:py-16">
          <img
            src={leftCloud}
            alt="Left Cloud"
            className="absolute left-0 hidden max-w-48 sm:inline-block"
          />
          <img
            src={rightCloud}
            alt="Right Cloud"
            className="absolute right-0 hidden max-w-48 sm:inline-block"
          />
          <h2 className="text-center font-pixelify text-4xl text-white">
            Informasi Umum
          </h2>
          <p className="text-center font-montserrat font-bold text-white">
            {universities.nama}
          </p>
        </div>

        {/* Universitas Info Table */}
        <div className="flex flex-col-reverse items-center justify-center gap-10 px-5 pb-10 sm:px-20 md:flex-row">
          <table className="max-w-sm grow table-fixed sm:max-w-md md:max-w-lg lg:max-w-xl">
            <tbody>
              {[
                { label: "Akreditasi", value: universities.akreditasi },
                { label: "Rank Internasional", value: universities.rank_international },
                { label: "Jumlah Prodi", value: universities.jumlah_prodi },
                { label: "Lokasi", value: universities.lokasi },
                { 
                  label: "Website", 
                  value: universities.web_kampus,
                  isLink: true 
                }
              ].map((row, index) => (
                <tr key={index} className="border-b border-t border-white">
                  <td className="w-[25%] px-2 py-2 font-bold text-white">{row.label}</td>
                  <td className="w-[5px] px-2 py-2 text-white">:</td>
                  <td className="w-auto grow px-2 py-2 text-white">
                    {row.isLink ? (
                      <a 
                        href={row.value} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="max-w-[700px] text-justify">{row.value}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ImageGallery universities={universities} />
        </div>

        {/* Fakultas dan Jurusan Section */}
        <div className="h-auto space-y-10 py-10 sm:space-y-16 sm:py-16 md:space-y-20 md:py-20">
          <h2 className="text-center font-pixelify text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Fakultas dan Jurusan
          </h2>
          <div className="flex h-auto flex-wrap justify-center gap-3 px-5 sm:gap-5 md:px-10 lg:gap-8">
            {fakultas.map((faculty, index) => (
              <FacultyCard
                key={faculty.kode_fakultas}
                index={index}
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

        {/* Daftar Jurusan Section */}
        <div className="p-5 md:p-10">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="flex items-center gap-x-3 rounded-full bg-white px-3 text-center font-montserrat text-sm font-semibold">
                  <td className="w-24 rounded-l-full border-r border-gray-300 p-3 md:p-4">
                    Kode Jurusan
                  </td>
                  <td className="grow p-3 md:p-4">Nama Jurusan</td>
                  <td className="w-24 p-3 md:p-4">Jenjang</td>
                  <td className="w-36 p-3 md:p-4">Daya Tampung 2024</td>
                  <td className="w-24 p-3 md:p-4">Peminat 2023</td>
                  <td className="w-24 rounded-r-full p-3 md:p-4">Akreditasi</td>
                </tr>
              </thead>
              <tbody className="scrollbar-hide flex max-h-96 flex-col gap-3 overflow-y-auto rounded-3xl border-2 border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.7)] p-3">
                {majors.length > 0 ? (
                  majors.map((major, index) => (
                    <tr
                      key={major.kode_jurusan}
                      className="flex items-stretch gap-x-2 rounded-full text-center font-montserrat text-sm"
                    >
                      <td
                        className={`grid w-24 place-items-center rounded-xl p-3 md:p-4 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#F2F5F9]"
                        }`}
                      >
                        {major.kode_jurusan}
                      </td>
                      <td
                        className={`grid grow items-center justify-start rounded-xl p-3 md:p-4 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#F2F5F9]"
                        }`}
                      >
                        {major.nama}
                      </td>
                      <td
                        className={`grid w-24 place-items-center rounded-xl p-3 md:p-4 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#F2F5F9]"
                        }`}
                      >
                        {major.jenjang}
                      </td>
                      <td
                        className={`grid w-36 place-items-center rounded-xl p-3 md:p-4 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#F2F5F9]"
                        }`}
                      >
                        {major.daya_tampung_2024}
                      </td>
                      <td
                        className={`grid w-24 place-items-center rounded-xl p-3 md:p-4 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#F2F5F9]"
                        }`}
                      >
                        {major.peminat_2023}
                      </td>
                      <td
                        className={`grid w-24 place-items-center rounded-xl p-3 md:p-4 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#F2F5F9]"
                        }`}
                      >
                        {major.akreditasi}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-white p-4">
                      Tidak ada data jurusan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-footer-gradient">
        <Footer />
      </div>
    </Fragment>
  );
};

export default DetailKampus;