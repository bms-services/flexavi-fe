import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubscriptionIndex = createAsyncThunk(
  "subscription/index",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/subscription`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSubscriptionShow = createAsyncThunk(
  "subscription/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/subscription/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
