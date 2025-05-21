// import { db } from "@/src/config/configFirebase";
// import { COLLECTIONS } from "@/src/contants/firestore";
// import { CarsType } from "@/src/types/firestore/CarsType";
// import { ResponsePaginationType } from "@/src/types/firestore/ResponsePaginationType";
// import {
//   collection,
//   DocumentData,
//   getCountFromServer,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
// } from "firebase/firestore";

// let lastVisibleDocs: DocumentData[] = [];

// export const fetchCars = async (
//   page: number,
//   perPage: number
// ): Promise<ResponsePaginationType<CarsType>> => {
//   const colRef = collection(db, COLLECTIONS.CARS);
//   const countSnap = await getCountFromServer(colRef);
//   const total = countSnap.data().count;

//   let q = query(colRef, orderBy("dateTimeCreatedAt", "desc"), limit(perPage));

//   if (page > 1 && lastVisibleDocs[page - 2]) {
//     q = query(q, startAfter(lastVisibleDocs[page - 2]));
//   }

//   const snapshot = await getDocs(q);

//   lastVisibleDocs[page - 1] = snapshot.docs[snapshot.docs.length - 1];

//   const data = snapshot.docs.map((doc) => {
//     const dataWithoutId = (({ id, ...rest }) => rest)(doc.data() as CarsType);
//     return {
//       id: doc.id,
//       ...dataWithoutId,
//     };
//   });

//   return { data, total };
// };


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
