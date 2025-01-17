import React, { useState } from "react";
import Seperator from "../../assets/images/Kegiatan/Seperator.png";
import PinLocation from "../../assets/images/Kegiatan/pin.png";
import Border from "../../assets/images/Kegiatan/border.png";
import Kliping from "../../assets/images/Kegiatan/calendar.png";

const Calendar = () => {
  const [activeDay, setActiveDay] = useState(0);

  const scheduleData = [
    {
      date: "25 Januari 2025",
      location: "Engku Putri Center Park Batam",
      schedule: [
        { time: "10:00 - 10:15", event: "Open Gate" },
        { time: "10:15 - 10:20", event: "Soft Opening with Ad Lips" },
        { time: "10:20 - 10:25", event: "Tari Persembahan" },
        { time: "10:25 - 10:30", event: "Opening MC + Ad Lips" },
        { time: "10:30 - 10:35", event: "Kata Sambutan Wali Kota" },
        { time: "10:35 - 10:40", event: "Kata Sambutan Dinas Pendidikan" },
        { time: "10:40 - 10:45", event: "Kata Sambutan Koordinator Umum" },
        {
          time: "10:45 - 10:50",
          event: "Prosesi Pembukaan oleh Wali Kota dan Dinas Pendidikan",
        },
        { time: "10:50 - 11:10", event: "Parade Kampus" },
        {
          time: "11:10 - 11:15",
          event: "Sapa Pengunjung + Opening Booth + Ad Lips",
        },
        { time: "11:15 - 11:25", event: "Behind Batam Campus Expo" },
        { time: "11:25 - 11:45", event: "MC Down to Expo" },
        { time: "11:45 - 11:55", event: "Games + Trivia" },
        { time: "11:55 - 12:05", event: "Sapa Pengunjung + Ad Lips" },
        { time: "12:05 - 12:35", event: "Break ISHOMA" },
        { time: "12:35 - 12:45", event: "Sapa Pengunjung + Ad Lips" },
        {
          time: "12:45 - 13:15",
          event: "Talk Show Mahasiswa: Mimpi Masuk Kampus Impian",
        },
        { time: "13:15 - 13:30", event: "Tanya Jawab" },
        { time: "13:30 - 13:40", event: "Sapa Pengunjung + Ad Lips" },
        { time: "13:40 - 13:55", event: "Games + Trivia" },
        { time: "13:55 - 14:05", event: "Sapa Pengunjung + Ad Lips" },
        { time: "14:05 - 14:15", event: "Live Music" },
        {
          time: "14:15 - 14:45",
          event: "Talk Show: Beasiswa, Prestasi, & Campus Life",
        },
        { time: "14:45 - 15:00", event: "Tanya Jawab" },
        { time: "15:00 - 15:10", event: "Sapa Pengunjung + Ad Lips" },
        { time: "15:10 - 15:25", event: "Games + Trivia" },
        { time: "15:25 - 15:30", event: "Sapa Pengunjung + Ad Lips" },
        { time: "15:30 - 15:45", event: "Break Sholat + Dance" },
        { time: "15:45 - 15:55", event: "Sapa Pengunjung + Ad Lips" },
        { time: "15:55 - 16:10", event: "MC Down to Expo" },
        {
          time: "16:10 - 16:40",
          event: "Talk Show with Mahasiswa: How to Get Your Goals",
        },
        { time: "16:40 - 16:55", event: "Tanya Jawab" },
        { time: "16:55 - 17:05", event: "Sapa Pengunjung + Ad Lips" },
        {
          time: "17:05 - 17:35",
          event: "Talk Show with Mahasiswa: Campus Funfact",
        },
        { time: "17:35 - 17:50", event: "Tanya Jawab" },
        { time: "17:50 - 18:00", event: "Sapa Pengunjung + Ad Lips" },
        { time: "18:00 - 18:15", event: "Break Sholat + Dance" },
        { time: "18:15 - 18:25", event: "Sapa Pengunjung + Ad Lips" },
        { time: "18:25 - 18:40", event: "MC Down to Expo" },
        { time: "18:40 - 18:55", event: "Games + Trivia" },
        { time: "18:55 - 19:05", event: "Messages and Impressions" },
        { time: "19:05 - 19:20", event: "Live Music + Sing Along" },
        {
          time: "19:20 - 19:30",
          event: "Penutupan - Ad Lips - See U BCE 2026",
        },
        { time: "19:30 - 20:00", event: "Clear Area" },
      ],
    },
  ];

  return (
    <section className="relative my-10 flex flex-col items-center md:my-20">
      <div className="flex w-full justify-center">
        <img
          src={Kliping}
          alt="Calendar Header"
          className="w-full max-w-[1100px] sm:w-3/4"
        />
      </div>

      {/* Schedule Container */}
      <div className="w-full max-w-[1100px] rounded-b-lg bg-[#FBFFFF] shadow-md sm:w-3/4">
        <div className="relative grid grid-cols-1">
          {scheduleData.map((daySchedule, dayIndex) => (
            <div
              key={dayIndex}
              className={`p-4 sm:p-6 ${dayIndex !== activeDay ? "hidden" : ""}`}
            >
              {/* Date and Location */}
              <div className="mb-4 px-2 py-2 text-center sm:py-6 lg:py-12">
                <h3 className="mb-2 text-sm font-bold text-[#9E0202] sm:text-xl md:text-2xl lg:text-4xl">
                  {daySchedule.date}
                </h3>
                <div className="flex items-center justify-center gap-1 py-2 sm:gap-2">
                  <img
                    src={PinLocation}
                    alt="Location Pin"
                    className="h-[10px] sm:h-[25px]"
                  />
                  <p className="text-base md:text-lg">{daySchedule.location}</p>
                </div>
              </div>

              {/* Schedule Events */}
              <div className="grid grid-cols-1 gap-2 sm:gap-4">
                {daySchedule.schedule.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="flex items-center gap-2 rounded-lg border border-[#C9C9C9] bg-white px-2 py-2 md:gap-4 md:rounded-xl md:px-2 md:py-2 lg:gap-6 lg:px-3 lg:py-3"
                  >
                    <span className="min-w-[40px] text-[9px] font-semibold text-[#EB5E0B] sm:min-w-[50px] sm:text-[11px] md:min-w-[60px] md:text-[13px] lg:min-w-[90px] lg:text-base">
                      {event.time}
                    </span>
                    <img
                      src={Seperator}
                      alt="Separator"
                      className="h-[15px] sm:h-[20px]"
                    />
                    <span className="flex-1 text-[9px] sm:text-[12px] md:text-[13px] lg:text-base">
                      {event.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
