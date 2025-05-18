import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { TransmissionType } from "../types/firestore/TransmissionType";

export const useTransmission = () => {
  const [transmission, setTransmission] = useState<TransmissionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const q = query(collection(db, COLLECTIONS.TRANSMISSION), orderBy('name'));
        const snapshot = await getDocs(q);
        const result: TransmissionType[] = snapshot.docs.map((doc) => ({
          docId: doc.id,
          name: doc.data().name,
        }));
        
        setTransmission(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, []);

  return { transmission, loading };
};
