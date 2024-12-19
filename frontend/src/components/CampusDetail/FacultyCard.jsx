import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJurusan } from "../../utils/UniversityFetch";

const FacultyCard = ({ faculty, index }) => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jurusan, setJurusan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jurusanData = await getJurusan(id, faculty.kode_fakultas);
        setJurusan(jurusanData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching jurusan data by id_fakultas: ", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, faculty.kode_fakultas]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos-delay={200 * (index + 1)}
        className="group relative flex w-full max-w-[140px] cursor-pointer flex-col overflow-hidden rounded-lg bg-white p-3 pb-8 font-montserrat text-[#3A3A3A] shadow-md sm:max-w-[250px] md:p-5 md:pb-8 lg:max-w-[300px]"
        onClick={openModal}
      >
        <div className="absolute inset-0 -z-10 bg-fakultas-card opacity-0 transition duration-200 group-hover:opacity-100"></div>
        <h2 className="mb-1 text-[14px] font-bold sm:text-[16px] md:text-lg lg:text-xl">
          {faculty.nama_fakultas}
        </h2>
        {jurusan.length > 0 && (
          <>
            <h3 className="mb-1 text-[13px] font-semibold sm:text-base md:mb-2 lg:text-lg">
              {jurusan.length} Prodi
            </h3>
            <p className="line-clamp-3 max-h-12 flex-grow text-[11px] sm:max-h-14 sm:text-[12px] lg:max-h-16 lg:text-sm">
              {jurusan.map((item) => item.nama_prodi).join(" - ")}
            </p>
          </>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="popup mx-auto w-[300px] rounded-lg bg-opacity-40 p-3 text-white shadow md:w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-lg font-bold md:text-xl">
              {faculty.nama_fakultas}
            </h2>
            {jurusan.length > 0 && (
              <h3 className="mb-2 text-xs font-semibold md:text-sm">
                {jurusan.length} Program Studi
              </h3>
            )}

            <ol className="list-disc pl-8">
              {jurusan.map((item, index) => (
                <li key={index} className="p-1 text-[11px] md:text-xs">
                  {item.nama_prodi}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyCard;
