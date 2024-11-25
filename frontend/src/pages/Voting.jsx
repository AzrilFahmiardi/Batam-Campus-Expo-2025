import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import itb from "../assets/images/itb.png";
import Footer from "../components/Footer";
import VoteItem from "../components/Vote/VoteItem";
import Popup from "../components/Vote/PopUp";
import CampusTable from "../components/Vote/CampusTable";
import CampusTableItem from "../components/Vote/CampusTableItem";
import BackgroundBars from "../components/Vote/BackgroundBars";
import BackgroundClouds from "../components/Vote/BackgroundClouds";
import TopWinners from "../components/Vote/TopWinners";
// import ftShadow from "../assets/images/Voting/ft-shadow.png";

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
      image: itb,
      votes: 11234,
    },
    {
      id: 3,
      name: "Universitas Gadjah Mada",
      image: itb,
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
      <div className="bg-blue-gradient relative z-10 h-auto p-10 pb-20 sm:pb-24 md:pb-28 lg:pb-60">
        <BackgroundBars />
        <BackgroundClouds />

        <TopWinners votingData={sampleVotingData} />
        <div className="container mx-auto mb-16 px-2 md:mb-20 lg:mb-32">
          <p className="mb-2 text-center font-pixelify text-xl text-white sm:text-3xl md:text-4xl lg:mb-4 lg:text-5xl">
            Top Leaderboard From Voting
          </p>
          <div className="mx-auto w-full max-w-[100%] shadow-2xl md:max-w-[90%] lg:max-w-[85%]">
            <div className="custom-scrollbar flex h-[480px] flex-col rounded-2xl border border-white bg-[rgba(255,255,255,0.6)] p-1 backdrop-blur-md sm:h-[320px] md:h-[400px] lg:h-auto lg:flex-row lg:p-5">
              <div className="custom-scrollbar custom-scrollbar-blue h-[310px] grow overflow-y-auto">
                <CampusTable>
                  {Array.from({ length: 25 }, (_, index) => index + 1).map(
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

        <div className="container mx-auto px-2 py-6 sm:px-4 sm:py-8 md:py-10">
          <div className="mx-auto w-full max-w-[100%] shadow-2xl md:max-w-[90%] lg:max-w-[85%]">
            <div className="flex flex-col rounded-2xl border border-white bg-[rgba(255,255,255,0.6)] p-2 backdrop-blur-md sm:p-3 md:p-4 lg:p-3">
              <h1 className="inline-block bg-gradient-to-r from-orange-600 to-red-800 bg-clip-text text-center font-montserrat text-[15px] font-bold text-transparent sm:text-xl md:text-2xl lg:p-2 lg:text-4xl">
                CHOOSE YOUR FAVORITE COLLEGE!!!
              </h1>
              <form className="grow space-y-2 sm:space-y-3" onSubmit={onSubmit}>
                <div className="custom-scrollbar custom-scrollbar-red h-[375px] overflow-y-auto p-1 md:h-[420px] lg:h-auto lg:p-2">
                  <div className="grid w-full grid-cols-4 gap-1 sm:grid-cols-5 sm:gap-3 md:grid-cols-6 md:gap-3 lg:grid-cols-7">
                    {Array.from({ length: 25 }, (_, index) => index + 1).map(
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
          </div>
        </div>
      </div>
      <div className="bg-footer-gradient relative z-0 overflow-hidden pt-16 md:pt-40">
        {/* <img
          src={ftShadow}
          className="translate-x- absolute -top-2 left-20 -z-20 translate-y-2 scale-125 md:-top-10 md:left-32 lg:-top-[10%] lg:left-1/4 lg:w-[70%] lg:translate-x-12 lg:translate-y-3"
        /> */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Voting;
