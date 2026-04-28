import { HTMLAttributes } from "react";

export const Card = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-2xl border border-orange-100 bg-white shadow-sm ${className}`} {...props} />
);
