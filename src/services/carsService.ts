import { User } from "@firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/configFirebase";
import { COLLECTIONS } from "../contants/firestore";
import { CarForm } from "../schemas/carSchema";
import { ResponseType } from "../types/firestore/ResponseType";

const createDocRef = (path: string, id: string) => doc(db, path, id);

const buildPayload = (form: CarForm, firestoreDocIdDealers: string, user: User | null) => {
  const cleanedPictureUrls =
    form.pictureUrls?.filter((url) => url !== "") || [];

  return {
    brandsId: createDocRef(COLLECTIONS.BRANDS, form.brands.value),
    brandsValue: form.brands.label,

    modelsId: createDocRef(COLLECTIONS.MODELS, form.models.value),
    modelsValue: form.models.label,

    variantsId: createDocRef(COLLECTIONS.VARIANTS, form.variants.value),
    variantsValue: form.variants.label,

    fuelId: createDocRef(COLLECTIONS.FUEL, form.fuel.value),
    fuelValue: form.fuel.label,

    transmissionId: createDocRef(
      COLLECTIONS.TRANSMISSION,
      form.transmission.value
    ),
    transmissionValue: form.transmission.label,

    vehicleColorsId: createDocRef(
      COLLECTIONS.VEHICLE_COLORS,
      form.vehicleColors.value
    ),
    vehicleColorsValue: form.vehicleColors.label,

    vehicleMileageId: createDocRef(
      COLLECTIONS.VEHICLE_MILEAGE,
      form.vehicleMilage.value
    ),
    vehicleMilageValue: form.vehicleMilage.label,

    pictureUrls: cleanedPictureUrls,
    videoUrl: form.videoUrl || "",

    plateNumber: form.plateNumber || "",
    price: Number(form.price || 0),
    priceReduced: 0,

    dealersId: createDocRef(COLLECTIONS.DEALERS, firestoreDocIdDealers),

    // hardcode `vStatusAvailable` due to default is `Tersedia` and don't edit anything in firestore `vehicleStatus`
    vehicleStatusId: createDocRef(
      COLLECTIONS.VEHICLE_STATUS,
      "vStatusAvailable"
    ),
    vehicleStatusValue: "Tersedia",

    isActive: false,

    dateTimeCreatedAt: serverTimestamp(),
    dateTimeCreatedBy: user?.email,
    dateTimeUpdatedAt: serverTimestamp(),
    dateTimeUpdatedBy: "",
  };
};

const checkPlateNumberExists = async (
  plateNumber: string,
  firestoreDocIdDealers: string
): Promise<boolean> => {
  const carsRef = collection(db, COLLECTIONS.CARS);
  const dealerIdRef = createDocRef(COLLECTIONS.DEALERS, firestoreDocIdDealers);
  const q = query(
    carsRef,
    where("plateNumber", "==", plateNumber.trim()),
    where("dealersId", "==", dealerIdRef)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

export const saveCars = async (
  form: CarForm,
  firestoreDocIdDealers: string,
  user: User | null,
): Promise<ResponseType> => {
  try {
    if (await checkPlateNumberExists(form.plateNumber, firestoreDocIdDealers)) {
      return {
        success: false,
        message: `Kendaraan dengan nomor plat "${form.plateNumber}" sudah terdaftar.`,
      };
    }

    const payload = buildPayload(form, firestoreDocIdDealers, user);
    const carRef = doc(collection(db, COLLECTIONS.CARS));
    await setDoc(carRef, payload);

    return { success: true, message: "Berhasil simpan data." };
  } catch (error: any) {
    return { success: false, message: error.message || "Gagal simpan data." };
  }
};
