import { ParamsAction } from "@/@types/global-type";
import { toastShow } from "@/components/ui/toast/toast-helper";
import { Lead } from "@/types";
import { mainApi } from "@/utils/axios";
import successHandler from "@/utils/successHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLead = createAsyncThunk(
  "lead/index",
  async (params: ParamsAction, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/lead`, {
        params,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDetailLead = createAsyncThunk(
  "lead/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/lead/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const storeLead = createAsyncThunk(
  "lead/store",
  async (formData: Lead, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/lead`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateLead = createAsyncThunk(
  "lead/update",
  async (update: { id: string; formData: Lead }, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/lead/${update.id}`, update.formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const destroyLead = createAsyncThunk(
  "lead/destroy",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const { data } = await mainApi.delete("/lead", {
        data: { ids },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
