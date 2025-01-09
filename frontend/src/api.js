import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}login`, userData);
};

export const forgotPassword = async (email) => {
  return axios.post(`${API_URL}forgot-password`, { email });
};

export const resetPassword = async (token, newPassword) => {
  return axios.post(
    `${API_URL}reset-password`,
    { newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
