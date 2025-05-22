import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfileShow = createAsyncThunk(
  "profile/show",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/profile`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putProfileUpdate = createAsyncThunk(
  "profile/update",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/profile`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
