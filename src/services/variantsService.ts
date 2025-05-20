import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { VariantsType } from "../types/firestore/VariantsType";

export const useVariants = (modelsId?: string | undefined) => {
  const [variants, setVariants] = useState<VariantsType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVariants = async () => {
      if (!modelsId?.trim() || loading) {
        setVariants([]);
        return;
      }

      setLoading(true)
      try {
        const modelRef = doc(db, COLLECTIONS.MODELS, modelsId || "");

        const q = query(
          collection(db, COLLECTIONS.VARIANTS),
          where("modelsId", "==", modelRef),
          orderBy('name')
        );

        const snapshot = await getDocs(q);
        const result: VariantsType[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            docId: doc.id,
            name: data.name,
            modelsId: data.modelsId,
          };
        });

        setVariants(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    fetchVariants();
  }, [modelsId]);

  return { variants, loading };
};
