import {
  getProfileShow,
  putProfileUpdate,
  putVerifyEmail,
  postResendEmailVerification,
} from "@/actions/profileAction";
import { createSlice, AsyncThunk } from "@reduxjs/toolkit";
import { createAsyncState } from "./settingSlice";
import { User } from "@/types/user";

// --- Initial State ---
const initialState = {
  show: createAsyncState<User>(),
  update: createAsyncState<User>(),
  putVerifyEmail: createAsyncState(),
  postResendEmailVerification: createAsyncState(),
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const attachAsyncHandler = <TKey extends keyof typeof initialState>(
      thunk: AsyncThunk<any, any, any>,
      key: TKey
    ) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[key] = {
            ...createAsyncState(),
            loading: true,
          };
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state[key] = {
            ...state[key],
            ...action.payload,
            loading: false,
          };
        })
        .addCase(thunk.rejected, (state, action) => {
          state[key] = {
            ...createAsyncState(),
            loading: false,
            errors: action.payload?.errors || [action.error.message],
          };
        });
    };

    attachAsyncHandler(getProfileShow, "show");
    attachAsyncHandler(putProfileUpdate, "update");
    attachAsyncHandler(putVerifyEmail, "verifyEmail");
    attachAsyncHandler(postResendEmailVerification, "resendEmailVerification");
  },
});

export default profileSlice.reducer;
