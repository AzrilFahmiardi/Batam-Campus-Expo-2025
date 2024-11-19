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
        return "absolute left-[27%] -translate-x-1/2 bottom-14 z-20";
      case 3:
        return "absolute left-[73%] -translate-x-1/2 bottom-2 z-20";
      default:
        return "";
    }
  };

  const getImageSize = (position) => {
    switch (position) {
      case 1:
      case 2:
      case 3:
        return "h-[14vh] w-auto sm:h-[19vh]";
      default:
        return "";
    }
  };

  return (
    <div className="relative mx-auto h-[25vh] sm:h-[42vh] md:mt-12 md:w-[100vh]">
      {winners.map((winner) => (
        <div
          key={winner.id}
          className={`${getPositionStyles(winner.position)} flex flex-col items-center`}
        >
          <div
            className={`relative ${getImageSize(winner.position)} border-1 rounded-full bg-[#fff] p-1 shadow-xl transition-transform hover:scale-105`}
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
