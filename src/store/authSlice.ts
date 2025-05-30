import { login, logout, register } from "@/actions/authActions";
import { StatusReducerEnum } from "@/hooks/use-redux";
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface AuthAsyncState<T = unknown> {
  loading: boolean;
  success: boolean;
  errors: string[] | null;
  result: T | null;
  message?: string;
}

const createAuthAsyncState = <T = unknown>(): AuthAsyncState<T> => ({
  loading: false,
  success: false,
  errors: null,
  result: null,
  message: "",
});

const initialState = {
  login: createAuthAsyncState<User>(),
  register: createAuthAsyncState<User>(),
  logout: createAuthAsyncState<null>(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerReset: (state) => {
      state.register = createAuthAsyncState<User>();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login = { ...createAuthAsyncState(), loading: true };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login = {
          ...state.login,
          ...action.payload,
          loading: false,
          success: true,
          errors: null,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.login = {
          ...createAuthAsyncState(),
          loading: false,
          success: false,
          errors: getPayloadError(action.payload, action.error?.message || "Login failed"),
          message: getPayloadMessage(action.payload, action.error?.message || "Login failed"),
        };
      })
      .addCase(register.pending, (state) => {
        state.register = { ...createAuthAsyncState(), loading: true };
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register = {
          ...state.register,
          ...action.payload,
          loading: false,
          success: true,
          errors: null,
        };
      })
      .addCase(register.rejected, (state, action) => {
        state.register = {
          ...createAuthAsyncState(),
          loading: false,
          success: false,
          errors: getPayloadError(action.payload, action.error?.message || "Register failed"),
          message: getPayloadMessage(action.payload, action.error?.message || "Register failed"),
        };
      })
      .addCase(logout.pending, (state) => {
        state.logout = { ...createAuthAsyncState(), loading: true };
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logout = {
          ...state.logout,
          ...action.payload,
          loading: false,
          success: true,
          errors: null,
        };
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout = {
          ...createAuthAsyncState(),
          loading: false,
          success: false,
          errors: getPayloadError(action.payload, action.error?.message || "Logout failed"),
          message: getPayloadMessage(action.payload, action.error?.message || "Logout failed"),
        };
      });
  },
});

function getPayloadError(payload: unknown, fallback: string): string[] {
  if (
    payload &&
    typeof payload === 'object' &&
    'errors' in (payload as Record<string, unknown>) &&
    Array.isArray((payload as Record<string, unknown>).errors)
  ) {
    return (payload as { errors: string[] }).errors;
  }
  return [fallback];
}
function getPayloadMessage(payload: unknown, fallback: string): string {
  if (
    payload &&
    typeof payload === 'object' &&
    'message' in (payload as Record<string, unknown>) &&
    typeof (payload as Record<string, unknown>).message === 'string'
  ) {
    return (payload as { message: string }).message;
  }
  return fallback;
}

export default authSlice.reducer;

export const { registerReset } = authSlice.actions;
