// src/hooks/useVehicleColors.ts
import { useEffect, useState } from "react";
import { getVehicleColors } from "../services/vehicleColorsService";
import { VehicleColorsType } from "../types/firestore/VehicleColorsType";

export const useVehicleColors = () => {
  const [vehicleColors, setVehicleColors] = useState<VehicleColorsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchColors = async () => {
      setLoading(true);
      try {
        const result = await getVehicleColors();
        if (isMounted) setVehicleColors(result);
      } catch (error) {
        console.error("Error fetching vehicle colors:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchColors();

    return () => {
      isMounted = false;
    };
  }, []);

  return { vehicleColors, loading };
};
