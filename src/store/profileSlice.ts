import { createSlice } from "@reduxjs/toolkit";
import {
  getProfileShow,
  putProfileUpdate,
  putVerifyEmail,
  postResendEmailVerification,
} from "@/actions/profileAction";
import { createAsyncState, AsyncState } from "./settingSlice";
import { User } from "@/types/user";

interface ProfileSliceState {
  show: AsyncState<User>;
  update: AsyncState<User>;
  verifyEmail: AsyncState<unknown>;
  resendEmailVerification: AsyncState<unknown>;
}

const initialState: ProfileSliceState = {
  show: createAsyncState<User>(),
  update: createAsyncState<User>(),
  verifyEmail: createAsyncState<unknown>(),
  resendEmailVerification: createAsyncState<unknown>(),
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileShow.pending, (state) => {
        state.show = { ...createAsyncState(), loading: true };
      })
      .addCase(getProfileShow.fulfilled, (state, action) => {
        state.show = { ...state.show, ...action.payload, loading: false, success: true };
      })
      .addCase(getProfileShow.rejected, (state, action) => {
        state.show = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(
            action.payload,
            action.error?.message || "Failed to fetch profile"
          ),
        };
      })
      .addCase(putProfileUpdate.pending, (state) => {
        state.update = { ...createAsyncState(), loading: true };
      })
      .addCase(putProfileUpdate.fulfilled, (state, action) => {
        state.update = { ...state.update, ...action.payload, loading: false, success: true };
      })
      .addCase(putProfileUpdate.rejected, (state, action) => {
        state.update = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(
            action.payload,
            action.error?.message || "Failed to update profile"
          ),
        };
      })
      .addCase(putVerifyEmail.pending, (state) => {
        state.verifyEmail = { ...createAsyncState(), loading: true };
      })
      .addCase(putVerifyEmail.fulfilled, (state, action) => {
        state.verifyEmail = { ...state.verifyEmail, ...action.payload, loading: false, success: true };
      })
      .addCase(putVerifyEmail.rejected, (state, action) => {
        state.verifyEmail = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(
            action.payload,
            action.error?.message || "Failed to verify email"
          ),
        };
      })
      .addCase(postResendEmailVerification.pending, (state) => {
        state.resendEmailVerification = { ...createAsyncState(), loading: true };
      })
      .addCase(postResendEmailVerification.fulfilled, (state, action) => {
        state.resendEmailVerification = { ...state.resendEmailVerification, ...action.payload, loading: false, success: true };
      })
      .addCase(postResendEmailVerification.rejected, (state, action) => {
        state.resendEmailVerification = {
          ...createAsyncState(),
          loading: false,
          success: false,
          errors: getErrors(
            action.payload,
            action.error?.message || "Failed to resend verification email"
          ),
        };
      });
  },
});

export default profileSlice.reducer;
