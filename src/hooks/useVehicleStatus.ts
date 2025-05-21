// src/hooks/useVehicleColors.ts
import { useEffect, useState } from "react";
import { getVehicleStatus } from "../services/vehicleStatus";
import { VehicleStatusType } from "../types/firestore/VehicleStatusType";

export const useVehicleStatus = () => {
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatusType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      setLoading(true);
      try {
        const result = await getVehicleStatus();
        if (isMounted) setVehicleStatus(result);
      } catch (error) {
        console.error("Error fetching vehicle status:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return { vehicleStatus, loading };
};
