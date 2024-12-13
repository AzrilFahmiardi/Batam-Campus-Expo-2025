import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_URL;

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

// FETCH UNIVERSITY by ID
export const getUniversitybyId = async (id) => {
  try {
    const result = await axios.get(`${SERVER_URL}/universitas/${id}`);
    return result.data;
  } catch (err) {
    console.error("Error fetching university: ", err);
    throw err;
  }
};

// FECTH FAKULTAS by UNIVERSITY ID
export const getFakultas = async (id) => {
  try {
    const result = await axios.get(`${SERVER_URL}/universitas/${id}/fakultas`);
    return result.data;
  } catch (err) {
    console.error("Error fetching university: ", err);
    throw err;
  }
};

// FECTH JURUSAN by FAKULTAS ID
export const getJurusan = async (id_univ, id_fakultas) => {
  try {
    const result = await axios.get(`${SERVER_URL}/universitas/${id_univ}/${id_fakultas}/jurusan`);
    return result.data;
  } catch (err) {
    console.error("Error fetching university: ", err);
    throw err;
  }
};

// FECTH ALL PRODI by UNIVERSITAS ID
export const getAllProdi = async (id_univ) => {
  try {
    const result = await axios.get(`${SERVER_URL}/universitas/${id_univ}/allprodi`);
    return result.data;
  } catch (err) {
    console.error("Error fetching university: ", err);
    throw err;
  }
};





