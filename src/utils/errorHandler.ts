import { ErrorType } from "@/lib/redux-thunk";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Path, UseFormSetError } from "react-hook-form";

export default function handleErrorAxios(error: ErrorType): string {
  const errorSnackbar = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

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
