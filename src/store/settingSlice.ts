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

function getErrors(payload: unknown, fallback: string): string[] {
  if (
    payload &&
    typeof payload === 'object' &&
    'errors' in (payload as Record<string, unknown>) &&
    Array.isArray((payload as { errors?: string[] }).errors)
  ) {
    return (payload as { errors: string[] }).errors;
  }
  return [fallback];
}

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Company
    builder
      .addCase(getSettingCompanyShow.pending, (state) => {
        state.company.show = { ...createAsyncState(), loading: true };
      })
      .addCase(getSettingCompanyShow.fulfilled, (state, action) => {
        state.company.show = { ...state.company.show, ...action.payload, loading: false, success: true };
      })
      .addCase(getSettingCompanyShow.rejected, (state, action) => {
        state.company.show = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to fetch company"),
        };
      })
      .addCase(postSettingCompanyUpdate.pending, (state) => {
        state.company.update = { ...createAsyncState(), loading: true };
      })
      .addCase(postSettingCompanyUpdate.fulfilled, (state, action) => {
        state.company.update = { ...state.company.update, ...action.payload, loading: false, success: true };
      })
      .addCase(postSettingCompanyUpdate.rejected, (state, action) => {
        state.company.update = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to update company"),
        };
      });
    // Team
    builder
      .addCase(getSettingTeamIndex.pending, (state) => {
        state.team.index = { ...createAsyncState(), loading: true };
      })
      .addCase(getSettingTeamIndex.fulfilled, (state, action) => {
        state.team.index = { ...state.team.index, ...action.payload, loading: false, success: true };
      })
      .addCase(getSettingTeamIndex.rejected, (state, action) => {
        state.team.index = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to fetch team index"),
        };
      })
      .addCase(postSettingTeamStore.pending, (state) => {
        state.team.store = { ...createAsyncState(), loading: true };
      })
      .addCase(postSettingTeamStore.fulfilled, (state, action) => {
        state.team.store = { ...state.team.store, ...action.payload, loading: false, success: true };
      })
      .addCase(postSettingTeamStore.rejected, (state, action) => {
        state.team.store = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to store team"),
        };
      })
      .addCase(getSettingTeamShow.pending, (state) => {
        state.team.show = { ...createAsyncState(), loading: true };
      })
      .addCase(getSettingTeamShow.fulfilled, (state, action) => {
        state.team.show = { ...state.team.show, ...action.payload, loading: false, success: true };
      })
      .addCase(getSettingTeamShow.rejected, (state, action) => {
        state.team.show = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to fetch team"),
        };
      })
      .addCase(putSettingTeamUpdate.pending, (state) => {
        state.team.update = { ...createAsyncState(), loading: true };
      })
      .addCase(putSettingTeamUpdate.fulfilled, (state, action) => {
        state.team.update = { ...state.team.update, ...action.payload, loading: false, success: true };
      })
      .addCase(putSettingTeamUpdate.rejected, (state, action) => {
        state.team.update = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to update team"),
        };
      })
      .addCase(deleteSettingTeamDestroy.pending, (state) => {
        state.team.destroy = { ...createAsyncState(), loading: true };
      })
      .addCase(deleteSettingTeamDestroy.fulfilled, (state, action) => {
        state.team.destroy = { ...state.team.destroy, ...action.payload, loading: false, success: true };
      })
      .addCase(deleteSettingTeamDestroy.rejected, (state, action) => {
        state.team.destroy = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to destroy team"),
        };
      });
    // Intent
    builder
      .addCase(postSettingIntentStore.pending, (state) => {
        state.intent.store = { ...createAsyncState(), loading: true };
      })
      .addCase(postSettingIntentStore.fulfilled, (state, action) => {
        state.intent.store = { ...state.intent.store, ...action.payload, loading: false, success: true };
      })
      .addCase(postSettingIntentStore.rejected, (state, action) => {
        state.intent.store = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to store intent"),
        };
      });
    // Trial
    builder
      .addCase(postSettingTrialStore.pending, (state) => {
        state.trial.store = { ...createAsyncState(), loading: true };
      })
      .addCase(postSettingTrialStore.fulfilled, (state, action) => {
        state.trial.store = { ...state.trial.store, ...action.payload, loading: false, success: true };
      })
      .addCase(postSettingTrialStore.rejected, (state, action) => {
        state.trial.store = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to store trial"),
        };
      });
    // Package
    builder
      .addCase(putSettingPackageUpdate.pending, (state) => {
        state.package.update = { ...createAsyncState(), loading: true };
      })
      .addCase(putSettingPackageUpdate.fulfilled, (state, action) => {
        state.package.update = { ...state.package.update, ...action.payload, loading: false, success: true };
      })
      .addCase(putSettingPackageUpdate.rejected, (state, action) => {
        state.package.update = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to update package"),
        };
      });
    // Payment
    builder
      .addCase(putSettingPaymentUpdate.pending, (state) => {
        state.payment.update = { ...createAsyncState(), loading: true };
      })
      .addCase(putSettingPaymentUpdate.fulfilled, (state, action) => {
        state.payment.update = { ...state.payment.update, ...action.payload, loading: false, success: true };
      })
      .addCase(putSettingPaymentUpdate.rejected, (state, action) => {
        state.payment.update = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, (action.error as Error)?.message || "Failed to update payment"),
        };
      });
  },
});

export default settingSlice.reducer;
