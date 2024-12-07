import React, { useState, useEffect } from 'react';
import { Logout, handleGoogleLogin } from '../utils/authentication';
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
    <div className="min-h-screen bg-blue-gradient flex justify-center items-center font-pixelify">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {!isRegistering && (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">email</label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </>
          )}

          {isRegistering && (
            <>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Register
              </button>
            </>
          )}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
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
          className={`flex items-center mx-auto my-3  rounded-[10px] px-[20px] py-2 font-pixelify font-bold bg-orange-500 text-white hover:bg-[#206A96]`}
            >
            Sign Up with Google
            </button>)}
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
