import axios from "axios";
const SERVER_URL = import.meta.env.VITE_API_URL;

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
export const Logout = async () => {
  try {
    // Panggil endpoint logout backend
    await axios.post(`${SERVER_URL}/api/logout`, {}, {
      withCredentials: true,
    });

    // Alihkan pengguna ke halaman login
    window.location.href = `${SERVER_URL}/logout`;
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Failed to log out. Please try again.');
  }
};