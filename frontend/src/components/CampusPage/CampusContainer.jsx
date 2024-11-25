import { useState, useEffect } from "react";
import logo from "../../assets/images/Hero-Logo.svg";
import headline from "../../assets/images/CampusPage/find-your-future.svg"
import CloudHeroTopRight from "../../assets/images/LandingPage/CloudHeroTopRight.png";
import CloudHeroTopLeft from "../../assets/images/LandingPage/CloudHeroTopLeft.png";
import Dropdown from "./Dropdown";
import axios from 'axios'

import CampusCard from "./CampusCard"

const url = 'http://localhost:5000'

const CampusContainer = () => {
    const [universities, setUniversities] = useState([]);
    const [searchUniversity, setSearchUniversity] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
    const [isLoading, setIsLoading] = useState(true);

    const getAllUniversity = async () => {
        try {
            const result = await axios.get(`${url}/universitas`);
            setUniversities(result.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching university: ', err);
        }
    }

    useEffect(() => {
        getAllUniversity();
    }, []);

    const filteredUniversities = universities.filter(university => {
        const matchesSearch = university.nama.toLowerCase().includes(searchUniversity.toLowerCase());
        const matchesLocation = selectedLocation === "Semua Lokasi" || university.provinsi === selectedLocation;
        return matchesSearch && matchesLocation;
    });

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    return (
        <section className="relative flex min-h-[1000px] h-auto flex-col items-center justify-start overflow-hidden py-10 text-center bg-campus-page-background-gradient sm:py-14 md:py-16 lg:py-20 xl:py-24">
            <img
                src={CloudHeroTopRight}
                className="animate__animated animate__fadeInRight animate__fast absolute right-0 top-24 -z-1 max-w-36 md:max-w-full pointer-events-none"
            />
            <img
                src={CloudHeroTopLeft}
                className="animate__animated animate__fadeInLeft animate__fast absolute left-0 top-[300px] -z-1 max-w-36 translate-y-full md:max-w-full md:translate-y-1/3 pointer-events-none"
            />
            
            <div className="animate__animated animate__zoomIn animate__slow relative flex h-auto w-full max-w-screen-lg flex-col items-center justify-center px-10 mt-[150px] sm:px-5">
                <img src={logo} className="h-[50px]" />
                <img src={headline} alt="headline" />
            </div>

            <div className="flex flex-col justify-start gap-10 mt-[200px]">
                <div className="flex justify-center gap-10 flex-wrap">
                    <Dropdown onSelect={handleLocationSelect} />
                    <input 
                        type="text" 
                        placeholder="Cari Kampus" 
                        className="border-2 border-[#EB5E0B] px-6 py-1 rounded-[1.5rem] font-montserrat w-[85vw] md:w-[390px] text-[#EB5E0B] focus:border-[#EB5E0B] outline-none"
                        value={searchUniversity}
                        onChange={(e) => setSearchUniversity(e.target.value)}
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                    />
                </div>

                <div className="flex justify-center flex-wrap gap-5 px-10">
                    {isLoading ? (
                        Array(10).fill(null).map((_, index) => (
                            <CampusCard key={`loading-${index}`} delay={(index % 4) * 100} />
                        ))
                    ) : filteredUniversities.length === 0 ? (
                        <div className="text-center text-gray-500 font-montserrat mt-8">
                            Tidak ada universitas yang ditemukan
                        </div>
                    ) : (
                        filteredUniversities.map((university, index) => (
                            <CampusCard key={index} university={university} delay={(index % 4) * 100} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default CampusContainer;