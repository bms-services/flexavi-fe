import { AxiosError } from "axios";
import { ApiError } from "@/zustand/types/apiT";
import { toastShow } from "../components/ui/toast/toast-helper";

export default function errorHandler(error: AxiosError<ApiError>): string {
  const message = error?.response?.data?.message ?? "Er is een onverwachte fout opgetreden.";

  toastShow({
    type: "error",
    title: "Foutmelding",
    description: message,
    autoClose: 5000,
  });

  return message;
}