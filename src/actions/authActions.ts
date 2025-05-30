import { User } from "@/types/user";
import { mainApi } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import { tokenName } from "@/hooks/use-cookies";

const tokenName = import.meta.env.VITE_TOKEN_NAME;

function isAxiosError(error: unknown): error is { response?: { data?: { errors?: string[]; message?: string } }; message?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as Record<string, unknown>).response === "object"
  );
}

export const login = createAsyncThunk(
  "auth/login",
  async (formData: Partial<User>, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post("/login", formData);
      const result = data.result;
      
      Cookies.set(tokenName, result.token, { expires: new Date(result.expires_at) });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

      return { ...data, result, success: true };
    } catch (error: unknown) {
      let errors = ["Unknown error"];
      let message = "Unknown error";
      if (isAxiosError(error)) {
        errors = error.response?.data?.errors || [error.message || "Unknown error"];
        message = error.response?.data?.message || error.message || "Unknown error";
      } else if (error instanceof Error) {
        errors = [error.message];
        message = error.message;
      }
      return rejectWithValue({
        errors,
        message,
        success: false,
      });
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData: Partial<User>, { rejectWithValue }) => {
    try {
      const { data } = await mainApi.post("/register", formData);
      return { ...data, result: data.result, success: true };
    } catch (error: unknown) {
      let errors = ["Unknown error"];
      let message = "Unknown error";
      if (isAxiosError(error)) {
        errors = error.response?.data?.errors || [error.message || "Unknown error"];
        message = error.response?.data?.message || error.message || "Unknown error";
      } else if (error instanceof Error) {
        errors = [error.message];
        message = error.message;
      }
      return rejectWithValue({
        errors,
        message,
        success: false,
      });
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

      return { ...data, result: data.result, success: true };
    } catch (error: unknown) {
      setTimeout(() => {
        Cookies.remove(tokenName);
        window.location.href = "/login";
      }, 1000);
      let errors = ["Unknown error"];
      let message = "Unknown error";
      if (isAxiosError(error)) {
        errors = error.response?.data?.errors || [error.message || "Unknown error"];
        message = error.response?.data?.message || error.message || "Unknown error";
      } else if (error instanceof Error) {
        errors = [error.message];
        message = error.message;
      }
      return rejectWithValue({
        errors,
        message,
        success: false,
      });
    }
  }
);
