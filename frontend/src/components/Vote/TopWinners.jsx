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
        return "absolute left-1/2 -translate-x-1/2 top-0 z-30";
      case 2:
        return "absolute left-[25%] -translate-x-1/2 bottom-0 z-20";
      case 3:
        return "absolute left-[75%] -translate-x-1/2 bottom-0 z-20";
      default:
        return "";
    }
  };

  const getImageSize = (position) => {
    switch (position) {
      case 1:
      case 2:
      case 3:
        return "h-[14vh] w-auto sm:h-[20vh]";
      default:
        return "";
    }
  };

  // Only render if we have winners
  if (winners.length === 0) {
    return (
      <div className="relative mt-32 h-[25vh] sm:h-[35vh]">
        <div className="flex h-full items-center justify-center">
          <p className="text-center font-pixelify text-xl text-blue-600">
            No voting data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-32 h-[25vh] bg-pink-300 sm:h-[35vh]">
      {winners.map((winner) => (
        <div
          key={winner.id}
          className={`${getPositionStyles(winner.position)} flex flex-col items-center`}
        >
          <div
            className={`relative ${getImageSize(winner.position)} border-1 overflow-hidden rounded-full bg-[#fff] p-1 shadow-xl transition-transform hover:scale-105`}
          >
            <img
              src={winner.image}
              alt={winner.name}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      ))}

      {/* <div className="absolute bottom-0 left-0 right-0 flex h-[10vh] items-end justify-center">
        <div className="flex w-[80%] justify-between">
          <div className="h-[8vh] w-[30%] rounded-t-lg bg-blue-300"></div>
          <div className="h-[10vh] w-[30%] rounded-t-lg bg-blue-400"></div>
          <div className="h-[6vh] w-[30%] rounded-t-lg bg-blue-300"></div>
        </div>
      </div> */}
    </div>
  );
};

export default TopWinners;
