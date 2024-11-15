import { Fragment, useEffect, useState } from "react";
import Header from "../components/LandingPage/Header";
import itb from "../assets/images/itb.png";
import Footer from "../components/Footer";
import VoteItem from "../components/Vote/VoteItem";
import Popup from "../components/Vote/PopUp";
import CampusTable from "../components/Vote/CampusTable";
import CampusTableItem from "../components/Vote/CampusTableItem";

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
      <div className="bg-blue-gradient p-10">
        <div className="h-[400px]"></div>

        <div className="container mx-auto">
          <div className="mx-auto lg:max-w-[80%]">
            <div className="custom-scrollbar flex flex-col rounded-lg border border-white bg-[rgba(255,255,255,0.5)] p-1 backdrop-blur-md lg:flex-row lg:p-5">
              <div className="custom-scrollbar custom-scrollbar-blue h-[300px] grow overflow-y-auto">
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

        <div className="container mx-auto">
          <div className="mx-auto lg:max-w-[80%]">
            <div className="flex flex-col rounded-lg border border-white bg-[rgba(255,255,255,0.5)] p-1 backdrop-blur-md lg:flex-row lg:p-5">
              <h1 className="vertical-text inline-block text-center font-montserrat text-xl font-bold text-[#166191] lg:rotate-180 lg:text-nowrap lg:pl-5 lg:text-4xl">
                CHOOSE YOUR FAVORITE COLLEGE!!!
              </h1>
              <form className="grow space-y-2 lg:space-y-4" onSubmit={onSubmit}>
                <div className="custom-scrollbar custom-scrollbar-red h-[700px] overflow-y-auto p-1 lg:p-3">
                  <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
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
                <div className="px-3">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-white py-3 font-montserrat text-xl font-bold duration-100 hover:bg-[#337ba8] hover:text-white"
                  >
                    Vote Now!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Voting;
