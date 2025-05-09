
import { XCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const ToastStyle = {
  success: {
    container: "bg-sidebar border-white text-white",
    icon: <CheckCircle2 className="text-white" size={18} />,
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-800",
    icon: <XCircle className="text-red-500" size={18} />,
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: <Info className="text-blue-500" size={18} />,
  },
  warning: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    icon: <AlertTriangle className="text-yellow-500" size={18} />,
  },
};

export type ToastType = keyof typeof ToastStyle;