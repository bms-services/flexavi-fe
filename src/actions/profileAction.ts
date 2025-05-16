import { Company } from "@/types/company";
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

export const storeProfileTrial = createAsyncThunk(
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

export const getProfileCompany = createAsyncThunk(
  "profile/showCompany",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/profile/company`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileCompany = createAsyncThunk(
  "profile/updateCompany",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/profile/company`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getProfileTeam = createAsyncThunk(
  "profile/showTeam",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/profile/team`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfileTeam = createAsyncThunk(
  "profile/updateTeam",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/profile/team`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getDetailProfileTeam = createAsyncThunk(
  "profile/showDetailTeam",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/profile/team/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)


export const destroyProfileTeam = createAsyncThunk(
  "profile/destroyTeam",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const { data } = await mainApi.delete("/profile/team", {
        data: { ids },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


