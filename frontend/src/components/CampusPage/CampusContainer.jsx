import { useState, useEffect } from "react";
import headline from "../../assets/images/CampusPage/find-your-future.png";
import CloudHeroTopRight from "../../assets/images/LandingPage/CloudHeroTopRight.png";
import CloudHeroTopLeft from "../../assets/images/LandingPage/CloudHeroTopLeft.png";
import Dropdown from "./Dropdown";
import logo from "../../assets/images/LandingPage/BCEHeroLogo.png";
import { getAllUniversity } from "../../utils/UniversityFetch";

import CampusCard from "./CampusCard";

const CampusContainer = () => {
  const [universities, setUniversities] = useState([]);
  const [searchUniversity, setSearchUniversity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUniversity();
        setUniversities(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching university data: ", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = university.nama
      .toLowerCase()
      .includes(searchUniversity.toLowerCase());
    const matchesLocation =
      selectedLocation === "Semua Lokasi" ||
      university.provinsi === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <section className="relative flex h-auto min-h-[1000px] flex-col items-center justify-start overflow-hidden bg-campus-page-background-gradient py-10 text-center sm:py-14 md:py-16 lg:py-20 xl:py-24">
      <img
        src={CloudHeroTopRight}
        className="animate__animated animate__fadeInRight animate__fast -z-1 pointer-events-none absolute right-0 top-24 max-w-36 md:max-w-full"
      />
      <img
        src={CloudHeroTopLeft}
        className="animate__animated animate__fadeInLeft animate__fast -z-1 pointer-events-none absolute left-0 top-[300px] max-w-36 translate-y-full md:max-w-full md:translate-y-1/3"
      />

      <div className="animate__animated animate__zoomIn animate__slow relative mt-[150px] flex h-auto w-full max-w-screen-lg flex-col items-center justify-center px-10 sm:px-5">
        <img src={logo} className="h-[50px]" />
        <img src={headline} alt="headline" />
      </div>

      <div className="mt-[200px] flex w-full flex-col justify-start gap-10">
        <div className="flex flex-wrap justify-center gap-10">
          <Dropdown onSelect={handleLocationSelect} />
          <input
            type="text"
            placeholder="Cari Kampus"
            className="w-[85vw] rounded-[1.5rem] border-2 border-[#EB5E0B] px-6 py-1 font-montserrat text-[#EB5E0B] outline-none focus:border-[#EB5E0B] md:w-[390px]"
            value={searchUniversity}
            onChange={(e) => setSearchUniversity(e.target.value)}
            data-aos="zoom-in"
            data-aos-duration="1000"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3 md:px-16 lg:grid-cols-3 2xl:grid-cols-4">
          {isLoading ? (
            Array(10)
              .fill(null)
              .map((_, index) => (
                <CampusCard
                  key={`loading-${index}`}
                  delay={(index % 4) * 100}
                />
              ))
          ) : filteredUniversities.length === 0 ? (
            <div className="mt-8 text-center font-montserrat text-gray-500">
              Tidak ada universitas yang ditemukan
            </div>
          ) : (
            filteredUniversities.map((university, index) => (
              <CampusCard
                key={index}
                university={university}
                delay={(index % 4) * 100}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CampusContainer;
