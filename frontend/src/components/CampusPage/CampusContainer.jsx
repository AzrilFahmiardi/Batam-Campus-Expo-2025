import logo from "../../assets/images/Hero-Logo.svg";
import headline from "../../assets/images/CampusPage/find-your-future.svg"
import CloudHeroTopRight from "../../assets/images/LandingPage/CloudHeroTopRight.png";
import CloudHeroTopLeft from "../../assets/images/LandingPage/CloudHeroTopLeft.png";


import CampusCard from "./CampusCard"

const CampusContainer = () => {
    return(
        <section
            className="relative -z-20 flex h-auto flex-col items-center justify-start overflow-hidden py-10  text-center bg-campus-page-background-gradient sm:py-14 md:py-16 lg:py-20 xl:py-24"
        >
        <img
        src={CloudHeroTopRight}
        className="animate__animated animate__fadeInRight animate__fast absolute right-0 top-24 -z-10 max-w-36 md:max-w-full"
      />
        <img
        src={CloudHeroTopLeft}
        className="animate__animated animate__fadeInLeft animate__fast absolute left-0 top-[300px] -z-10 max-w-36 translate-y-full md:max-w-full md:translate-y-1/3"
      />
        <div className="animate__animated animate__zoomIn animate__slow relative flex h-auto w-full max-w-screen-lg flex-col items-center justify-center px-10 mt-[150px] sm:px-5">
            <img src={logo} className="h-[50px]" />
            <img src={headline} alt="headline" />
        </div>
        {/* BUAT FILTER DAN DROPDOWN DISINI NANTI (MALAS) */}
        <div className="grid grid-cols-4 gap-5 mt-[300px]">
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />
            <CampusCard />

        </div>
        </section>  
    );
}

export default CampusContainer;
