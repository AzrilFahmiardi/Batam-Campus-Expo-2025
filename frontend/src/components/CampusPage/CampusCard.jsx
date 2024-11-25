import cardImage from "../../assets/images/CampusPage/ugm-card.png"
import logoCard from "../../assets/images/CampusPage/ugm-logo-card.png"
import locationLogo from "../../assets/images/CampusPage/location-logo.svg"


const CampusCard = ({university, delay}) => {

    if (!university) {
        return (
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay={delay} data-aos-once="true" className="w-[420px] h-[300px] bg-white rounded-xl">
                <div className="h-[180px] bg-gray-200 rounded-t-xl"></div>
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
        <div data-aos="fade-up"  data-aos-duration="1000" data-aos-delay={delay} data-aos-once="true" className="w-[420px] h-[300px] bg-white rounded-xl">
            <div className="relative h-auto">
                <img src={cardImage} alt="Campus Image" className="rounded-t-xl" />
                <p className="absolute top-2 left-2 text-white text-sm font-bold font-montserrat bg-gradient-to-b from-[#EB5E0B] to-[#9E0202] rounded-xl px-2 py-1">
                Rank {university.rank_international}
                </p>
                <p className="absolute bottom-2 right-2 text-white text-[0.7em] font-bold font-montserrat bg-[#3A3A3A]/[.77] rounded-xl px-2 py-1">
                Akreditasi {university.akreditasi}
                </p>
            </div>
            <div className="flex gap-10 py-4 px-5">
                <img src={logoCard} alt="logo" />
                <div className="text-left font-montserrat">
                <p className="font-bold text-[1.1em] text-[#3A3A3A] truncate max-w-[240px]">
                    {university.nama}
                </p>
                <p className="text-[0.9em]">{university.jumlah_prodi} Program Studi</p>
                <p className="text-[0.7em] font-semibold flex items-center mt-2">
                    <img src={locationLogo} alt="location" className="mr-2 w-3" />
                    {university.lokasi}
                </p>
            </div>
            </div>
        </div>

    );

}

export default CampusCard