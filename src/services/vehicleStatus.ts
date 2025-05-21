// src/services/vehicleMileageService.ts
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { VehicleStatusType } from "../types/firestore/VehicleStatusType";

export const getVehicleStatus = async (): Promise<VehicleStatusType[]> => {
  const q = query(collection(db, COLLECTIONS.VEHICLE_STATUS), orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    name: doc.data().name,
  }));
};
