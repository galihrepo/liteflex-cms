import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { ModelsType } from "../types/firestore/ModelsType";

export const useModels = (brandsId?: string | undefined) => {
  const [models, setModels] = useState<ModelsType[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      if (!brandsId) {
        setModels([]);
        return;
      }

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
        console.error("Error fetching Toyota branches:", error);
      }
    };

    fetchModels();
  }, [brandsId]);

  return { models };
};
