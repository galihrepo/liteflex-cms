// src/services/transmissionService.ts
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { TransmissionType } from "../types/firestore/TransmissionType";

export const getTransmissionList = async (): Promise<TransmissionType[]> => {
  const q = query(collection(db, COLLECTIONS.TRANSMISSION), orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    name: doc.data().name,
  }));
};
