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

export const putVerifyEmail = createAsyncThunk(
  "profile/verifyEmail",
  async (otp: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/profile/email`, { email_verification_code:otp });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postResendEmailVerification = createAsyncThunk(
  "profile/resendEmailVerification",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/profile/email`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
