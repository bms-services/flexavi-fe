import { tokenName } from "@/hooks/use-cookies";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

// Base URLs dari .env
const baseApiUrl = import.meta.env.VITE_API_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;
const mainUrl = import.meta.env.VITE_MAIN_URL;

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
    (error: AxiosError) => {
      formatApiError(error);
      return Promise.reject(error.response.data);
    }
  );

  return instance;
};

export const mainApi = createAxiosInstance(baseApiUrl);

const errorSnackbar = (message: string) => {
  enqueueSnackbar(message, {
    variant: "error",
  });
};

export const formatApiError = (error: unknown): string => {
  if (typeof error === "string") {
    errorSnackbar(error);
    return error;
  }

  if (typeof error === "object" && error !== null) {
    const e = error as Record<string, unknown>;

    const errs = (e.response as { data?: { errors?: unknown } })?.data?.errors;

    if (errs && typeof errs === "string") {
      errorSnackbar(errs);
      return errs;
    }

    if (errs && typeof errs === "object") {
      const allMessages: string[] = [];

      let delay = 0;
      Object.entries(errs).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            allMessages.push(msg);
            setTimeout(() => errorSnackbar(msg), delay);
            delay += 300;
          });
        } else {
          allMessages.push(messages as string);
          setTimeout(() => errorSnackbar(messages as string), delay);
          delay += 300;
        }
      });

      return allMessages.join("\n");
    }

    if (e.response && typeof e.response === "object" && "data" in e.response) {
      const responseData = (e.response as { data?: { message?: string } }).data;
      if (responseData?.message) {
        errorSnackbar(responseData.message);
        return responseData.message;
      }
    }

    errorSnackbar("Er is een onverwachte fout opgetreden.");
    return "Er is een onverwachte fout opgetreden.";
  }

  errorSnackbar("Onbekende fout.");
  return "Onbekende fout.";
};
