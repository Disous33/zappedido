import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = ({ label, error, id, className = "", ...props }: TextareaProps) => {
  const fieldId = id ?? props.name ?? label;

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-stone-700">{label}</span>
      <textarea
        id={fieldId}
        className={`min-h-24 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-ember-500 focus:ring-4 focus:ring-orange-100 ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-sm font-medium text-red-600">{error}</span> : null}
    </label>
  );
};
