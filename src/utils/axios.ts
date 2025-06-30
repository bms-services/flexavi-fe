import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import errorHandler from "./errorHandler";
import successHandler from "./successHandler";
import { ApiError } from "@/zustand/types/apiT";

const baseApiUrl = import.meta.env.VITE_API_URL;
const tokenName = import.meta.env.VITE_TOKEN_NAME;

const getAuthToken = (): string | null => {
  const token = Cookies.get(tokenName);
  if (token && token !== "null") return token;
  Cookies.remove(tokenName);
  return null;
};

const getLangCookie = (): string | undefined =>
  Cookies.get("local") || import.meta.env.VITE_I18N_DEFAULT_LOCALE || "nl";

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  silentToast?: boolean;
}

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
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

      const isFormData = config.data instanceof FormData;
      if (!isFormData) {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      const config = response.config as AxiosCustomRequestConfig;
      const method = config.method?.toUpperCase() || "";
      const isSilent = config.silentToast;

      if (method !== "GET" && !isSilent) {
        successHandler(response.data.message);
      }

      return response;
    },
    (error: AxiosError<ApiError>) => {
      const status = error.response?.status;
      const token = getAuthToken();
      if (token && status === 401) {
        Cookies.remove(tokenName);
        window.location.href = "/login";
      }

      errorHandler(error);
      return Promise.reject(error.response?.data);
    }
  );

  return instance;
};

export const mainApi = createAxiosInstance(baseApiUrl);