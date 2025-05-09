import { enqueueSnackbar, closeSnackbar, SnackbarKey } from "notistack";

export const showConfirmSnackbar = (
  message: string,
  onConfirm: () => void,
  options?: {
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "error" | "success" | "warning" | "info";
  }
) => {
  const key: SnackbarKey = enqueueSnackbar(message, {
    variant: options?.variant || "warning",
    persist: true, // don't auto-dismiss
    action: (snackbarId) => (
      <>
        <button
          style={{ marginRight: 8 }}
          onClick={() => {
            onConfirm();
            // remove snackbar after action
            closeSnackbar(snackbarId);
          }}
        >
          {options?.confirmLabel || "Yes"}
        </button>
        <button onClick={() => closeSnackbar(snackbarId)}>
          {options?.cancelLabel || "Cancel"}
        </button>
      </>
    ),
  });
};
