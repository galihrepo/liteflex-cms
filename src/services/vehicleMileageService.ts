// src/services/vehicleMileageService.ts
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { VehicleMileageType } from "../types/firestore/VehicleMileageType";

export const getVehicleMileage = async (): Promise<VehicleMileageType[]> => {
  const q = query(collection(db, COLLECTIONS.VEHICLE_MILEAGE), orderBy("sequence"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    name: doc.data().name,
    sequence: doc.data().sequence,
  }));
};
