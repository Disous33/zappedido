import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ open, title, children, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-soft sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white px-5 py-4">
          <h2 className="text-lg font-black text-ink">{title}</h2>
          <Button type="button" variant="ghost" className="h-10 min-h-10 w-10 px-0" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
