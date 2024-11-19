import Bar from "../../assets/images/Voting/bar.png";

const BackgroundBars = () => {
  return (
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
  );
};

export default BackgroundBars;
