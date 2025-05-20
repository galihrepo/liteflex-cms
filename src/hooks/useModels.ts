// src/hooks/useModels.ts
import { useEffect, useState } from "react";
import { getModelsByBrand } from "../services/modelsService";
import { ModelsType } from "../types/firestore/ModelsType";

export const useModels = (brandsId?: string) => {
  const [models, setModels] = useState<ModelsType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!brandsId?.trim()) {
      setModels([]);
      return;
    }

    let isMounted = true;

    const fetchModels = async () => {
      setLoading(true);
      try {
        const result = await getModelsByBrand(brandsId);
        if (isMounted) setModels(result);
      } catch (error) {
        console.error("Error fetching models:", error);
        if (isMounted) setModels([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchModels();

    return () => {
      isMounted = false;
    };
  }, [brandsId]);

  return { models, loading };
};
