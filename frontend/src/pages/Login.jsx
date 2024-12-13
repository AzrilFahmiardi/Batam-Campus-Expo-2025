import React, { useState } from 'react';
import { Logout, handleGoogleLogin } from '../utils/authentication';
import googleLogo from "../assets/images/google.png"
import CloudBottomLeft from "../assets/images/LandingPage/CloudBottomLeft.png"
import CloudBottomRight from "../assets/images/LandingPage/CloudBottomRight.png"
import CloudTop from "../assets/images/LoginPage/CloudTop.png"
import CloudBottom from "../assets/images/LoginPage/CloudBottom.png"
import "animate.css";


const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="relative min-h-screen bg-login flex justify-center items-center font-pixelify overflow-hidden z-10">
      <img src={CloudBottomLeft} alt="" className='absolute left-0 bottom-0 animate__animated animate__fadeInLeft animate__slower'/>
      <img src={CloudBottomRight} alt="" className='absolute right-0 bottom-0 animate__animated animate__fadeInRight animate__slower'/>
      <div className="relative bg-[#ffffffcc] backdrop-blur-3xl border-2 border-white p-8 w-[450px] rounded-[2rem] shadow-lg">
      <img src={CloudTop} alt="Cloud Top" className='absolute -right-36 top-0 -z-10 animate__animated animate__fadeInRight animate__slower'/>
      <img src={CloudBottom} alt="Cloud Bottom" className='absolute -bottom-10 -left-28 animate__animated animate__fadeInLeft animate__slower'/>
      <h2 className="text-[2rem] bg-orange-red-gradient bg-clip-text text-transparent font-semibold text-center mb-6">
        {isRegistering ? 'Register' : 'Login'}
      </h2>        
      <form>
          {!isRegistering && (
            <>
              <div className="mb-5">
                <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full mt-1 p-2 border-2 border-gray-300 rounded-xl focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
                  placeholder="Your username"
                />
              </div>
              <div className="mb-12">
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#2980B9] text-white rounded-xl border-2 border-transparent hover:bg-[#fff] hover:text-[#2980B9] hover:border-[#2980B9] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                Login
              </button>
            </>
          )}

          {isRegistering && (
            <>
              <div className="mb-5">
                <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full mt-1 p-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-12">
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#2980B9] text-white rounded-xl border-2 border-transparent hover:bg-[#fff] hover:text-[#2980B9] hover:border-[#2980B9] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
            </>
          )}
        </form>
        <div className="mt-4 mb-7 text-center">
          <p className="text-xs text-gray-600 mb-5">
            {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
            <button
              onClick={handleToggle}
              className="ml-2 text-blue-500 hover:underline"
            >
              {isRegistering ? 'Login here' : 'Register here'}
            </button>
          </p>
          {isRegistering? 
          <div></div>
          :(<button
          onClick={() => {
            handleGoogleLogin();
          }}
          className={`flex items-center text-xs mx-auto my-3  rounded-[10px] px-[20px] py-2 font-pixelify font-bold bg-orange-500 text-white hover:bg-[#206A96]`}
            >
              <img src={googleLogo} alt="google logo" className='mr-2' />
            Sign Up with Google
            </button>)}
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
