import { ToastMessage } from "../../types";

interface ToastStackProps {
  toasts: ToastMessage[];
}

const toastClasses: Record<ToastMessage["type"], string> = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-orange-200 bg-orange-50 text-orange-900",
};

export const ToastStack = ({ toasts }: ToastStackProps) => (
  <div className="fixed right-4 top-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
    {toasts.map((toast) => (
      <div key={toast.id} className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-soft ${toastClasses[toast.type]}`}>
        {toast.message}
      </div>
    ))}
  </div>
);
