// src/services/vehicleColorsService.ts
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { VehicleColorsType } from "../types/firestore/VehicleColorsType";

export const getVehicleColors = async (): Promise<VehicleColorsType[]> => {
  const q = query(collection(db, COLLECTIONS.VEHICLE_COLORS), orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    name: doc.data().name,
  }));
};