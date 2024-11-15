import logo from "../../assets/images/Hero-Logo.svg";
import headline from "../../assets/images/CampusPage/find-your-future.svg"

const CampusContainer = () => {
    return(
        <section
            className="relative -z-20 flex h-[200vh] flex-col items-center justify-start overflow-hidden py-10 text-center bg-campus-page-background-gradient sm:py-14 md:py-16 lg:py-20 xl:py-24"
        >
        <div className="animate__animated animate__zoomIn animate__slow relative flex h-auto w-full max-w-screen-lg flex-col items-center justify-center px-10 mt-[150px] sm:px-5">
        <img src={logo} className="h-[70px]" />
        <img src={headline} alt="headline" />

        {/* BUAT FILTER DAN DROPDOWN DISINI NANTI (MALAS) */}


        </div>
        </section>  
    );
}

export default CampusContainer;
