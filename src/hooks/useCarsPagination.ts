import { fetchCars } from "../services/cars/fetchCarsService";
import { CarsType } from "../types/firestore/CarsType";
import { usePagination } from "./usePagination";

export function useCarsPagination(perPage = 15) {
  return usePagination<CarsType>(fetchCars, perPage);
}
