// src/lib/toastHelper.ts
import { toast, ToastOptions } from "react-toastify";
import { ToastStyle } from "./toast-style";
import ToastContent from "./toast-content";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

const baseClass =
  "relative border rounded-xl shadow-md p-0 h-full overflow-hidden";

export interface ToastShowProps extends ToastOptions {
  title?: string;
  description?: string;
  iconSuffix?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const toastShow = (props: ToastShowProps) => {
  const { container, icon } = ToastStyle[props.type ?? "success"];

  const toastOptions: ToastOptions = {
    className: `${baseClass} ${container}`,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    position: "bottom-right",
    ...props,
  };

  toast(ToastContent(props, icon), toastOptions);
};
