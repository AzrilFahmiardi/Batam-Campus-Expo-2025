import axios from "axios";
const SERVER_URL = 'http://localhost:5000';
// const SERVER_URL = 'https://batamcampusexpo-server.onrender.com';

// CEK STATUS LOGIN
export const checkLoginStatus = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/check-auth`, {
      withCredentials: true,
    });
    const isAuthenticated = response.data.isAuthenticated;
    const user = response.data.user;

    let hasVoted = false;
    if (isAuthenticated) {
      hasVoted = await checkVoteStatus();
    }

    return { isAuthenticated, user, hasVoted };
  } catch (error) {
    console.error('Error checking login status:', error);
    return { isAuthenticated: false, user: null, hasVoted: false };
  }
};

// CEK STATUS VOTING
export const checkVoteStatus = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/check-vote-status`, {
      withCredentials: true,
    });
    return response.data.hasVoted;
  } catch (error) {
    console.error('Error checking vote status:', error);
    return false;
  }
};


// LOGIN
export const handleGoogleLogin = () => {
    window.location.href = `${SERVER_URL}/auth/google`;
  };

// LOGOUT
export const Logout = () => {
    window.location.href = 'http://localhost:5000/logout';
  };
