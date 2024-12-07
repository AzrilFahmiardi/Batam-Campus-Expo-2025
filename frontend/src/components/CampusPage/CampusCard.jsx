import logoCard from "../../assets/images/CampusPage/ugm-logo-card.png"
import locationLogo from "../../assets/images/CampusPage/location-logo.svg"


const CampusCard = ({university, delay}) => {

    if (!university) {
        return (
            <div data-aos="fade-up"  data-aos-duration="1000" data-aos-delay={delay} data-aos-once="true" className="cursor-pointer md:pr-0 pr-[3.9rem] relative w-[90vw] md:w-[420px] h-[100px] md:h-[300px] bg-white rounded-xl grid grid-cols-2 overflow-hidden md:flex md:flex-col">
                <div className="flex gap-10 py-4 px-5">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div data-aos="fade-up"  data-aos-duration="1000" data-aos-delay={delay} data-aos-once="true" className="cursor-pointer md:pr-0 pr-[3.9rem] relative w-[90vw] md:w-[420px] h-[100px] md:h-[300px] bg-white rounded-xl grid grid-cols-2 overflow-hidden md:flex md:flex-col">
            <div className="  relative w-[150px] sm:w-[700px] md:w-full overflow-y-hidden">
                <img src={university.cardImage} alt="Campus Image" className=" rounded-l-xl md:rounded-bl-none md:rounded-t-xl h-[100px] w-[200px]  sm:h-[190px] md:w-full object-center object-cover " />
                <p className="absolute top-2 left-2 text-white text-[0.2em] md:text-[0.8em] font-bold font-montserrat bg-gradient-to-b from-[#EB5E0B] to-[#9E0202] rounded-xl px-2 py-1">
                Rank {university.rank_international}
                </p>
                <p className="absolute bottom-6 sm:bottom-6 right-2 sm:right-[64em] md:right-2 md:bottom-2 text-white text-[0.5em] md:text-[0.7em] font-bold font-montserrat bg-[#3A3A3A]/[.77] rounded-xl px-2 py-1">
                Akreditasi {university.akreditasi}
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-7 py-4 md:py-2 px-5  w-[300px]">
                <img src={university.logo} alt="logo" className="w-[100px] h-[90px] md:w-cover md:object-cover p-1 hidden  md:block"/>
                <div className="text-left font-montserrat">
                <p className="font-bold text-[0.75em] md:text-[1.1em] text-[#3A3A3A] truncate max-w-[240px] my-2 md:mb-1">
                {university.nama.length > 30 
                        ? `${university.nama.substring(0, 20)}...` 
                        : university.nama
                        }
                </p>
                <div className="flex  h-[50px] ml-2">
                    <div className="">
                    <p className="text-[0.6em] md:text-[0.9em] w-full">{university.jumlah_prodi} Program Studi</p>
                    <p className="text-[0.5em] md:text-[0.7em] font-semibold flex items-center mt-0 md:mt-2 w-full md:w-[250px]">
                        <img src={locationLogo} alt="location" className="mr-2 w-3" />
                        {university.lokasi.length > 30 
                        ? `${university.lokasi.substring(0, 20)}...` 
                        : university.lokasi
                        }
                    </p>
                    </div>
                    
                </div>
            
                </div>
            </div>
        </div>

    );

}

export default CampusCard