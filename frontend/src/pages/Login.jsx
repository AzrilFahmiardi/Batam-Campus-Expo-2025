import React, { useState } from 'react';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="min-h-screen bg-blue-gradient flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">{isRegistering ? 'Register' : 'Login'}</h2>
        <form>
          {!isRegistering && (
            <>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
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
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
