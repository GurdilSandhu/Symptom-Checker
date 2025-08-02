import axios from "axios";

const API_URL = "https://healthcare-1-2b0j.onrender.com/api/auth/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      JSON.stringify(userData),  // Ensure JSON format
      {
        headers: {
          "Content-Type": "application/json", // Required header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.response?.data || error.message);
    throw error;
  }
};

// Login API Call
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Server error" };
  }
};

