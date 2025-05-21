import { DocumentReference, Timestamp } from "firebase/firestore";
import { PaginationType } from "./PaginationType";

export interface CarsType extends PaginationType {
  brandsId: DocumentReference; // /brands/mitsubishi (reference)
  brandsValue: string; // "Mitsubishi"

  dateTimeCreatedAt: Timestamp; // Firestore timestamp
  dateTimeCreatedBy: string; // "galihadityo@gmail.com"

  dateTimeUpdatedAt: Timestamp; // Firestore timestamp
  dateTimeUpdatedBy: string; // ""

  dealersId: DocumentReference; // /dealers/demodealers (reference)

  fuelId: DocumentReference; // /fuel/z1l8c6B8ypIksYXMIpkD (reference)
  fuelValue: string; // "Bensin"

  isActive: boolean; // false

  modelsId: DocumentReference; // /models/niOR44fKy84PNaxGizAL (reference)
  modelsValue: string; // "Pajero"

  pictureUrls: string[]; // array of picture URLs

  plateNumber: string; // "D9889BH"

  price: number; // 197000000
  priceReduced: number; // 0

  transmissionId: DocumentReference; // /transmission/t822Uo6guAXCImVGgp61 (reference)
  transmissionValue: string; // "Automatic"

  variantsId: DocumentReference; // /variants/XfeXJXhOUkOcWtDXLNz7 (reference)
  variantsValue: string; // "Sport"

  vehicleColorsId: DocumentReference; // /vehicleColors/7eANom6vxljQpv1p7yOd (reference)
  vehicleColorsValue: string; // "Hitam"

  vehicleMilageValue: string; // "< 20rb kilometer"
  vehicleMileageId: DocumentReference; // /vehicleMileage/2 (reference)

  vehicleStatusId: DocumentReference; // /vehicleStatus/vStatusAvailable (reference)
  vehicleStatusValue: string; // "Tersedia"

  videoUrl: string; // ""
  year: number; // 2021
}
