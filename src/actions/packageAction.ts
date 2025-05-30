import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPackageIndex = createAsyncThunk(
  "package/index",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/package`, { params });

      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const getPackageShow = createAsyncThunk(
  "package/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/package/${id}`);

      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const putPackageUpdate = createAsyncThunk(
  "package/update",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/package`, formData);

      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);
