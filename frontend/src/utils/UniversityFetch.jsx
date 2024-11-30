import axios from "axios";

// const SERVER_URL = 'http://localhost:5000';
const SERVER_URL = "https://batamcampusexpo-server.onrender.com";

// FETCH ALL UNIVERSITY
export const getAllUniversity = async () => {
  try {
    const result = await axios.get(`${SERVER_URL}/universitas`);
    return result.data;
  } catch (err) {
    console.error("Error fetching university: ", err);
    throw err;
  }
};
