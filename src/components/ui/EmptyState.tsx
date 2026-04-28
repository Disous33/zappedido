import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center">
    {icon ? <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ember-600">{icon}</div> : null}
    <h3 className="text-lg font-black text-ink">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
