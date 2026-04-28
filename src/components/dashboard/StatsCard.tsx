import { ReactNode } from "react";
import { Card } from "../ui/Card";

interface StatsCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

export const StatsCard = ({ label, value, icon }: StatsCardProps) => (
  <Card className="p-5">
    <div className="flex items-center justify-between text-ember-600">
      {icon}
      <span className="text-xs font-black uppercase text-stone-400">{label}</span>
    </div>
    <p className="mt-4 text-2xl font-black text-ink">{value}</p>
  </Card>
);
