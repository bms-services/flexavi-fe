import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubscriptionIndex = createAsyncThunk(
  "subscription/index",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/subscription`);
      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const getSubscriptionShow = createAsyncThunk(
  "subscription/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/subscription/${id}`);
      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);
