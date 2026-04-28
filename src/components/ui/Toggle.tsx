interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export const Toggle = ({ label, checked, onChange, description }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex w-full items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-3 text-left transition hover:bg-ember-50"
  >
    <span>
      <span className="block text-sm font-bold text-ink">{label}</span>
      {description ? <span className="mt-0.5 block text-xs text-stone-500">{description}</span> : null}
    </span>
    <span className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-ember-600" : "bg-stone-300"}`}>
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </span>
  </button>
);
