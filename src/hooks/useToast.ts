import { useState } from "react";
import { ToastMessage } from "../types";
import { createId } from "../utils/id";

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: ToastMessage["type"], message: string) => {
    const toast = { id: createId("toast"), type, message };
    setToasts((current) => [...current, toast]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== toast.id));
    }, 3600);
  };

  return { toasts, showToast };
};
