import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { ModelsType } from "../types/firestore/ModelsType";

export const useModels = (brandsId?: string | undefined) => {
  const [models, setModels] = useState<ModelsType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      if (!brandsId || loading) {
        setModels([]);
        return;
      }

      setLoading(true)
      try {
        const brandRef = doc(db, COLLECTIONS.BRANDS, brandsId || "");

        const q = query(
          collection(db, COLLECTIONS.MODELS),
          where("brandsId", "==", brandRef)
        );

        const snapshot = await getDocs(q);
        const result: ModelsType[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            docId: doc.id,
            variant: data.variant,
            brandsId: data.brandsId,
          };
        });

        setModels(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    fetchModels();
  }, [brandsId]);

  return { models, loading };
};
