import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { FuelType } from "../types/firestore/FuelType";

export const getFuelList = async (): Promise<FuelType[]> => {
  const q = query(collection(db, COLLECTIONS.FUEL), orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    name: doc.data().name,
  }));
};
