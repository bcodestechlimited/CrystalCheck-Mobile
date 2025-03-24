import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";
import Toast from "react-native-toast-message";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  // user_data: createDefaultState(),

  user_data: null,
  user_data_isError: false,
  user_data_isSuccess: false,
  user_data_isLoading: false,
  user_data_message: null,

  userprofile: null,
  userprofile_isError: false,
  userprofile_isSuccess: false,
  userprofile_isLoading: false,
  userprofile_message: null,
};

const fetchResponsData = async (url, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);

    const response = await axiosInstance.get(url, getAxiosConfig(token));
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Failed to fetch data: ${error.response.status} - ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

export const Get_User_profile = createAsyncThunk(
  "auth/Get_User_profile",

  async (query, thunkAPI) => {
    let url = `${API_BASEURL}v1/auth`;

    try {
      const response = await fetchResponsData(url, thunkAPI);

      return response?.data;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate profile"
      );
    }
  }
);

export const Login_Fun = createAsyncThunk(
  "auth/Login_Fun",
  async (data, thunkAPI) => {
    try {
      let url = `${API_BASEURL}v1/auth/signin`;

      console.log({
        url,
        data,
      });
      const response = await axios.post(url, data);
      console.log({
        tunde: response.data,
      });
      return response.data;
    } catch (error) {
      console.log({
        jjjj: error,
      });
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset_login: (state) => {
      state.user_data = null;
      state.user_data_isError = false;
      state.user_data_isSuccess = false;
      state.user_data_isLoading = false;
      state.user_data_message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login_Fun.pending, (state) => {
        state.user_data_isLoading = true;
      })
      .addCase(Login_Fun.fulfilled, (state, action) => {
        state.user_data_isLoading = false;
        state.user_data_isError = false;
        state.user_data = action.payload;
        state.user_data_message = null;
        state.user_data_isSuccess = true;
      })
      .addCase(Login_Fun.rejected, (state, action) => {
        state.user_data_isLoading = false;
        state.user_data_isError = true;
        state.user_data_message = action.payload;
        state.user_data_isSuccess = false;
        state.user_data = null;
      })
      .addCase(Get_User_profile.pending, (state) => {
        state.userprofile_isLoading = true;
      })
      .addCase(Get_User_profile.fulfilled, (state, action) => {
        state.userprofile_isLoading = false;
        state.user_data_isError = false;
        state.userprofile = action.payload;
        state.userprofile_message = null;
        state.userprofile_isSuccess = true;
      })
      .addCase(Get_User_profile.rejected, (state, action) => {
        state.userprofile_isLoading = false;
        state.user_data_isError = true;
        state.userprofile_message = action.payload;
        state.userprofile_isSuccess = false;
        state.userprofile = null;
      });
  },
});

export const { reset_login } = AuthSlice.actions;

export default AuthSlice.reducer;
