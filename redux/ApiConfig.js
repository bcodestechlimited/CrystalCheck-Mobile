import axios from "axios";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASEURL,
});

// Set default Authorization header to null
axiosInstance.defaults.headers.common.Authorization = null;

// Helper function to get Axios config with Authorization token
export function getAxiosConfig(token) {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

// // Helper function to extract the token from the Redux state
export function getToken(thunkAPI) {
  return thunkAPI.getState()?.AuthSlice?.user_data?.data?.token ?? "";
}

// Function to fetch vendor profile

// export { fetchResponsData };
