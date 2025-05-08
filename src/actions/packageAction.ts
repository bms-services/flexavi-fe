import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPackage = createAsyncThunk(
  "package/index",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/package`, {
        params,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDetailPackage = createAsyncThunk(
  "package/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/package/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePackage = createAsyncThunk(
  "package/update",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/package`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
