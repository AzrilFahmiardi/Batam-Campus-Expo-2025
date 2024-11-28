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
      const { isAuthenticated, user, hasVoted } = await checkLoginStatus();
      setIsLoggedIn(isAuthenticated);
      setUser(user);
      setHasVoted(hasVoted);
    } catch (error) {
      console.error("Failed to fetch login status:", error);
      setIsLoggedIn(false);
      setUser(null);
      setHasVoted(false);
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