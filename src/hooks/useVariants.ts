// src/hooks/useVariants.ts
import { useEffect, useState } from "react";
import { getVariantsByModelId } from "../services/variantsService";
import { VariantsType } from "../types/firestore/VariantsType";

export const useVariants = (modelsId?: string) => {
  const [variants, setVariants] = useState<VariantsType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchVariants = async () => {
      if (!modelsId?.trim()) {
        if (isMounted) setVariants([]);
        return;
      }

      setLoading(true);
      try {
        const result = await getVariantsByModelId(modelsId);
        if (isMounted) setVariants(result);
      } catch (error) {
        console.error("Error fetching variants:", error);
        if (isMounted) setVariants([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVariants();

    return () => {
      isMounted = false;
    };
  }, [modelsId]);

  return { variants, loading };
};
