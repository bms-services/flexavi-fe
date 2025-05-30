import { createSlice } from "@reduxjs/toolkit";
import { getLeadIndex, getLeadShow, postLeadStore, putLeadUpdate, deleteLeadDestroy } from "@/actions/leadAction";
import { createAsyncState, AsyncState } from "./settingSlice";
import { Lead } from "@/types";
import { PaginationResponse } from "@/@types/global-type";

interface LeadSliceState {
  index: AsyncState<PaginationResponse<Lead>>;
  show: AsyncState<Lead>;
  store: AsyncState<Lead>;
  update: AsyncState<Lead>;
  destroy: AsyncState<Lead>;
}

const initialState: LeadSliceState = {
  index: createAsyncState<PaginationResponse<Lead>>(),
  show: createAsyncState<Lead>(),
  store: createAsyncState<Lead>(),
  update: createAsyncState<Lead>(),
  destroy: createAsyncState<Lead>(),
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

const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Index
    builder
      .addCase(getLeadIndex.pending, (state) => {
        state.index = { ...createAsyncState(), loading: true };
      })
      .addCase(getLeadIndex.fulfilled, (state, action) => {
        state.index = { ...state.index, ...action.payload, loading: false, success: true };
      })
      .addCase(getLeadIndex.rejected, (state, action) => {
        state.index = {
          ...createAsyncState(),
          loading: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to fetch leads"),
        };
      });
    // Show
    builder
      .addCase(getLeadShow.pending, (state) => {
        state.show = { ...createAsyncState(), loading: true };
      })
      .addCase(getLeadShow.fulfilled, (state, action) => {
        state.show = { ...state.show, ...action.payload, loading: false, success: true };
      })
      .addCase(getLeadShow.rejected, (state, action) => {
        state.show = {
          ...createAsyncState(),
          loading: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to fetch lead"),
        };
      });
    // Store
    builder
      .addCase(postLeadStore.pending, (state) => {
        state.store = { ...createAsyncState(), loading: true };
      })
      .addCase(postLeadStore.fulfilled, (state, action) => {
        state.store = { ...state.store, ...action.payload, loading: false, success: true };
      })
      .addCase(postLeadStore.rejected, (state, action) => {
        state.store = {
          ...createAsyncState(),
          loading: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to create lead"),
        };
      });
    // Update
    builder
      .addCase(putLeadUpdate.pending, (state) => {
        state.update = { ...createAsyncState(), loading: true };
      })
      .addCase(putLeadUpdate.fulfilled, (state, action) => {
        state.update = { ...state.update, ...action.payload, loading: false, success: true };
      })
      .addCase(putLeadUpdate.rejected, (state, action) => {
        state.update = {
          ...createAsyncState(),
          loading: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to update lead"),
        };
      });
    // Destroy
    builder
      .addCase(deleteLeadDestroy.pending, (state) => {
        state.destroy = { ...createAsyncState(), loading: true };
      })
      .addCase(deleteLeadDestroy.fulfilled, (state, action) => {
        state.destroy = { ...state.destroy, ...action.payload, loading: false, success: true };
      })
      .addCase(deleteLeadDestroy.rejected, (state, action) => {
        state.destroy = {
          ...createAsyncState(),
          loading: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to delete lead"),
        };
      });
  },
});

export default leadSlice.reducer;