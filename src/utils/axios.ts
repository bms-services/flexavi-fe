import { tokenName } from "@/hooks/use-cookies";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import handleErrorAxios from "./errorHandler";

// Base URLs dari .env
const baseApiUrl = import.meta.env.VITE_API_URL;

const getAuthToken = (): string | null => {
  const token = Cookies.get(tokenName);

  if (token && token !== "null") {
    return JSON.parse(token).token;
  } else {
    Cookies.set(tokenName, JSON.stringify(null));
    return null;
  }
};

const getLangCookie = (): string | undefined => {
  const lang =
    Cookies.get("local") || import.meta.env.VITE_I18N_DEFAULT_LOCALE || "nl";
  return lang;
};

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": getLangCookie(),
    },
  });

  instance.interceptors.request.use(
    function (config) {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const lang = getLangCookie();
      if (lang) {
        config.headers["Accept-Language"] = lang;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<Record<string, string[]>>) => {
      const err = error.response?.data;
      handleErrorAxios(err);
      return Promise.reject(err);
    }
  );

  return instance;
};

export const mainApi = createAxiosInstance(baseApiUrl);
