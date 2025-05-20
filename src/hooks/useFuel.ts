import { useEffect, useState } from "react";
import { getFuelList } from "../services/fuelService";
import { FuelType } from "../types/firestore/FuelType";

export const useFuel = () => {
  const [fuel, setFuel] = useState<FuelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const result = await getFuelList();
        setFuel(result);
      } catch (error) {
        console.error("Error fetching fuel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { fuel, loading };
};
