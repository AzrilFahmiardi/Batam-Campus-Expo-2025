import AboutCloud1 from "../../assets/images/LandingPage/AboutCloud1.png";
import AboutCloud2 from "../../assets/images/LandingPage/AboutCloud2.png";
import BCEBlue from "../../assets/images/LandingPage/BCEBlue.png";
import Dice from "../../assets/images/LandingPage/Dice.png";

const BCEDescription = () => {
  return (
    <div className="relative -z-20 grid grid-rows-2 place-items-center justify-center gap-1 px-11 py-20 md:grid-cols-2 md:grid-rows-1 md:gap-20 md:px-20 md:py-60">
      <img src={AboutCloud1} className="absolute left-0 top-10 -z-10" />
      <img
        src={AboutCloud2}
        className="absolute -left-32 bottom-0 -z-10 md:bottom-20 md:left-1/2 md:-translate-x-full"
      />
      <img
        src={Dice}
        className="absolute bottom-5 right-0 -z-10 max-w-24 md:max-w-max"
      />
      <img src={BCEBlue} alt="Batam Campus Expo" />
      <p className="text-justify font-montserrat text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quo
        reprehenderit repudiandae unde minima corporis animi? Facilis
        repudiandae, culpa quo corporis reprehenderit harum, quasi maxime sequi
        minus laborum, quod rem! Error sit molestias, excepturi at natus
        quisquam molestiae sapiente voluptates, non praesentium, atque modi sed.
        Commodi sint quae minus incidunt molestias eveniet laborum esse veniam
        beatae quis harum, ipsum similique! Iste quaerat temporibus officiis
        reiciendis, asperiores vitae non, voluptas at odio esse dolores, ducimus
        recusandae aspernatur iure sapiente? Error unde asperiores accusantium
        tempora vel porro saepe recusandae doloremque numquam cumque?
      </p>
    </div>
  );
};
export default BCEDescription;
