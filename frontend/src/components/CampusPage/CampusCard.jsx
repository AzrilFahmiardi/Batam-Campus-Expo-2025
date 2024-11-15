import cardImage from "../../assets/images/CampusPage/ugm-card.png"
import logoCard from "../../assets/images/CampusPage/ugm-logo-card.png"
import locationLogo from "../../assets/images/CampusPage/location-logo.svg"


const CampusCard = () => {

    return(
        <div className="w-[22vw] h-[300px] bg-white rounded-xl">
            <div className="relative h-auto">
                <img src={cardImage} alt="Campus Image" className="rounded-t-xl" />
                <p className="absolute top-2 left-2 text-white text-sm font-bold font-montserrat bg-red-500 rounded-xl px-2 py-1">
                Rank 239
                </p>
                <p className="absolute bottom-2 right-2 text-white text-[0.7em] font-bold font-montserrat bg-[#3A3A3A]/[.77] rounded-xl px-2 py-1">
                Akreditasi A
                </p>
            </div>
            <div className="flex gap-10 py-4 px-5">
                <img src={logoCard} alt="logo" />
                <div className="text-left font-montserrat">
                    <p className="font-bold text-[1.2em] text-[#3A3A3A]">Universitas Gadjah Mada</p>
                    <p>270 Program Studi</p>
                    <p className="text-[0.7em] font-semibold flex items-center mt-2">
                        <img src={locationLogo} alt="location" className="mr-2 w-3" />
                        DI Yogyakarta
                    </p>
                </div>
            </div>
        </div>

    );

}

export default CampusCard