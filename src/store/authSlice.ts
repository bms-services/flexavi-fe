import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorReducerType, StatusReducerType } from ".";
import { User } from "@/types/auth";

interface ResponseType {
  status: string;
  code: number;
  message: string;
  result: User | null;
}

interface AuthState {
  isAuthenticated: boolean;
  // user: User | null;
  response: ResponseType | null;
  status: StatusReducerType;
  error: ErrorReducerType;
}

const initialState: AuthState = {
  isAuthenticated: false,
  // user: null,
  response: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<ResponseType>) {
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.response = action.payload;
    },
    loginFailed(state, action: PayloadAction<ErrorReducerType>) {
      state.status = "failed";
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    registerStart(state) {
      state.status = "loading";
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<ResponseType>) {
      state.status = "succeeded";
      state.isAuthenticated = false;
      state.response = action.payload;
    },
    registerFailed(state, action: PayloadAction<ErrorReducerType>) {
      state.status = "failed";
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    registerReset(state) {
      state.status = "idle";
      state.error = null;
    },

    forgotPasswordStart(state) {
      state.status = "loading";
      state.error = null;
    },
    forgotPasswordSuccess(state, action: PayloadAction<ResponseType>) {
      state.status = "succeeded";
      state.isAuthenticated = false;
      state.response = action.payload;
    },
    forgotPasswordFailed(state, action: PayloadAction<ErrorReducerType>) {
      state.status = "failed";
      state.error = action.payload;
    },
    forgotPasswordReset(state) {
      state.status = "idle";
      state.error = null;
    },

    logoutStart(state) {
      state.status = "loading";
    },
    logoutSuccess(state, action: PayloadAction<ResponseType>) {
      state.status = "succeeded";
      state.isAuthenticated = false;
      state.response = action.payload;
    },
    logoutFailed(state, action: PayloadAction<ErrorReducerType>) {
      state.status = "failed";
      state.error = action.payload;
    },
    logoutReset(state) {
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  registerReset,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  forgotPasswordReset,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  logoutReset,
} = authSlice.actions;

export default authSlice.reducer;
