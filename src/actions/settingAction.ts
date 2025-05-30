import { Company, CompanyTeam } from "@/types/company";
import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ------ Company ------ \\
export const postSettingCompanyStore = createAsyncThunk(
  "setting/company/store",
  async (formData: Company, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/setting/company`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSettingCompanyShow = createAsyncThunk(
  "setting/company/show",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/setting/company`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSettingCompanyUpdate = createAsyncThunk(
  "setting/company/update",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/setting/company`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



// ------ Team ------ \\
export const getSettingTeamIndex = createAsyncThunk(
  "setting/team/index",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/setting/team`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getSettingTeamShow = createAsyncThunk(
  "setting/team/show",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.get(`/setting/team/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const postSettingTeamStore = createAsyncThunk(
  "setting/team/store",
  async (formData: CompanyTeam, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/setting/team`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putSettingTeamUpdate = createAsyncThunk(
  "setting/team/update",
  async (formData: CompanyTeam, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/setting/team`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteSettingTeamDestroy = createAsyncThunk(
  "setting/team/destroy",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const { data } = await mainApi.delete("/setting/team", {
        data: { ids },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



// ------ Payment Method ------ \\
export const postSettingIntentStore = createAsyncThunk(
  "setting/intent/store",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/setting/intent`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSettingTrialStore = createAsyncThunk(
  "setting/trial/store",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post(`/setting/trial`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putSettingPackageUpdate = createAsyncThunk(
  "setting/package/update",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/setting/package`, {
        stripe_price_id: id,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putSettingPaymentUpdate = createAsyncThunk(
  "setting/payment/update",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.put(`/setting/payment`, {
        setup_intent_id: id,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
