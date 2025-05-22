import { useState } from "react";
import { useAuth } from "../config/provider/AuthProvider";
import { useConfig } from "../config/provider/ConfigProvider";
import { CarForm } from "../schemas/carSchema";
import { getCarsById } from "../services/cars/getCarsByIdService";
import { saveCars } from "../services/cars/saveCarsService";
import { CarsType } from "../types/firestore/CarsType";
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
      const message = err?.message || "Sistem bermasalah, silakan coba beberapa saat lagi.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const mapCarTypeToCarForm = (data: CarsType | null): CarForm => {    
    return {
      brands: { label: data?.brandsValue || '', value: data?.brandsId?.id || '' },
      models: { label: data?.modelsValue || '', value: data?.modelsId?.id || '' },
      variants: { label: data?.variantsValue || '', value: data?.variantsId?.id || '' },
      fuel: { label: data?.fuelValue || '', value: data?.fuelId?.id || '' },
      transmission: { label: data?.transmissionValue || '', value: data?.transmissionId?.id || '' },
      vehicleColors: { label: data?.vehicleColorsValue || '', value: data?.vehicleColorsId?.id || '' },
      vehicleMilage: { label: data?.vehicleMilageValue || '', value: data?.vehicleMileageId?.id || '' },
      plateNumber: String(data?.plateNumber || 0),
      year: String(data?.year || 0),
      price: String(data?.price || 0),
      pictureUrls: data?.pictureUrls || [],
      videoUrl: data?.videoUrl || '',
    };
  };

  const getCarId = async (id: string): Promise<CarForm | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCarsById(id);      
      return mapCarTypeToCarForm(response);
    } catch (err: any) {
      setError(err.message || "Gagal memuat data mobil.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getCarId,
    saveCar,
    loading,
    error,
    successMessage,
  };
};
