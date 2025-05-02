import { User } from "@/types/user";
import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { tokenName } from "@/hooks/use-cookies";

export const login = createAsyncThunk(
  "auth/login",
  async (formData: Partial<User>, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post("/login", formData);

      Cookies.set(tokenName, JSON.stringify(data.result), { expires: 7 });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData: Partial<User>, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post("/register", formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
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
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
