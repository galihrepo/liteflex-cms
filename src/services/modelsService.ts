import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { ModelsType } from "../types/firestore/ModelsType";

export const getModelsByBrand = async (brandId: string): Promise<ModelsType[]> => {
  if (!brandId.trim()) return [];

  const brandRef = doc(db, COLLECTIONS.BRANDS, brandId);
  const q = query(
    collection(db, COLLECTIONS.MODELS),
    where("brandsId", "==", brandRef),
    orderBy("name")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    name: doc.data().name,
    brandsId: doc.data().brandsId,
  }));
};
