import { useEffect, useState } from "react";
import { AppData } from "../types";
import { getStoredData, resetStoredData, saveStoredData } from "../utils/storage";

export const useAppData = () => {
  const [data, setData] = useState<AppData>(() => getStoredData());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const updateData = (nextData: AppData) => {
    setData(nextData);
    saveStoredData(nextData);
  };

  const resetData = () => {
    const nextData = resetStoredData();
    setData(nextData);
  };

  return { data, setData: updateData, resetData, isLoaded };
};
