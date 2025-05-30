import { createSlice } from "@reduxjs/toolkit";
import {
  getSubscriptionIndex,
  getSubscriptionShow,
} from "@/actions/subscriptionAction";
import { createAsyncState, AsyncState } from "./settingSlice";

interface SubscriptionSliceState {
  index: AsyncState<unknown[]>;
  show: AsyncState<unknown>;
}

const initialState: SubscriptionSliceState = {
  index: createAsyncState<unknown[]>(),
  show: createAsyncState<unknown>(),
};

function getErrors(payload: unknown, fallback: string): string[] {
  if (
    payload &&
    typeof payload === "object" &&
    "errors" in (payload as Record<string, unknown>) &&
    Array.isArray((payload as { errors?: string[] }).errors)
  ) {
    return (payload as { errors: string[] }).errors;
  }
  return [fallback];
}

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionIndex.pending, (state) => {
        state.index = { ...createAsyncState(), loading: true };
      })
      .addCase(getSubscriptionIndex.fulfilled, (state, action) => {
        state.index = { ...state.index, ...action.payload, loading: false, success: true };
      })
      .addCase(getSubscriptionIndex.rejected, (state, action) => {
        state.index = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(
            action.payload,
            action.error?.message || "Failed to fetch subscriptions"
          ),
        };
      })
      .addCase(getSubscriptionShow.pending, (state) => {
        state.show = { ...createAsyncState(), loading: true };
      })
      .addCase(getSubscriptionShow.fulfilled, (state, action) => {
        state.show = { ...state.show, ...action.payload, loading: false, success: true };
      })
      .addCase(getSubscriptionShow.rejected, (state, action) => {
        state.show = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(
            action.payload,
            action.error?.message || "Failed to fetch subscription"
          ),
        };
      });
  },
});

export default subscriptionSlice.reducer;
