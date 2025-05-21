import { COLLECTIONS } from "@/src/contants/firestore";
import { CarsType } from "@/src/types/firestore/CarsType";
import { fetchService } from "../fetchService";

export function fetchCars(
  page: number,
  perPage: number,
) {
  return fetchService<CarsType>(page, perPage, COLLECTIONS.CARS, {
    orderByField: "dateTimeCreatedAt",
    orderDirection: "desc"
  });
}
