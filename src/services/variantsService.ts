// src/services/variantsService.ts
import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { VariantsType } from "../types/firestore/VariantsType";

export const getVariantsByModelId = async (modelsId: string): Promise<VariantsType[]> => {
  if (!modelsId.trim()) return [];

  const modelRef = doc(db, COLLECTIONS.MODELS, modelsId);

  const q = query(
    collection(db, COLLECTIONS.VARIANTS),
    where("modelsId", "==", modelRef),
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      docId: doc.id,
      name: data.name,
      modelsId: data.modelsId,
    };
  });
};
