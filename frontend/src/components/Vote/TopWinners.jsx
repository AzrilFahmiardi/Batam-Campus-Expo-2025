import { useState, useEffect } from "react";

const TopWinners = ({ votingData }) => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const dataToProcess = Array.isArray(votingData) ? votingData : [];

    if (dataToProcess.length > 0) {
      const topThree = dataToProcess
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 3)
        .map((item, index) => ({
          ...item,
          position: index + 1,
        }));

      setWinners(topThree);
    }
  }, [votingData]);

  const getPositionStyles = (position) => {
    switch (position) {
      case 1:
        return "absolute -top-6 sm:-top-6 md:-top-16 left-1/2 -translate-x-1/2 lg:-top-12 z-30";
      case 2:
        return "absolute top-1/3 left-4 -translate-x-1 sm:left-8 -translate-y-2 sm:translate-x-1 sm:-translate-y-5  md:-translate-y-10 md:left-12 lg:top-1/4  lg:left-32 lg:translate-y-0 lg:-translate-x-4 z-20";
      case 3:
        return "absolute top-1/2 right-4 translate-x-1 -translate-y-4 sm:-translate-y-10 sm:right-10 sm:translate-x-1 sm:top-1/3 sm:-translate-y-8 sm:right-10 md:top-1/3 md:-translate-y-2 md:-translate-x-2 md:right-10 lg:top-1/3 lg:-translate-x-1 lg:translate-y-4 lg:right-28 z-20";
      default:
        return "";
    }
  };

  return (
    <div className="relative mx-auto mt-12 h-[190px] w-[260px] sm:h-[260px] sm:w-[400px] md:mt-32 md:h-[260px] md:w-[500px] lg:h-[350px] lg:w-[700px]">
      {winners.map((winner) => (
        <div
          key={winner.id}
          className={`${getPositionStyles(winner.position)} flex flex-col items-center`}
        >
          <div
            className={`border-1 relative h-[75px] w-auto rounded-full bg-[#fff] p-1 shadow-xl transition-transform hover:scale-105 sm:h-[100px] md:h-[125px] lg:h-[150px]`}
          >
            <img
              src={winner.image}
              alt={winner.name}
              className="h-full w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopWinners;
