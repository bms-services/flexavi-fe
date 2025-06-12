import { User } from "@/types/user";
import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const tokenName = import.meta.env.VITE_TOKEN_NAME;

export const login = createAsyncThunk(
  "auth/login",
  async (formData: Partial<User>, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post("/login", formData);

      const result = data.result;
      Cookies.set(tokenName, result.token, { expires: new Date(result.expires_at) });

      return data;
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData: Partial<User>, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post("/register", formData);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.delete("/logout");

      setTimeout(() => {
        Cookies.remove(tokenName);
        window.location.href = "/login";
      }, 1000);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
);
