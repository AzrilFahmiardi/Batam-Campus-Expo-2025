import React, { useState } from "react";

const FacultyCard = ({ facultyName, programCount, programs, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        className="flex max-w-[140px] cursor-pointer flex-col overflow-hidden rounded-lg bg-white p-3 pb-8 font-montserrat text-[#3A3A3A] shadow-md transition-colors hover:bg-gray-100 sm:max-w-[250px] md:p-5 md:pb-12 lg:max-w-[300px]"
        onClick={openModal}
      >
        <h2 className="mb-1 line-clamp-1 text-[14px] font-bold sm:text-[16px] md:text-lg lg:text-2xl">
          {facultyName}
        </h2>
        <h3 className="mb-1 text-[13px] font-semibold sm:text-base md:mb-2 lg:text-lg">
          {programCount} Prodi
        </h3>
        <p className="line-clamp-3 max-h-12 flex-grow text-[11px] sm:max-h-14 sm:text-[12px] lg:max-h-16 lg:text-sm">
          {programs.join(" - ")}
        </p>
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
            <h2 className="mb-2 text-lg font-bold md:text-xl">{facultyName}</h2>
            <h3 className="mb-2 text-xs font-semibold md:text-sm">
              {programCount} Program Studi
            </h3>

            <ol className="list-disc pl-8">
              {programs.map((program, index) => (
                <li key={index} className="p-1 text-[11px] md:text-xs">
                  {program}
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
