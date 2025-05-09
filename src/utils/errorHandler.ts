import { ErrorType } from "@/lib/redux-thunk";
import { AxiosError } from "axios";
import { Path, UseFormSetError } from "react-hook-form";
import { toastShow } from "../components/ui/toast/toast-helper";

export default function errorHandler(error: ErrorType): string {
  const handleToast = (message: string) => {
    toastShow({
      type: "error",
      title: "Foutmelding",
      description: message,
      autoClose: 5000,
    });
  };

  if (typeof error === "string") {
    handleToast(error);
    return error;
  }

  if (typeof error === "object" && error !== null) {
    const e = error as Record<string, unknown>;

    const errs = (e.response as { data?: { errors?: unknown } })?.data?.errors;

    if (errs && typeof errs === "string") {
      handleToast(errs);
      return errs;
    }

    if (errs && typeof errs === "object") {
      const allMessages: string[] = [];

      let delay = 0;
      Object.entries(errs).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            allMessages.push(msg);
            setTimeout(() => handleToast(msg), delay);
            delay += 300;
          });
        } else {
          allMessages.push(messages as string);
          setTimeout(() => handleToast(messages as string), delay);
          delay += 300;
        }
      });

      return allMessages.join("\n");
    }

    if (e.response && typeof e.response === "object" && "data" in e.response) {
      const responseData = (e.response as { data?: { message?: string } }).data;
      if (responseData?.message) {
        handleToast(responseData.message);
        return responseData.message;
      }
    }

    handleToast("Er is een onverwachte fout opgetreden.");
    return "Er is een onverwachte fout opgetreden.";
  }

  handleToast("Onbekende fout.");
  return "Onbekende fout.";
}

export function handleErrorForm<T>(
  errors: ErrorType,
  setError: UseFormSetError<T>
) {
  Object.entries(errors).forEach(([field, messages]) => {
    setError(field as Path<T>, {
      type: "server",
      message: messages[0],
    });
  });
}
