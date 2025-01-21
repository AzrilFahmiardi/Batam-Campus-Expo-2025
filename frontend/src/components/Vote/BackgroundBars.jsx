import Bar from "../../assets/images/Voting/bar.png";

const BackgroundBars = () => {
  return (
    <div className="absolute inset-0">
      <img
        src={Bar}
        className="absolute -bottom-12 left-1/2 -z-20 h-[95%] w-[110px] -translate-x-[50%] sm:h-[95%] sm:w-[160px] md:-bottom-20 md:h-[95%] md:w-[200px] lg:-bottom-24 lg:w-[220px] xl:h-[95%]"
      />
      <img
        src={Bar}
        className="absolute -bottom-28 right-1/2 -z-10 h-[94%] w-[110px] -translate-x-[20%] sm:h-[93%] sm:w-[160px] md:-bottom-40 md:h-[93%] md:w-[200px] lg:-bottom-48 lg:w-[230px] xl:h-[93%]"
      />
      <img
        src={Bar}
        className="absolute -bottom-28 left-1/2 -z-10 h-[93%] w-[110px] translate-x-[20%] sm:h-[91%] sm:w-[160px] md:-bottom-40 md:h-[91%] md:w-[200px] lg:-bottom-48 lg:w-[230px] xl:h-[91%]"
      />
    </div>
  );
};

export default BackgroundBars;
