import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamsAction } from "@/@types/global-type";
import { Lead } from "@/types";
import { mainApi } from "@/utils/axios";
import { isPlainObject } from "lodash";

export const getLeadIndex = createAsyncThunk(
  "lead/index",
  async (params: ParamsAction, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/lead`, { params });
      return { result: { data: data.result.data, meta: data.result.meta } };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const getLeadShow = createAsyncThunk(
  "lead/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/lead/${id}`);
      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const postLeadStore = createAsyncThunk(
  "lead/store",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/lead`, formData);
      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const putLeadUpdate = createAsyncThunk(
  "lead/update",
  async (update: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/lead/${update.id}?_method=PUT`, update.formData);
      return { result: data.result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const deleteLeadDestroy = createAsyncThunk(
  "lead/destroy",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const { data } = await mainApi.delete("/lead", { data: { ids } });
      return { result: data.result, deletedIds: ids };
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);
