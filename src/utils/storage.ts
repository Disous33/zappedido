import { demoData } from "../data/demoData";
import { AppData } from "../types";

const STORAGE_KEY = "zappedido.appData";

export const getStoredData = (): AppData => {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (!rawData) {
    saveStoredData(demoData);
    return demoData;
  }

  try {
    return JSON.parse(rawData) as AppData;
  } catch {
    saveStoredData(demoData);
    return demoData;
  }
};

export const saveStoredData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetStoredData = () => {
  saveStoredData(demoData);
  return demoData;
};

export const exportDataFile = (data: AppData) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "zappedido-data.json";
  link.click();
  URL.revokeObjectURL(url);
};
