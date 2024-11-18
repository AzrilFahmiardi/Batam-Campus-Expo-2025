import AboutCloud1 from "../../assets/images/LandingPage/AboutCloud1.png";
import AboutCloud2 from "../../assets/images/LandingPage/AboutCloud2.png";
import BCEBlue from "../../assets/images/LandingPage/BCEBlue.png";
import Dice from "../../assets/images/LandingPage/Dice.png";

const BCEDescription = () => {
  return (
    <div className="relative -z-20 grid grid-rows-2 place-items-center justify-center gap-1 px-5 md:grid-cols-2 md:grid-rows-1 md:px-20 md:py-48">
      <img
        src={AboutCloud1}
        className="absolute left-0 top-32 -z-10 max-w-[180px]"
      />

      <img
        src={AboutCloud2}
        className="absolute -left-32 bottom-0 -z-10 max-w-[180px] md:bottom-20 md:left-1/2 md:-translate-x-full"
      />

      <img
        src={Dice}
        className="absolute bottom-5 right-0 -z-10 max-w-[100px] md:max-w-[150px]"
      />

      <img src={BCEBlue} className="max-w-[400px]" />

      <p className="text-justify font-montserrat text-white">
        Lorem ipsum dolor sit amet consectetur. Ut sed pellentesque urna proin
        suscipit quis non. Dolor et lacinia dis cras dolor nunc. Vivamus orci
        diam amet tincidunt. Eu libero elit in porttitor dignissim a.
        Suspendisse a eget pretium malesuada. Odio parturient ullamcorper nam
        tempus lacinia neque turpis. Accumsan eget consequat arcu sem.
      </p>
    </div>
  );
};

export default BCEDescription;
