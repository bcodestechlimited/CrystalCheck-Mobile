import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";
import Toast from "react-native-toast-message";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  todo_data: [],
  todo_isError: false,
  todo_isSuccess: false,
  todo_isLoading: false,
  todo_message: null,
};

export const TodoSlice = createSlice({
  name: "TodoSlice",
  initialState,
  reducers: {
    reset_CandidateSlice: (state) => {
      //   state.Candidate_data = null;
      //   state.Candidate_isError = false;
      //   state.Candidate_isSuccess = false;
      //   state.Candidate_isLoading = false;
      //   state.Candidate_message = null;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { reset_CandidateSlice } = TodoSlice.actions;

export default TodoSlice.reducer;
