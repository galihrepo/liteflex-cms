import { db } from "@/src/config/configFirebase";
import { COLLECTIONS } from "@/src/contants/firestore";
import { CarsType } from "@/src/types/firestore/CarsType";
import { doc, getDoc } from "firebase/firestore";

export const getCarsById = async (carId: string): Promise<CarsType | null> => {
  const docRef = doc(db, COLLECTIONS.CARS, carId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as CarsType;
  } else {
    return null;
  }
};
