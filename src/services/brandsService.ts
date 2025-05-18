import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { BrandsType } from "../types/firestore/BrandsType";

export const useBrands = () => {
  const [brands, setBrands] = useState<BrandsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const snapshot = await getDocs(collection(db, COLLECTIONS.BRANDS));
        const result: BrandsType[] = snapshot.docs.map((doc) => ({
          docId: doc.id,
          value: doc.data().value,
        }));
        console.log('BERAK brands : ', result);
        setBrands(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading };
};
