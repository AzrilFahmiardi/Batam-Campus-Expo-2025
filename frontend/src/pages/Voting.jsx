import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import itb from "../assets/images/itb.png";
import Footer from "../components/Footer";
import VoteItem from "../components/Vote/VoteItem";
import Popup from "../components/Vote/Popup";
import CampusTable from "../components/Vote/CampusTable";
import CampusTableItem from "../components/Vote/CampusTableItem";
import BackgroundBars from "../components/Vote/BackgroundBars";
import BackgroundClouds from "../components/Vote/BackgroundClouds";
import TopWinners from "../components/Vote/TopWinners";
import ftShadow from "../assets/images/Voting/ft-shadow.png";
import { useAuth } from "../utils/AuthProvider";
import { getAllUniversity } from "../utils/UniversityFetch";
import { NavLink } from "react-router-dom";
import locked1 from "../assets/images/Voting/locked1.png";
import locked2 from "../assets/images/Voting/locked2.png";
import locked1_mini from "../assets/images/Voting/locked1_mini.png";
import locked2_mini from "../assets/images/Voting/locked2_mini.png";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";

import {
  checkLoginStatus,
  handleGoogleLogin,
  Logout,
} from "../utils/authentication";

const Voting = () => {
  const { user, isLoggedIn, hasVoted } = useAuth();
  const [selectedCount, setSelectedCount] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topUniversities, setTopUniversities] = useState([]);
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);

  // SUBMTI VOTING UNIVERSITAS
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const selectedUniversities = Array.from(data.values());

    if (selectedUniversities.length === 0) {
      alert("Minimal pilih satu universitas!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/vote`,
        {
          universities: selectedUniversities,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Vote successful:", response.data);
      alert("Voting successful!");

      setRefreshLeaderboard((prev) => prev + 1);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error submitting vote:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  // FETCHING UNIVERSITIES DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUniversity();
        setUniversities(data);
        setTopUniversities(data.slice(0, 3));
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching university data: ", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refreshLeaderboard]);

  useEffect(() => {
    if (selectedCount > 5) {
      setIsMax(true);
      setSelectedCount(5);
    }
  }, [selectedCount]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Fragment>
      <Popup
        title={"Batas Vote Terlampaui!"}
        message={"Kamu cuma bisa milih 5 universitas ya!🤗"}
        isOpen={isMax}
        setIsOpen={setIsMax}
      />
      <Header user={user} />
      <div className="relative z-10 h-auto bg-blue-gradient p-10 pb-20 sm:pb-24 md:pb-28 lg:pb-60">
        <BackgroundBars />
        <BackgroundClouds />

        <TopWinners votingData={universities} />
        <div className="container mx-auto mb-16 px-2 md:mb-20 lg:mb-32">
          <p className="mb-2 text-center font-pixelify text-xl text-white sm:text-3xl md:text-4xl lg:mb-4 lg:text-5xl">
            Top Leaderboard From Voting
          </p>
          <div className="mx-auto w-full max-w-[100%] shadow-2xl md:max-w-[90%] lg:max-w-[85%]">
            <div className="custom-scrollbar flex h-[480px] flex-col rounded-2xl border border-white bg-[rgba(255,255,255,0.6)] p-1 backdrop-blur-md sm:h-[320px] md:h-[400px] lg:h-auto lg:flex-row lg:p-5">
              <div className="custom-scrollbar custom-scrollbar-blue h-[310px] grow overflow-y-auto">
                <CampusTable>
                  {universities.map((uni, index) => (
                    <CampusTableItem
                      key={uni.kode_univ}
                      number={index + 1}
                      img={uni.logo}
                      name={uni.nama}
                      vote={uni.jumlah_voting}
                    />
                  ))}
                </CampusTable>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-2 py-6 sm:px-4 sm:py-8 md:py-10">
          <div className="mx-auto w-full max-w-[100%] shadow-2xl md:max-w-[90%] lg:max-w-[85%]">
            {user ? (
              <div className="flex flex-col rounded-2xl border border-white bg-[rgba(255,255,255,0.6)] p-2 backdrop-blur-md sm:p-3 md:p-4 lg:p-3">
                <h1 className="inline-block bg-gradient-to-r from-orange-600 to-red-800 bg-clip-text text-center font-montserrat text-[15px] font-bold text-transparent sm:text-xl md:text-2xl lg:p-2 lg:text-4xl">
                  CHOOSE YOUR FAVORITE COLLEGE!!!
                </h1>
                <form
                  className="grow space-y-2 sm:space-y-3"
                  onSubmit={onSubmit}
                >
                  <div className="custom-scrollbar custom-scrollbar-red h-[375px] overflow-y-auto p-1 md:h-[420px] lg:h-auto lg:p-2">
                    <div className="grid w-full grid-cols-4 place-items-center gap-1 sm:grid-cols-5 sm:gap-3 md:grid-cols-6 md:gap-3 lg:grid-cols-7">
                      {universities.map((uni, index) => (
                        <VoteItem
                          key={uni.kode_univ}
                          name={uni.nama}
                          value={uni.kode_univ}
                          image={uni.logo}
                          selectedCount={selectedCount}
                          setSelectedCount={setSelectedCount}
                          setIsMax={setIsMax}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-red-800 py-1 font-montserrat text-[10px] font-bold text-white duration-100 sm:rounded-full sm:py-4 sm:text-xl"
                    >
                      Vote Now!
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // JIKA NO USER LOCKED

              <div className="relative flex flex-col items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.6)] p-2 backdrop-blur-md sm:p-3 md:p-4 lg:p-3">
                <div className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden rounded-2xl bg-[#080808cb]">
                  {/* LOCKED BESAR */}
                  <img
                    src={locked1}
                    alt=""
                    className="absolute left-0 top-0 hidden h-full w-full object-cover brightness-50 sm:block"
                  />
                  <img
                    src={locked2}
                    alt=""
                    className="abosolute left-0 top-0 hidden h-full w-full object-cover brightness-50 sm:block"
                  />
                  {/* LOCKED MOBILE */}
                  <img
                    src={locked1_mini}
                    alt=""
                    className="absolute left-0 top-0 block h-full w-full object-cover sm:hidden"
                  />
                  <img
                    src={locked2_mini}
                    alt=""
                    className="abosolute left-0 top-0 block h-full w-full object-cover sm:hidden"
                  />
                </div>
                <NavLink to={"/login"}
                className="absolute z-20 transform rounded-xl bg-footer-gradient px-5 py-2 font-pixelify text-white shadow-md transition duration-100 ease-linear hover:scale-110 md:px-7 md:py-3 md:text-[1.5em]">
                <button
                >
                  Sign Up First
                </button>
                </NavLink>
                

                <h1 className="inline-block bg-gradient-to-r from-orange-600 to-red-800 bg-clip-text text-center font-montserrat text-[15px] font-bold text-transparent sm:text-xl md:text-2xl lg:p-2 lg:text-4xl">
                  CHOOSE YOUR FAVORITE COLLEGE!!!
                </h1>
                <form
                  className="grow space-y-2 sm:space-y-3"
                  onSubmit={onSubmit}
                >
                  <div className="custom-scrollbar custom-scrollbar-red h-[375px] overflow-y-auto p-1 md:h-[420px] lg:h-auto lg:p-2">
                    <div className="grid w-full grid-cols-4 place-items-center gap-1 sm:grid-cols-5 sm:gap-3 md:grid-cols-6 md:gap-3 lg:grid-cols-7">
                      {universities.map((uni, index) => (
                        <VoteItem
                          key={uni.kode_univ}
                          name={uni.nama}
                          value={uni.kode_univ}
                          image={uni.logo}
                          selectedCount={selectedCount}
                          setSelectedCount={setSelectedCount}
                          setIsMax={setIsMax}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-red-800 py-1 font-montserrat text-[10px] font-bold text-white duration-100 sm:rounded-full sm:py-4 sm:text-xl"
                    >
                      Vote Now!
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative z-0 overflow-hidden bg-[#F97316] pt-16 md:pt-40">
        {/* <img
          src={ftShadow}
          className="bg-red-400 absolute -top-2 left-20 -z-20 translate-y-2 scale-125 md:-top-10 md:left-32 lg:-top-[10%] lg:left-1/4 lg:w-[1000px]  lg:translate-y-3"
        /> */}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Voting;
