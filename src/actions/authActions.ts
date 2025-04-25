import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "@/store/authSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { tokenName } from "@/hooks/use-cookies";
import { User } from "@/types/auth";
import { mainApi } from "@/utils/axios";

export const pushLogin = (formData: User) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());

  try {
    const { data } = await mainApi.post("login", formData);
    dispatch(loginSuccess(data));
    Cookies.set(tokenName, JSON.stringify(data.result), { expires: 7 });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    dispatch(loginFailed(error));
  }
};

export const pushLogout = () => async (dispatch: AppDispatch) => {
  dispatch(logoutStart());
  try {
    const { data } = await mainApi.delete("logout");
    dispatch(logoutSuccess(data));
    Cookies.remove(tokenName);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    dispatch(logoutFailed(error));
  }
};
