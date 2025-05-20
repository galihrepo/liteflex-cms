import { useEffect, useState } from "react";
import { getBrands } from "../services/brandsService";
import { BrandsType } from "../types/firestore/BrandsType";

export const useBrands = () => {
    const [brands, setBrands] = useState<BrandsType[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetch = async () => {
        setLoading(true);
        try {
          const result = await getBrands();
          setBrands(result);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetch();
    }, []);
  
    return { brands, loading };
  };