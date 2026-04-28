export const nowIso = () => new Date().toISOString();

export const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

export const getDaysUntil = (dateIso: string) => {
  const diff = new Date(dateIso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
};

export const formatDateTime = (dateIso: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateIso));
