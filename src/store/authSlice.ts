import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorReducerType, StatusReducerType } from ".";
import { User } from "@/types/auth";

interface ResponseType {
  status: string;
  code: number;
  message: string;
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
      // state.user = action.payload;
    },
    loginFailed(state, action: PayloadAction<ErrorReducerType>) {
      state.status = "failed";
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    logoutStart(state) {
      state.status = "loading";
    },
    logoutSuccess(state, action: PayloadAction<ResponseType>) {
      state.status = "succeeded";
      state.isAuthenticated = false;
      state.response = action.payload;
      // state.user = null;
    },
    logoutFailed(state, action: PayloadAction<ErrorReducerType>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
