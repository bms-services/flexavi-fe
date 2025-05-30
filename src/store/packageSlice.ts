import { createSlice } from "@reduxjs/toolkit";
import {
  getPackageIndex,
  getPackageShow,
  putPackageUpdate
} from "@/actions/packageAction";
import { Package } from "@/types/package";
import { createAsyncState, AsyncState } from "./settingSlice";

interface PackageSliceState {
  index: AsyncState<Package[]>;
  show: AsyncState<Package>;
  update: AsyncState<Package>;
}

// --- Initial State ---
const initialState: PackageSliceState = {
  index: createAsyncState<Package[]>(),
  show: createAsyncState<Package>(),
  update: createAsyncState<Package>(),
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

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPackageIndex.pending, (state) => {
        state.index = { ...createAsyncState(), loading: true };
      })
      .addCase(getPackageIndex.fulfilled, (state, action) => {
        state.index = { ...state.index, ...action.payload, loading: false, success: true };
      })
      .addCase(getPackageIndex.rejected, (state, action) => {
        state.index = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to fetch packages"),
        };
      })
      .addCase(getPackageShow.pending, (state) => {
        state.show = { ...createAsyncState(), loading: true };
      })
      .addCase(getPackageShow.fulfilled, (state, action) => {
        state.show = { ...state.show, ...action.payload, loading: false, success: true };
      })
      .addCase(getPackageShow.rejected, (state, action) => {
        state.show = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to fetch package"),
        };
      })
      .addCase(putPackageUpdate.pending, (state) => {
        state.update = { ...createAsyncState(), loading: true };
      })
      .addCase(putPackageUpdate.fulfilled, (state, action) => {
        state.update = { ...state.update, ...action.payload, loading: false, success: true };
      })
      .addCase(putPackageUpdate.rejected, (state, action) => {
        state.update = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(action.payload, action.error?.message || "Failed to update package"),
        };
      });
  },
});

export default packageSlice.reducer;
