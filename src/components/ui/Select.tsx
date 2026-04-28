import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const Select = ({ label, error, className = "", children, ...props }: SelectProps) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-semibold text-stone-700">{label}</span>
    <select
      className={`w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-ember-500 focus:ring-4 focus:ring-orange-100 ${className}`}
      {...props}
    >
      {children}
    </select>
    {error ? <span className="mt-1 block text-sm font-medium text-red-600">{error}</span> : null}
  </label>
);
