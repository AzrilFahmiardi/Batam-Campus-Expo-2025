import { Fragment, useEffect, useState } from "react";
import Header from "../components/LandingPage/Header";
import itb from "../assets/images/itb.png";
import Footer from "../components/Footer";
import VoteItem from "../components/Vote/VoteItem";
import Popup from "../components/Vote/PopUp";
import CampusTable from "../components/Vote/CampusTable";
import CampusTableItem from "../components/Vote/CampusTableItem";
import Bar from "../assets/images/Voting/bar.png";
import Cloudone from "../assets/images/Voting/cloud1.png";
import Cloudtwo from "../assets/images/LandingPage/AboutCloud1.png";
import cloudthree from "../assets/images/Voting/cloud3.png";
import CloudBottomLeft from "../assets/images/LandingPage/CloudBottomLeft.png";
import CloudBottomRight from "../assets/images/LandingPage/CloudBottomRight.png";
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

  return (
    <Fragment>
      <Popup
        title={"Batas Vote Terlampaui!"}
        message={"Kamu cuma bisa milih 5 universitas ya!🤗"}
        isOpen={isMax}
        setIsOpen={setIsMax}
      />
      <Header />
      <div className="relative z-10 h-[200vh] bg-blue-gradient p-10 sm:h-[250vh] md:h-[280vh]">
        {/* bar */}
        <div className="absolute inset-0">
          <img
            src={Bar}
            className="absolute -bottom-12 left-1/2 -z-20 h-[94%] w-[24%] -translate-x-[50%] md:-bottom-14 md:h-[95%] md:w-[20%] lg:-bottom-20 lg:h-[96%] lg:w-[17%]"
          />
          <img
            src={Bar}
            className="absolute -bottom-24 right-1/2 -z-10 h-[92%] w-[24%] -translate-x-[20%] md:-bottom-32 md:h-[93%] md:w-[20%] lg:-bottom-40 lg:h-[94%] lg:w-[17%]"
          />
          <img
            src={Bar}
            className="absolute -bottom-24 left-1/2 -z-10 h-[90%] w-[24%] translate-x-[20%] md:-bottom-32 md:h-[91%] md:w-[20%] lg:-bottom-40 lg:h-[92%] lg:w-[17%]"
          />
        </div>

        {/* cloud */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={Cloudone}
            className="absolute -right-16 w-[30%] translate-y-20 sm:-right-20 md:w-[20%] lg:-right-32 lg:translate-y-16"
            alt="Cloud decoration"
          />
          <img
            src={Cloudtwo}
            className="absolute left-1/4 top-20 -z-10 w-[25%] sm:left-[32%] sm:w-[18%]"
          />
          <img
            src={cloudthree}
            className="absolute -left-5 top-[23%] w-[30%] sm:top-1/4 sm:w-[20%]"
          />
          <img
            src={cloudthree}
            className="absolute -right-12 top-[25%] w-[35%] sm:-right-5 sm:top-[28%] sm:w-[20%]"
          />
          <img
            src={Cloudone}
            className="absolute left-1/4 top-[45%] w-[30%] sm:top-[42%] sm:w-[20%]"
            alt="Cloud decoration"
          />
          <img
            src={Cloudtwo}
            className="left-2- absolute bottom-1/3 w-[30%] sm:bottom-1/4 sm:left-14 sm:w-[18%]"
          />
          <img
            src={CloudBottomLeft}
            className="absolute bottom-0 left-0 -z-30 w-1/2"
          />
          <img
            src={CloudBottomRight}
            className="absolute bottom-0 right-0 -z-30 w-1/2"
          />
        </div>

        <div className="mt-32 h-[25vh] bg-[#ffffff6b] sm:h-[35vh]"></div>

        <div className="container mx-auto mb-16 px-2 md:mb-20 md:mt-10 lg:mb-32">
          <p className="mb-2 text-center font-pixelify text-2xl text-white md:text-4xl lg:mb-4 lg:text-5xl">
            Top Leaderboard From Voting
          </p>
          <div className="mx-auto w-full max-w-[100%] shadow-2xl md:max-w-[90%] lg:max-w-[80%]">
            <div className="custom-scrollbar flex flex-col rounded-lg border border-white bg-[rgba(255,255,255,0.5)] p-1 backdrop-blur-md lg:flex-row lg:p-5">
              <div className="custom-scrollbar custom-scrollbar-blue h-[310px] grow overflow-y-auto">
                <CampusTable>
                  {Array.from({ length: 20 }, (_, index) => index + 1).map(
                    (item) => (
                      <CampusTableItem
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
