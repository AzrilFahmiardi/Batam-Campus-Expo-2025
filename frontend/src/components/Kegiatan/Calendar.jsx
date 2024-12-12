import React from "react";
import Kliping from "../../assets/images/Kegiatan/calendar.png";
import ActivitySchedule from "./ActivitySchedule";

const Calendar = () => {
  return (
    <section className="relative my-20 flex flex-col items-center">
      <div className="flex w-full justify-center">
        <img src={Kliping} className="w-3/4" />
      </div>

      <div className="w-3/4 rounded-b-lg bg-[#FBFFFF] shadow-md">
        <ActivitySchedule />
      </div>
    </section>
  );
};

export default Calendar;
