import React, { useState, useEffect } from 'react';
import { Logout, handleGoogleLogin } from '../utils/authentication';
import googleLogo from "../assets/images/google.png"
import CloudBottomLeft from "../assets/images/LandingPage/CloudBottomLeft.png"
import CloudBottomRight from "../assets/images/LandingPage/CloudBottomRight.png"
import CloudTop from "../assets/images/LoginPage/CloudTop.png"
import CloudBottom from "../assets/images/LoginPage/CloudBottom.png"
import "animate.css";

import axios from 'axios';


const LoginPage = () => {

  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };
  

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''  
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData);
        alert(response.data.message);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
          email: formData.email,
          password: formData.password,
        });
        alert('Login successful!');
        
        // Simpan token di localStorage
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));


        // Redirect atau update status login
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Tambahkan default header
        window.location.href = '/'; // Redirect ke home atau lakukan update state
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'An error occurred');
    }
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Tambahkan header saat token ditemukan
        window.history.replaceState({}, document.title, '/'); // Hapus token dari URL
    } else {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }
}, []);
  

  return (
    <div className="relative min-h-screen bg-login flex justify-center items-center font-pixelify overflow-hidden z-10">
      <img src={CloudBottomLeft} alt="" className='absolute left-0 bottom-0 animate__animated animate__fadeInLeft animate__slower'/>
      <img src={CloudBottomRight} alt="" className='absolute right-0 bottom-0 animate__animated animate__fadeInRight animate__slower'/>
      <div className="relative bg-[#ffffffcc] backdrop-blur-3xl border-2 border-white p-8 w-[80vw] min-w-[300px] sm:w-[450px] rounded-[1.5rem] sm:rounded-[2rem] shadow-lg">
      <img src={CloudTop} alt="Cloud Top" className='absolute -right-36 top-0 -z-10 animate__animated animate__fadeInRight animate__slower'/>
      <img src={CloudBottom} alt="Cloud Bottom" className='absolute bottom-1 -left-10 w-[40%] sm:w-2/3 sm:-bottom-10 sm:-left-28 animate__animated animate__fadeInLeft animate__slower'/>
      <h2 className="text-[1.6rem] sm:text-[1.7rem]  md:text-[2rem] bg-orange-red-gradient bg-clip-text text-transparent font-semibold text-center mb-6">
        {isRegistering ? 'Register' : 'Login'}
      </h2>        
      <form onSubmit={handleSubmit}>
          {!isRegistering && (
            <>
              <div className="mb-5">
                <label htmlFor="email" className="block  text-xs md:text-base md:font-medium text-gray-700 mb-1">email</label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 sm:p-2 border-2 border-gray-300 rounded-xl focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 placeholder:text-xs placeholder:md:text-base"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-12">
                <label htmlFor="password" className="block text-xs md:text-base font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 sm:p-2 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 placeholder:text-xs placeholder:md:text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-1 sm:py-2 bg-[#2980B9] text-xs sm:text-base text-white rounded-[0.6rem] sm:rounded-xl border-2 border-transparent hover:bg-[#fff] hover:text-[#2980B9] hover:border-[#2980B9] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                Login
              </button>
            </>
          )}

          {isRegistering && (
            <>
              <div className="mb-5">
                <label htmlFor="username" className="block text-xs md:text-base md:font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 sm:p-2 border-2 border-gray-300 rounded-xl focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 placeholder:text-xs placeholder:md:text-base"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-xs md:text-base md:font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 sm:p-2 border-2 border-gray-300 rounded-xl focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 placeholder:text-xs placeholder:md:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-12">
                <label htmlFor="password" className="block text-xs md:text-base md:font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-2 py-1 sm:p-2 border-2 border-gray-300 rounded-xl focus:outline-none text-sm focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 placeholder:text-xs placeholder:md:text-base"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-1 sm:py-2 bg-[#2980B9] text-xs sm:text-base text-white rounded-[0.6rem] sm:rounded-xl border-2 border-transparent hover:bg-[#fff] hover:text-[#2980B9] hover:border-[#2980B9] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
            </>
          )}
        </form>
        <div className="mt-4 mb-7 text-center">
          <p className="text-[0.6rem] sm:text-xs text-gray-600 mb-5">
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
          className={`flex items-center text-[0.6rem] sm:text-xs mx-auto my-3  rounded-[10px] px-[20px] py-2 font-pixelify font-bold bg-orange-500 text-white hover:bg-[#206A96]`}
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
