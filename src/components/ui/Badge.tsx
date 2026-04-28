import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "dark";

const classes: Record<BadgeVariant, string> = {
  default: "bg-orange-100 text-ember-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-700",
  dark: "bg-stone-900 text-white",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = ({ variant = "default", className = "", ...props }: BadgeProps) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black ${classes[variant]} ${className}`} {...props} />
);
