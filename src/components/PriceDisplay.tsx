import { formatCurrency } from "../utils/currency";

interface PriceDisplayProps {
  price: number;
  promotionalPrice?: number;
  className?: string;
}

export const PriceDisplay = ({ price, promotionalPrice, className = "" }: PriceDisplayProps) => (
  <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
    <span className="text-lg font-black text-ember-700">{formatCurrency(promotionalPrice ?? price)}</span>
    {promotionalPrice ? <span className="text-sm font-semibold text-stone-400 line-through">{formatCurrency(price)}</span> : null}
  </div>
);
