import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { VehicleColorsType } from "../types/firestore/VehicleColorsType";

export const useVehicleColors = () => {
  const [vehicleColors, setVehicleColors] = useState<VehicleColorsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, COLLECTIONS.VEHICLE_COLORS), orderBy('name'));
        const snapshot = await getDocs(q);
        const result: VehicleColorsType[] = snapshot.docs.map((doc) => ({
          docId: doc.id,
          name: doc.data().name,
        }));
        
        setVehicleColors(result);        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { vehicleColors, loading };
};
