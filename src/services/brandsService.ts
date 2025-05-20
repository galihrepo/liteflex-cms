import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { BrandsType } from "../types/firestore/BrandsType";

export const getBrands = async (): Promise<BrandsType[]> => {
  const q = query(collection(db, COLLECTIONS.BRANDS), orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    name: doc.data().name,
  }));
};
