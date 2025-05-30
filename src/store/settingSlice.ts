import {
  getSettingCompanyShow,
  postSettingCompanyUpdate,

  getSettingTeamIndex,
  getSettingTeamShow,
  postSettingTeamStore,
  putSettingTeamUpdate,
  deleteSettingTeamDestroy,

  postSettingIntentStore,

  postSettingTrialStore,

  putSettingPackageUpdate,

  putSettingPaymentUpdate,
} from "@/actions/settingAction";
import { Company, CompanyTeam } from "@/types/company";
import { createSlice, AsyncThunk } from "@reduxjs/toolkit";

export interface AsyncState<T = unknown> {
  success?: boolean;
  code?: number;
  message?: string;
  result?: T;
  errors?: string[];
  loading: boolean;
}

export function createAsyncState<T = unknown>(): AsyncState<T> {
  return {
    success: false,
    code: null,
    message: null,
    result: null,
    errors: [],
    loading: false,
  };
}

// --- Initial State ---
const initialState = {
  company: {
    show: createAsyncState<Company>(),
    update: createAsyncState(),
  },
  team: {
    index: createAsyncState<CompanyTeam>(),
    store: createAsyncState<CompanyTeam>(),
    show: createAsyncState<CompanyTeam>(),
    update: createAsyncState<CompanyTeam>(),
    destroy: createAsyncState<CompanyTeam>(),
  },
  intent: {
    store: createAsyncState(),
  },
  trial: {
    store: createAsyncState(),
  },
  package: {
    update: createAsyncState(),
  },
  payment: {
    update: createAsyncState(),
  },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const attachAsyncHandler = <
      TPath extends keyof typeof initialState,
      TKey extends keyof typeof initialState[TPath]
    >(
      thunk: AsyncThunk<any, any, any>,
      path: TPath,
      key: TKey
    ) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[path][key] = {
            ...createAsyncState(),
            loading: true,
          };
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state[path][key] = {
            ...state[path][key],
            ...action.payload,
            loading: false,
          };
        })
        .addCase(thunk.rejected, (state, action) => {
          state[path][key] = {
            ...createAsyncState(),
            loading: false,
            errors: action.payload?.errors || [action.error.message],
          };
        });
    };

    // Company
    attachAsyncHandler(getSettingCompanyShow, "company", "show");
    attachAsyncHandler(postSettingCompanyUpdate, "company", "update");

    // Team
    attachAsyncHandler(getSettingTeamIndex, "team", "index");
    attachAsyncHandler(postSettingTeamStore, "team", "store");
    attachAsyncHandler(getSettingTeamShow, "team", "show");
    attachAsyncHandler(putSettingTeamUpdate, "team", "update");
    attachAsyncHandler(deleteSettingTeamDestroy, "team", "destroy");

    // Intent
    attachAsyncHandler(postSettingIntentStore, "intent", "store");

    // Trial
    attachAsyncHandler(postSettingTrialStore, "trial", "store");

    // Package
    attachAsyncHandler(putSettingPackageUpdate, "package", "update");

    // Payment
    attachAsyncHandler(putSettingPaymentUpdate, "payment", "update");
  },
});

export default settingSlice.reducer;
