import { Fragment, useEffect, useState } from "react";
import Header from "../components/LandingPage/Header";
import itb from "../assets/images/itb.png";
import Footer from "../components/Footer";
import VoteItem from "../components/Vote/VoteItem";
import Popup from "../components/Vote/PopUp";
import CampusTable from "../components/Vote/CampusTable";
import CampusTableItem from "../components/Vote/CampusTableItem";
import BackgroundBars from "../components/Vote/BackgroundBars";
import BackgroundClouds from "../components/Vote/BackgroundClouds";
import TopWinners from "../components/Vote/TopWinners";
import BCEBlue from "../assets/images/LandingPage/BCEBlue.png";
import ftShadow from "../assets/images/Voting/ft-shadow.png";

const Voting = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [isMax, setIsMax] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }
  };

  useEffect(() => {
    if (selectedCount > 5) {
      setIsMax(true);
      setSelectedCount(5);
    }
  }, [selectedCount]);

  const sampleVotingData = [
    {
      id: 1,
      name: "Institut Teknologi Bandung",
      image: itb,
      votes: 12345,
    },
    {
      id: 2,
      name: "Universitas Indonesia",
      image: itb, // Replace with actual UI image
      votes: 11234,
    },
    {
      id: 3,
      name: "Universitas Gadjah Mada",
      image: itb, // Replace with actual UGM image
      votes: 10123,
    },
  ];

  return (
    <Fragment>
      <Popup
        title={"Batas Vote Terlampaui!"}
        message={"Kamu cuma bisa milih 5 universitas ya!🤗"}
        isOpen={isMax}
        setIsOpen={setIsMax}
      />
      <Header />
      <div className="relative z-10 h-[200vh] bg-blue-gradient p-10 sm:h-[250vh] md:h-[280vh] lg:h-[280vh]">
        <BackgroundBars />
        <BackgroundClouds />

        <TopWinners votingData={sampleVotingData} />
        <div className="container mx-auto mb-16 px-2 md:mb-20 md:mt-10 lg:mb-32">
          <p className="mb-2 text-center font-pixelify text-xl text-white md:text-4xl lg:mb-4 lg:text-5xl">
            Top Leaderboard From Voting
          </p>
          <div className="mx-auto w-full max-w-[100%] shadow-2xl md:max-w-[90%] lg:max-w-[80%]">
            <div className="custom-scrollbar flex flex-col rounded-lg border border-white bg-[rgba(255,255,255,0.5)] p-1 backdrop-blur-md lg:flex-row lg:p-5">
              <div className="custom-scrollbar custom-scrollbar-blue h-[310px] grow overflow-y-auto">
                <CampusTable>
                  {Array.from({ length: 20 }, (_, index) => index + 1).map(
                    (item) => (
                      <CampusTableItem
                        key={item}
                        img={itb}
                        name="Institut Teknologi Bandung"
                        vote={12345}
                      />
                    ),
                  )}
                </CampusTable>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
          <div className="mx-auto sm:max-w-[80%]">
            <div className="flex flex-col rounded-lg border border-white bg-[rgba(255,255,255,0.5)] p-2 backdrop-blur-md sm:p-3 md:p-4 lg:flex-row lg:p-5">
              <h1 className="vertical-text mb-4 inline-block text-center font-montserrat text-[15px] font-bold text-[#166191] sm:text-xl md:text-2xl lg:mb-0 lg:rotate-180 lg:whitespace-nowrap lg:pl-5 lg:text-4xl">
                CHOOSE YOUR FAVORITE COLLEGE!!!
              </h1>
              <form
                className="grow space-y-2 sm:space-y-3 lg:space-y-4"
                onSubmit={onSubmit}
              >
                <div className="custom-scrollbar custom-scrollbar-red h-[500px] overflow-y-auto p-1 md:h-[700px] lg:p-3">
                  <div className="grid w-full grid-cols-3 gap-1 sm:gap-3 md:gap-4 xl:grid-cols-5">
                    {Array.from({ length: 20 }, (_, index) => index + 1).map(
                      (item) => (
                        <VoteItem
                          name={"Institut Teknologi Bandung"}
                          value={"itb"}
                          key={item}
                          image={itb}
                          selectedCount={selectedCount}
                          setSelectedCount={setSelectedCount}
                          setIsMax={setIsMax}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="px-2 sm:px-3">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-white py-2 font-montserrat text-lg font-bold duration-100 hover:bg-[#337ba8] hover:text-white sm:py-3 sm:text-xl"
                  >
                    Vote Now!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[30vh] overflow-hidden bg-landing-page-background-gradient md:h-[40vh] lg:h-[55vh]">
        <img
          src={BCEBlue}
          className="absolute bottom-8 left-2 w-[30%] translate-x-5 md:bottom-10 md:left-5 lg:bottom-16 lg:left-10"
        />
        <img
          src={ftShadow}
          className="absolute -top-20 left-1/4 w-[80%] translate-x-5"
        />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Voting;
