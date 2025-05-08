import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
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

export const updateProfile = createAsyncThunk(
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

export const createProfileIntent = createAsyncThunk(
  "profile/createIntent",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/profile/intent`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProfileTrial = createAsyncThunk(
  "profile/createTrial",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/profile/trial`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfilePackage = createAsyncThunk(
  "profile/updatePackage",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/profile/package`, {
        stripe_price_id: id,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfilePayment = createAsyncThunk(
  "profile/updatePayment",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/profile/payment`, {
        setup_intent_id: id,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
