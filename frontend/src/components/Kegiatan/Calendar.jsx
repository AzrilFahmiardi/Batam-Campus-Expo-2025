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
      location:
        "Jl.Engku Putri, Tlk.Tering, Kec.Batam Kota, Kota Batam, Kepulauan Riau",
      schedule: [
        { time: "07:00 - 07:25", event: "Open Gate" },
        { time: "07:25 - 07:30", event: "Count Down" },
        { time: "07:30 - 07:35", event: "Soft Opening with Ad Lips" },
        { time: "07:35 - 07:43", event: "Tari Persembahan" },
        { time: "07:43 - 07:48", event: "Opening MC + Ad Lips" },
        { time: "07:48 - 07:53", event: "Kata Sambutan Wali Kota" },
        { time: "07:53 - 07:58", event: "Kata Sambutan Dinas Pendidikan" },
        { time: "07:58 - 08:01", event: "Kata Sambutan Koordinator Umum" },
        {
          time: "08:01 - 08:04",
          event: "Prosesi Pembukaan oleh Wali Kota dan Dinas Pendidikan",
        },
        { time: "08:04 - 08:24", event: "Drama dan Parade Kampus" },
        {
          time: "08:24 - 08:39",
          event: "Sapa Pengunjung + Opening Booth + Ad Lips",
        },
        { time: "08:39 - 08:45", event: "Behind Batam Campus Expo" },
        { time: "08:45 - 08:55", event: "Sapa Pengunjung + Ad Lips" },
        {
          time: "08:55 - 09:25",
          event: "Talk Show Mahasiswa: Mimpi Masuk Kampus Impian",
        },
        { time: "09:25 - 09:40", event: "Tanya Jawab" },
        { time: "09:40 - 09:50", event: "Sapa Pengunjung + Ad Lips" },
        { time: "09:50 - 10:05", event: "Games + Trivia" },
        { time: "10:05 - 10:15", event: "Sapa Pengunjung + Ad Lips" },
        { time: "10:15 - 10:25", event: "MC Down to Expo" },
        { time: "10:25 - 10:30", event: "Sapa Pengunjung + Ad Lips" },
        {
          time: "10:30 - 11:00",
          event: "Talk Show: Beasiswa, Prestasi, & Campus Life",
        },
        { time: "11:00 - 11:10", event: "Sapa Pengunjung + Ad Lips" },
        { time: "11:10 - 11:25", event: "Games + Trivia" },
        { time: "11:25 - 11:35", event: "Sapa Pengunjung + Ad Lips" },
        { time: "11:35 - 11:50", event: "Live Music" },
        { time: "11:50 - 12:00", event: "Sapa Pengunjung + Ad Lips" },
        { time: "12:00 - 14:00", event: "Break ISHOMA" },
        { time: "14:00 - 14:10", event: "Sapa Pengunjung + Ad Lips" },
        { time: "14:10 - 14:25", event: "MC Down to Expo" },
        { time: "14:25 - 14:40", event: "Games + Trivia" },
        { time: "14:40 - 14:45", event: "Sapa Pengunjung + Ad Lips" },
        {
          time: "14:45 - 15:15",
          event: "Talk Show with Mahasiswa: Campus Funfact",
        },
        { time: "15:15 - 15:30", event: "Tanya Jawab" },
        { time: "15:30 - 15:45", event: "Break Sholat" },
        { time: "15:45 - 15:50", event: "Sapa Pengunjung + Ad Lips" },
        { time: "15:50 - 16:00", event: "Dance Modern" },
        { time: "16:00 - 16:05", event: "Sapa Pengunjung + Ad Lips" },
        { time: "16:05 - 16:20", event: "Live Music & Sing Along" },
        {
          time: "16:20 - 16:30",
          event: "Penutupan - Ad Lips - See U BCE 2026",
        },
        { time: "16:30 - 17:00", event: "Clear Area" },
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

      {/* Schedule Container */}
      <div className="w-full max-w-[1200px] rounded-b-lg bg-[#FBFFFF] shadow-md sm:w-3/4">
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
                  <p className="text-[7px] sm:text-[10px] md:text-[12px] lg:text-base">
                    {daySchedule.location}
                  </p>
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
