import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  hasVoted: false,
  fetchLoginStatus: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const fetchLoginStatus = async () => {
    try {
      // Coba periksa status autentikasi menggunakan accessToken
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-auth`, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.isAuthenticated) {
        // Jika terautentikasi, setel data pengguna
        setIsLoggedIn(true);
        setUser(response.data.user);
        setHasVoted(response.data.user.hasVoted || false);
        return;
      }
    } catch (error) {
      console.warn("Access token expired or invalid, attempting to refresh:", error);

      // Jika accessToken gagal, coba refresh token
      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.status === 200) {
          console.log("Access token refreshed successfully");

          // Setelah refresh token berhasil, panggil ulang check-auth
          const retryResponse = await axios.get(`${import.meta.env.VITE_API_URL}/check-auth`, {
            withCredentials: true,
          });

          if (retryResponse.status === 200 && retryResponse.data.isAuthenticated) {
            setIsLoggedIn(true);
            setUser(retryResponse.data.user);
            setHasVoted(retryResponse.data.user.hasVoted || false);
            return;
          }
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }

    // Jika semua langkah gagal, setel status sebagai tidak login
    setIsLoggedIn(false);
    setUser(null);
    setHasVoted(false);
  };

  useEffect(() => {
    fetchLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      hasVoted, 
      fetchLoginStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
