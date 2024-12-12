import React from "react";
import Seperator from "../../assets/images/Kegiatan/Seperator.png";
import PinLocation from "../../assets/images/Kegiatan/pin.png";

const ActivitySchedule = () => {
  const scheduleData = [
    {
      date: "27 Januari 2025",
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
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
      ],
    },
    {
      date: "28 Januari 2025",
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
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
        { time: "16:00 - 16:05", event: "Pembukaan oleh MC" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 rounded-lg bg-white p-6 font-montserrat shadow-md">
      <div className="border-r border-[#C9C9C9] pr-6">
        <div className="p-6">
          <h3 className="text-center text-2xl font-bold text-[#9E0202]">
            {scheduleData[0].date}
          </h3>
          <div className="mb-2 flex items-center justify-center gap-2 px-5 py-2 sm:gap-3">
            <img src={PinLocation} className="h-[10px] sm:h-[25px] sm:p-1" />
            <p className="text-[7px] sm:text-xs md:text-base">
              Jl. apalah itu namanya
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {scheduleData[0].schedule.map((event, eventIndex) => (
            <div
              key={eventIndex}
              className="flex items-center gap-2 rounded-xl border border-[#C9C9C9] bg-white p-4"
            >
              <span className="font-semibold text-[#EB5E0B]">{event.time}</span>
              <img src={Seperator} className="h-[20px]" />
              <span>{event.event}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="p-6">
          <h3 className="text-center text-2xl font-bold text-[#9E0202]">
            {scheduleData[1].date}
          </h3>
          <div className="mb-2 flex items-center justify-center gap-2 px-5 py-2 sm:gap-3">
            <img src={PinLocation} className="h-[10px] sm:h-[25px] sm:p-1" />
            <p className="text-[7px] sm:text-xs md:text-base">
              Jl. apalah itu namanya
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {scheduleData[1].schedule.map((event, eventIndex) => (
            <div
              key={eventIndex}
              className="flex items-center gap-2 rounded-xl border border-[#C9C9C9] bg-white p-4"
            >
              <span className="font-semibold text-[#EB5E0B]">{event.time}</span>
              <img src={Seperator} className="h-[20px]" />
              <span>{event.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySchedule;
