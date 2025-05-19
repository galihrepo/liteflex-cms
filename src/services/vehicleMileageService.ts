import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { VehicleMileageType } from "../types/firestore/VehicleMileageType";

export const useVehicleMileage = () => {
  const [vehicleMileage, setVehicleMileage] = useState<VehicleMileageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, COLLECTIONS.VEHICLE_MILEAGE), orderBy('sequence'));
        const snapshot = await getDocs(q);
        const result: VehicleMileageType[] = snapshot.docs.map((doc) => ({
          docId: doc.id,
          name: doc.data().name,
          sequence:  doc.data().sequence,
        }));
        
        setVehicleMileage(result);        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { vehicleMileage, loading };
};
