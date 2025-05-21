import { useState } from "react";
import { useAuth } from "../config/provider/AuthProvider";
import { useConfig } from "../config/provider/ConfigProvider";
import { CarForm } from "../schemas/carSchema";
import { saveCars } from "../services/carsService";
import { ResponseType } from "../types/firestore/ResponseType";

export const useCars = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { config } = useConfig();
  const { user } = useAuth();

  const saveCar = async (form: CarForm): Promise<ResponseType> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await saveCars(form, config.firestoreDocIdDealers, user);

      if (!response.success) {
        setError(response.message);
      } else {
        setSuccessMessage(response.message);
      }

      return response;
    } catch (err: any) {
      const message = err?.message || "Unexpected error";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return {
    saveCar,
    loading,
    error,
    successMessage,
  };
};
