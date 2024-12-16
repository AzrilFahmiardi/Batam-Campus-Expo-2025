import React, { useState } from "react";
import Seperator from "../../assets/images/Kegiatan/Seperator.png";
import PinLocation from "../../assets/images/Kegiatan/pin.png";
import Border from "../../assets/images/Kegiatan/border.png";
import Kliping from "../../assets/images/Kegiatan/calendar.png";

const Calendar = () => {
  const [activeDay, setActiveDay] = useState(0);

  const scheduleData = [
    {
      date: "27 Januari 2025",
      location: "Jl. apalah itu namanya",
      schedule: [
        { time: "09:30 - 10:00", event: "Open gate" },
        { time: "10:00 - 10:05", event: "Pembukaan oleh MC" },
        { time: "10:05 - 10:10", event: "Tari Persembahan" },
        { time: "10:10 - 10:20", event: "Pemuatan video dan drama" },
        { time: "10:20 - 10:25", event: "Sapa audience" },
        { time: "10:25 - 10:30", event: "Sambutan oleh ketua panitia" },
        { time: "10:30 - 10:40", event: "Sambutan oleh Pemerintah" },
        { time: "10:40 - 10:45", event: "Proses pembukaan acara" },
        { time: "10:45 - 10:50", event: "Sapa audience" },
        { time: "10:50 - 11:05", event: "Story Behind BCE" },
        { time: "11:05 - 11:10", event: "Sapa audience" },
        { time: "11:10 - 11:35", event: "Talk Show" },
        { time: "11:35 - 11:50", event: "Tanya Jawab" },
        { time: "12:00 - 13:00", event: "Break" },
        { time: "13:05 - 13:15", event: "Sapa audience" },
        { time: "13:15 - 13:30", event: "Pembutan video dengan audience" },
        { time: "13:30 - 13:35", event: "Peragantian MC sdi dengan MC Intern" },
      ],
    },
    {
      date: "28 Januari 2025",
      location: "Jl. apalah itu namanya",
      schedule: [
        { time: "09:30 - 10:00", event: "Open gate" },
        { time: "10:00 - 10:05", event: "Pembukaan oleh MC" },
        { time: "10:05 - 10:10", event: "Tari Persembahan" },
        { time: "10:10 - 10:20", event: "Pemuatan video dan drama" },
        { time: "10:20 - 10:25", event: "Sapa audience" },
        { time: "10:25 - 10:30", event: "Sambutan oleh ketua panitia" },
        { time: "10:30 - 10:40", event: "Sambutan oleh Pemerintah" },
        { time: "10:40 - 10:45", event: "Proses pembukaan acara" },
        { time: "10:45 - 10:50", event: "Sapa audience" },
        { time: "10:50 - 11:05", event: "Story Behind BCE" },
        { time: "11:05 - 11:10", event: "Sapa audience" },
        { time: "11:10 - 11:35", event: "Talk Show" },
        { time: "11:35 - 11:50", event: "Tanya Jawab" },
        { time: "12:00 - 13:00", event: "Break" },
        { time: "13:05 - 13:15", event: "Sapa audience" },
        { time: "13:15 - 13:30", event: "Pembutan video dengan audience" },
        { time: "13:30 - 13:35", event: "Peragantian MC sdi dengan MC Intern" },
      ],
    },
  ];

  return (
    <section className="relative my-10 flex flex-col items-center md:my-20">
      {/* Calendar Header Image */}
      <div className="flex w-full justify-center">
        <img
          src={Kliping}
          alt="Calendar Header"
          className="w-full max-w-[1200px] sm:w-3/4"
        />
      </div>

      {/* Mobile Day Switcher */}
      <div className="block w-full bg-white px-4 pt-8 sm:w-3/4 md:hidden">
        <div className="flex justify-center space-x-4">
          {scheduleData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`rounded-lg px-4 py-2 text-[11px] font-semibold transition-all duration-300 md:text-base ${
                activeDay === index
                  ? "bg-[#9E0202] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {day.date}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Container */}
      <div className="w-full max-w-[1200px] rounded-b-lg bg-[#FBFFFF] shadow-md sm:w-3/4">
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          {scheduleData.map((daySchedule, dayIndex) => (
            <div
              key={dayIndex}
              className={`p-4 sm:p-6 ${
                dayIndex !== activeDay ? "hidden md:block" : ""
              }`}
            >
              {/* Date and Location */}
              <div className="mb-4 text-center">
                <h3 className="text-base font-bold text-[#9E0202] sm:text-lg md:text-2xl">
                  {daySchedule.date}
                </h3>
                <div className="flex items-center justify-center gap-2 py-2">
                  <img
                    src={PinLocation}
                    alt="Location Pin"
                    className="h-[10px] sm:h-[25px]"
                  />
                  <p className="text-xs sm:text-base">{daySchedule.location}</p>
                </div>
              </div>

              {/* Schedule Events */}
              <div className="grid grid-cols-1 gap-2 sm:gap-4">
                {daySchedule.schedule.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="flex items-center gap-2 rounded-lg border border-[#C9C9C9] bg-white px-1 py-2 sm:px-2 sm:py-3 md:gap-6 md:rounded-xl"
                  >
                    <span className="text-[9px] font-semibold text-[#EB5E0B] sm:text-[11px]">
                      {event.time}
                    </span>
                    <img
                      src={Seperator}
                      alt="Separator"
                      className="h-[15px] sm:h-[20px]"
                    />
                    <span className="truncate text-[9px] sm:text-[12px]">
                      {event.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Vertical Border Image for Desktop */}
          {scheduleData.length > 1 && (
            <div className="absolute bottom-0 left-1/2 top-10 hidden -translate-x-1/2 transform md:block">
              <img
                src={Border}
                alt="Divider"
                className="w-auto object-cover md:h-[98%]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
