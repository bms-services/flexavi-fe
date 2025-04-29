import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/profile`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
