import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkLoginStatus } from '../utils/authentication';

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
      // Coba periksa status login dari server
      const { isAuthenticated, user, hasVoted } = await checkLoginStatus();
      
      if (isAuthenticated) {
        // Jika terautentikasi dari server, gunakan data dari server
        setIsLoggedIn(true);
        setUser(user);
        setHasVoted(hasVoted);
      } else {
        // Jika tidak terautentikasi dari server, cek localStorage
        const localUser = JSON.parse(localStorage.getItem('user'));
        const localToken = localStorage.getItem('authToken');
        console.log("Local storage check:", { 
          localUser, 
          localToken 
        });

        if (localUser && localToken) {
          // Jika ada user dan token di localStorage, gunakan data tersebut
          setIsLoggedIn(true);
          setUser(localUser);
          setHasVoted(localUser.has_voted);
        } else {
          // Jika tidak ada data di localStorage, pastikan user tidak login
          setIsLoggedIn(false);
          setUser(null);
          setHasVoted(false);
        }
      }
    } catch (error) {
      console.error("Failed to fetch login status:", error);
      
      // Cek localStorage sebagai fallback
      const localUser = JSON.parse(localStorage.getItem('user'));
      const localToken = localStorage.getItem('token');
      
      
      if (localUser && localToken) {
        setIsLoggedIn(true);
        setUser(localUser);
        setHasVoted(localUser.has_voted);
        
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setHasVoted(false);
      }
    }
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