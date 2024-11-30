import LocationIcon from "../../assets/images/LocationIcon.png";
import LocationIconBackground from "../../assets/images/locationIconBackground.png";

const Location = () => {
  return (
    <div className="relative space-y-8 overflow-hidden p-5 px-11 md:space-y-16 md:py-20">
      <img
        src={LocationIconBackground}
        className="absolute -right-20 top-20 -z-10 max-w-56 md:top-0 md:max-w-full"
      />
      <img
        src={LocationIconBackground}
        className="absolute -left-20 bottom-0 -z-10"
      />
      <p className="text bg-orange-red-gradient bg-clip-text text-center font-pixelify text-2xl font-bold text-transparent sm:text-3xl md:text-5xl">
        Event Location
        <span className="relative">
          <img
            src={LocationIcon}
            className="absolute inline max-w-10 md:-right-20 md:-top-10 md:max-w-20"
          />
        </span>
      </p>
      <div className="grid grid-rows-2 place-items-center gap-5 text-sm sm:grid-rows-1 sm:text-base md:grid-cols-2 lg:gap-10">
        <Maps
          mapUrl={
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.5219414969931!2d104.05344419175601!3d1.1289149909414655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d9890456e5474d%3A0xee8d00d5385ae78e!2sAlun%20Alun%20Batam%20Centre!5e0!3m2!1sen!2sid!4v1731159298938!5m2!1sen!2sid"
          }
          description={`Alun Alun Batam Centre 43H3+CRQ, Jl. Engku Putri, Tlk. Tering, Kec.
        Batam Kota, Kota Batam, Kepulauan Riau 29444`}
        />
        <Maps
          mapUrl={
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.5219414969931!2d104.05344419175601!3d1.1289149909414655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d9890456e5474d%3A0xee8d00d5385ae78e!2sAlun%20Alun%20Batam%20Centre!5e0!3m2!1sen!2sid!4v1731159298938!5m2!1sen!2sid"
          }
          description={`Alun Alun Batam Centre 43H3+CRQ, Jl. Engku Putri, Tlk. Tering, Kec.
        Batam Kota, Kota Batam, Kepulauan Riau 29444`}
        />
      </div>
    </div>
  );
};

const Maps = ({ mapUrl, description }) => {
  return (
    <div>
      <div className="mx-auto w-fit rounded-2xl border-4 border-red-600 p-2">
        <iframe
          src={mapUrl}
          className="size-[300px] rounded-2xl border-0 shadow-xl md:w-[320px] md:shadow-2xl lg:h-[300px] lg:w-[450px] 2xl:h-[400px] 2xl:w-[600px]"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="px-10 py-5 text-center font-pixelify font-bold">
        {description}
      </p>
    </div>
  );
};

export default Location;
