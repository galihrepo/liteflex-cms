import { db } from "@/src/config/configFirebase";
import { COLLECTIONS } from "@/src/contants/firestore";
import { CarsType } from "@/src/types/firestore/CarsType";
import {
    collection,
    DocumentData,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";

// export const fetchCars = async (): Promise<CarsType[]> => {
//     const q = query(collection(db, COLLECTIONS.CARS));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map((doc) => ({
//       docId: doc.id,
//       ...(doc.data() as DocumentData as CarsType)
//     }));
//   };

//   import { db } from "@/src/config/configFirebase";
// import { COLLECTIONS } from "@/src/contants/firestore";
// import { CarsType } from "@/src/types/firestore/CarsType";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   limit,
//   startAfter,
//   getCountFromServer,
// } from "firebase/firestore";

// export interface CarsTypeWithId extends CarsType {
//   docId: string;
// }

let lastVisibleDocs: DocumentData[] = [];

export const fetchCars = async (
  page: number,
  perPage: number
): Promise<{ data: CarsType[]; total: number }> => {
  const colRef = collection(db, COLLECTIONS.CARS);
  const countSnap = await getCountFromServer(colRef);
  const total = countSnap.data().count;

  // Build base query
  let q = query(colRef, orderBy("dateTimeCreatedAt", "desc"), limit(perPage));

  // Paginate if page > 1
  if (page > 1 && lastVisibleDocs[page - 2]) {
    q = query(q, startAfter(lastVisibleDocs[page - 2]));
  }

  const snapshot = await getDocs(q);

  // Save last visible doc for next page
  lastVisibleDocs[page - 1] = snapshot.docs[snapshot.docs.length - 1];

  const data = snapshot.docs.map((doc) => {
    const dataWithoutId = (({ id, ...rest }) => rest)(doc.data() as CarsType); // exclude id from data
    return {
      id: doc.id,
      ...dataWithoutId,
    };
  });

  return { data, total };
};
