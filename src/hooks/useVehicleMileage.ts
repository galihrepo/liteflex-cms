// src/hooks/useVehicleMileage.ts
import { useEffect, useState } from "react";
import { getVehicleMileage } from "../services/vehicleMileageService";
import { VehicleMileageType } from "../types/firestore/VehicleMileageType";

export const useVehicleMileage = () => {
  const [vehicleMileage, setVehicleMileage] = useState<VehicleMileageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMileage = async () => {
      setLoading(true);
      try {
        const result = await getVehicleMileage();
        if (isMounted) setVehicleMileage(result);
      } catch (error) {
        console.error("Error fetching vehicle mileage:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMileage();

    return () => {
      isMounted = false;
    };
  }, []);

  return { vehicleMileage, loading };
};
