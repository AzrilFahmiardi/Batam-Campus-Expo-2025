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
        { time: "09:30 - 10:00", event: "Open Gate" },
        { time: "10:00 - 10:05", event: "Pembukaan Oleh MC (Silent)" },
        { time: "10:05 - 10:10", event: "Tari Persembahan" },
        {
          time: "10:10 - 10:20",
          event: "Pemutaran Video dan Drama (Parade Univ)",
        },
        { time: "10:20 - 10:25", event: "Sapa Audiens oleh MC" },
        { time: "10:25 - 10:30", event: "Kata Sambutan oleh Ketua Panitia" },
        { time: "10:30 - 10:40", event: "Kata Sambutan oleh Pemerintah" },
        { time: "10:40 - 10:45", event: "Prosesi Pembukaan Acara" },
        {
          time: "10:45 - 10:50",
          event: "Sapa Audiens oleh MC (menampilkan Barcode Petanyaan)",
        },
        { time: "10:50 - 11:05", event: "Story Behind BCE" },
        { time: "11:05 - 11:10", event: "Sapa Audiens oleh MC" },
        { time: "11:10 - 11:35", event: "Talks Show dengan 3 Mahasiswa" },
        { time: "11:35 - 11:50", event: "Tanya Jawab dengan Audiens" },
        { time: "11:50 - 12:00", event: "Awarding" },
        { time: "12:00 - 13:00", event: "ISHOMA" },
        { time: "13:00 - 13:05", event: "Standby" },
        { time: "13:05 - 13:15", event: "Sapa Audiens Oleh MC Intern" },
        { time: "13:15 - 13:30", event: "Pembuatan Video bersama Audiens" },
        { time: "13:30 - 13:35", event: "Pergantian MC asli dengan MC Intern" },
        { time: "13:35 - 13:40", event: "Sapa Audiens" },
        { time: "13:40 - 14:10", event: "Penampilan Guest Star" },
        { time: "14:10 - 14:30", event: "Tanya Jawab dengan Audiens" },
        { time: "14:30 - 14:45", event: "Live Music" },
        { time: "14:45 - 14:55", event: "Prosesi Penutupan" },
        { time: "14:55 - 15:10", event: "Foto Bersama Audiens" },
        {
          time: "15:10 - 15:15",
          event: "Pemberitahuan Expo Time dan Penutupan",
        },
        { time: "15:15 - 16:45", event: "EXPO TIMES" },
        { time: "16:45 - 17:00", event: "Clear Area" },
      ],
    },
    {
      date: "28 Januari 2025",
      location: "Jl. apalah itu namanya",
      schedule: [
        { time: "07:30 - 07:35", event: "Pembukaan oleh MC" },
        { time: "07:35 - 07:45", event: "Tari Persembahan" },
        { time: "07:45 - 07:50", event: "Kata Sambutan Ketua Panitia" },
        { time: "07:50 - 08:00", event: "Kata Sambutan dari Pemerintah" },
        { time: "08:00 - 08:10", event: "Prosesi Pembukaan oleh Pemerintah" },
        {
          time: "08:10 - 08:20",
          event: "Sapa Pengunjung oleh MC & Info Booth",
        },
        { time: "08:20 - 08:35", event: "Story Behind BCE (Video & Narasi)" },
        {
          time: "08:35 - 09:15",
          event: "Talk Show: 'Tips Memilih Kampus Impian di Indonesia'",
        },
        {
          time: "09:15 - 09:30",
          event: "Mini Quiz: Fakta Unik Kampus di Indonesia",
        },
        { time: "09:30 - 10:00", event: "Live Music & Hiburan" },
        {
          time: "10:00 - 10:45",
          event: "Talk Show: 'Cerita Sukses Alumni Beasiswa Top'",
        },
        {
          time: "10:45 - 11:00",
          event: "Trivia Fun: Tebak Kampus dari Logo atau Maskot",
        },
        {
          time: "11:00 - 11:30",
          event: "Mini Workshop: 'Persiapan Tes Beasiswa Luar Negeri'",
        },
        { time: "11:30 - 12:00", event: "Fun Quiz Berhadiah Voucher" },
        {
          time: "12:00 - 14:00",
          event: "Istirahat & Explore Booth (Semua Kampus)",
        },
        {
          time: "14:00 - 14:30",
          event: "Workshop Singkat: 'Tren Perkuliahan di Era Digital'",
        },
        {
          time: "14:30 - 15:00",
          event: "Talk Show: 'Eksplorasi Beasiswa Kampus Top di Indonesia'",
        },
        {
          time: "15:00 - 15:30",
          event: "Virtual Campus Tour: Kampus Top di Indonesia",
        },
        {
          time: "15:30 - 16:00",
          event: "Sharing Session: 'Tips Memanfaatkan Expo untuk Masa Depan'",
        },
        { time: "16:00 - 16:30", event: "Live Music: Band Lokal Mahasiswa" },
        { time: "16:30 - 16:50", event: "Closing Speech & Apresiasi Panitia" },
        { time: "16:50 - 17:00", event: "Prosesi Penutupan" },
        { time: "17:00 - 17:30", event: "Clear Area & Evaluasi Panitia" },
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
