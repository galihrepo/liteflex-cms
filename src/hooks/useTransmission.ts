import { useEffect, useState } from "react";
import { getTransmissionList } from "../services/transmissionService";
import { TransmissionType } from "../types/firestore/TransmissionType";

export const useTransmission = () => {
  const [transmission, setTransmission] = useState<TransmissionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTransmission = async () => {
      setLoading(true);
      try {
        const result = await getTransmissionList();
        if (isMounted) setTransmission(result);
      } catch (error) {
        console.error("Failed to fetch transmission data:", error);
        if (isMounted) setTransmission([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTransmission();

    return () => {
      isMounted = false;
    };
  }, []);

  return { transmission, loading };
};
