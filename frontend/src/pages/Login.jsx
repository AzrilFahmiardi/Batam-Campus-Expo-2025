import React, { useState, useEffect } from "react";
import { Logout, handleGoogleLogin } from "../utils/authentication";
import googleLogo from "../assets/images/google.png";
import CloudBottomLeft from "../assets/images/LandingPage/CloudBottomLeft.png";
import CloudBottomRight from "../assets/images/LandingPage/CloudBottomRight.png";
import CloudTop from "../assets/images/LoginPage/CloudTop.png";
import CloudBottom from "../assets/images/LoginPage/CloudBottom.png";
import "animate.css";

import axios from "axios";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const endpoint = isRegistering ? "/api/register" : "/api/login";
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        formData,
        { withCredentials: true },
      );

      if (!isRegistering) {
        alert("Login successful!");
        window.location.href = "/";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      alert(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/refresh-token`,
        {},
        { withCredentials: true },
      );
      console.log("Access token refreshed");
    } catch (error) {
      console.error("Error refreshing access token:", error);
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshAccessToken();
      },
      10 * 60 * 1000,
    ); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, []);

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
        <h2 className="mb-6 bg-orange-red-gradient bg-clip-text text-center text-[1.6rem] font-semibold text-transparent sm:text-[1.7rem] md:text-[2rem]">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {!isLoading && (
          <form onSubmit={handleSubmit}>
            {!isRegistering && (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-xs text-gray-700 md:text-base md:font-medium"
                  >
                    email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="mb-12">
                  <label
                    htmlFor="password"
                    className="mb-1 block text-xs font-medium text-gray-700 md:text-base"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[0.6rem] border-2 border-transparent bg-[#2980B9] py-1 text-xs text-white hover:border-[#2980B9] hover:bg-[#fff] hover:text-[#2980B9] focus:outline-none focus:ring-2 focus:ring-blue-500 sm:rounded-xl sm:py-2 sm:text-base"
                >
                  Login
                </button>
              </>
            )}

            {isRegistering && (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="mb-1 block text-xs text-gray-700 md:text-base md:font-medium"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-5">
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
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-12">
                  <label
                    htmlFor="password"
                    className="mb-1 block text-xs text-gray-700 md:text-base md:font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-2 border-gray-300 px-2 py-1 text-sm placeholder:text-xs placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 placeholder:md:text-base"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[0.6rem] border-2 border-transparent bg-[#2980B9] py-1 text-xs text-white hover:border-[#2980B9] hover:bg-[#fff] hover:text-[#2980B9] focus:outline-none focus:ring-2 focus:ring-blue-500 sm:rounded-xl sm:py-2 sm:text-base"
                >
                  Register
                </button>
              </>
            )}
          </form>
        )}
        {isLoading && (
          <div className="grid size-full place-items-center space-y-3">
            <div className="custom-loader"></div>
            <p className="font-montserrat font-bold text-red-800">Loading...</p>
          </div>
        )}
        <div className="mb-7 mt-4 text-center">
          {!isLoading && (
            <p className="mb-5 text-[0.6rem] text-gray-600 sm:text-xs">
              {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                onClick={handleToggle}
                className="ml-2 text-blue-500 hover:underline"
              >
                {isRegistering ? "Login here" : "Register here"}
              </button>
            </p>
          )}
          {/* {isRegistering? 
          <div></div>
          :(<button
          onClick={() => {
            handleGoogleLogin();
          }}
          className={`flex items-center text-[0.6rem] sm:text-xs mx-auto my-3  rounded-[10px] px-[20px] py-2 font-pixelify font-bold bg-orange-500 text-white hover:bg-[#206A96]`}
            >
              <img src={googleLogo} alt="google logo" className='mr-2' />
            Sign Up with Google
            </button>)} */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
