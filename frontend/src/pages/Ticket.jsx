import "animate.css";
import React, { useEffect, useState } from "react";
import CloudBottomLeft from "../assets/images/LandingPage/CloudBottomLeft.png";
import CloudBottomRight from "../assets/images/LandingPage/CloudBottomRight.png";
import CloudBottom from "../assets/images/LoginPage/CloudBottom.png";
import CloudTop from "../assets/images/LoginPage/CloudTop.png";
import { useAuth } from "../utils/AuthProvider";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_API_URL;

const TicketPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
    const { user, isLoggedIn, hasVoted } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      if (!value.trim()) {
        alert(`${key} tidak boleh kosong!`);
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz14tp9UHcsexsf3RyLy08s-XLb5-eP0SicFKNNbGtyLUk66AnCKBGgw0HoSjR0lW9VCg/exec",
        {
          method: "POST",
          body: formData,
        },
      );


      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      if (!user?.email) {
        throw new Error("Email pengguna tidak ditemukan");
      }

      const updateTicketResponse = await axios.patch(
        `${SERVER_URL}/api/users/ticket`,
        {
          email: user.email,
          has_ticket: true
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true  // Tambahkan ini untuk mengirim cookies
        }
      );

      if (updateTicketResponse.status === 200) {
        setshowAlert(true);
      } else {
        throw new Error("Gagal mengupdate status tiket");
      }

    } catch (error) {
      console.error("Error detail:", error);
      
      // Menampilkan pesan error yang lebih spesifik
      if (error.response) {
        // Error response dari server
        alert(`Error: ${error.response.data.message || 'Terjadi kesalahan pada server'}`);
      } else if (error.request) {
        // Error karena tidak ada response
        alert("Tidak dapat terhubung ke server. Mohon periksa koneksi internet Anda.");
      } else {
        // Error lainnya
        alert(error.message || "Terjadi kesalahan saat memproses tiket. Silakan coba lagi.");
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-login font-pixelify">
      <img
        src={CloudBottomLeft}
        alt=""
        className="animate__animated animate__fadeInLeft animate__slower absolute bottom-0 left-0"
        draggable="false"
      />
      <img
        src={CloudBottomRight}
        alt=""
        className="animate__animated animate__fadeInRight animate__slower absolute bottom-0 right-0"
        draggable="false"
      />
      <div className="relative w-[80vw] min-w-[300px] rounded-[1.5rem] border-2 border-white bg-[#ffffffcc] p-8 shadow-lg backdrop-blur-3xl sm:w-[450px] sm:rounded-[2rem]">
        <img
          src={CloudTop}
          alt="Cloud Top"
          className="animate__animated animate__fadeInRight animate__slower absolute -right-36 top-0 -z-10"
          draggable="false"
        />
        <img
          src={CloudBottom}
          alt="Cloud Bottom"
          className="animate__animated animate__fadeInLeft animate__slower absolute -left-10 bottom-1 w-[40%] sm:-bottom-10 sm:-left-28 sm:w-2/3"
          draggable="false"
        />
        <h2 className="bg-orange-red-gradient bg-clip-text text-center text-[1.6rem] font-semibold text-transparent sm:text-[1.7rem] md:text-[2rem]">
          Daftar Tiket
        </h2>
        {showAlert && (
          <div className="mb-2 flex items-center justify-between rounded-xl bg-[#eb5e0b] px-5 py-3">
            <p className="font-montserrat text-sm font-semibold text-white">
              Pesan Kamu Berhasi Dikirim!
            </p>
            <button
              className="hover:bg grid place-items-center rounded-lg p-1 text-2xl font-bold text-white hover:bg-[rgba(158,2,2,0.7)]"
              onClick={() => setshowAlert(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.8em"
                height="0.8em"
                viewBox="0 0 24 24"
              >
                <g fill="none" fill-rule="evenodd">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"
                  />
                </g>
              </svg>
            </button>
          </div>
        )}
        <div className="font-montserrat text-xs text-blue-500">
          <p className="font-bold">Catatan Penting:</p>
          <ul className="list-disc pl-5">
            <li>
              Pastikan kamu follow instagram <b>@batamcampusexpo</b>
            </li>
            <li>
              Jika kamu tidak menerima email, silahkan hubungi admin melalui
              instagram <b>@batamcampusexpo</b>
            </li>
          </ul>
        </div>
        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs text-gray-700 md:text-base md:font-medium"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs text-gray-700 md:text-base md:font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                  placeholder="Your email"
                  value={user?.email || ''}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-1 block text-xs font-medium text-gray-700 md:text-base"
                >
                  Username Instagram
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                  placeholder="Enter your instagram"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-[0.6rem] border-2 border-transparent bg-[#2980B9] py-1 text-xs text-white transition duration-200 hover:border-[#2980B9] hover:bg-[#fff] hover:text-[#2980B9] focus:outline-none focus:ring-2 focus:ring-blue-500 sm:rounded-xl sm:py-2 sm:text-base"
              >
                Dapatkan Tiket
              </button>
            </>
          </form>
        )}
        {isLoading && (
          <div className="mt-2 grid size-full place-items-center space-y-3">
            <div className="custom-loader"></div>
            <p className="font-montserrat text-sm font-bold text-red-800">
              Loading...
            </p>
          </div>
        )}
        <div className="mb-7 mt-4 text-center">{/* {!isLoading && ()} */}</div>
      </div>
    </div>
  );
};

export default TicketPage;
