import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { FuelType } from "../types/firestore/FuelType";

export const useFuel = () => {
  const [fuel, setFuel] = useState<FuelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, COLLECTIONS.FUEL), orderBy('name'));
        const snapshot = await getDocs(q);
        const result: FuelType[] = snapshot.docs.map((doc) => ({
          docId: doc.id,
          name: doc.data().name,
        }));
        
        setFuel(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { fuel, loading };
};
