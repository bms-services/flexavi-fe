import { toast, ToastOptions, Id } from "react-toastify";
import { ToastActionContent } from "./toast-action";
import { ReactNode } from "react";



export const toastCreate = (loading: boolean) => {
  let toastId: Id | null = null;

  const show = ({
    title,
    description,
    suffix,
    onDelete,
    onDismiss,
    onArchive,
    ...options
  }: {
    title?: string;
    description?: string;
    suffix?: ReactNode;
    onDelete?: () => void;
    onDismiss?: () => void;
    onArchive?: () => void;
  } & ToastOptions) => {
    const content = (
      <ToastActionContent
        title={title}
        description={description}
        suffix={suffix}
        onDismiss={() => {
          if (toastId) {
            onDismiss?.();
            toast.dismiss(toastId);
            toastId = null;
          }
        }}
        onDelete={onDelete}
        onArchive={onArchive}
        loading={loading}
      />
    );

    if (toastId && toast.isActive(toastId)) {
      toast.update(toastId, {
        render: content,
        ...options,
      });
    } else {
      toastId = toast(content, {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        hideProgressBar: true,
        pauseOnHover: true,
        type: "default",
        position: "bottom-center",
        icon: false,
        className: "bg-sidebar shadow-lg rounded-lg p-0",
        ...options,
      });
    }
  };

  const dismiss = () => {
    if (toastId) {
      toast.dismiss(toastId);
      toastId = null;
    }
  };

  return { show, dismiss };
};
