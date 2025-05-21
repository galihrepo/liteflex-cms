import { db } from "@/src/config/configFirebase";
import {
  collection,
  DocumentData,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  QuerySnapshot,
  startAfter,
} from "firebase/firestore";

import { ResponsePaginationType } from "../types/firestore/ResponsePaginationType";

export interface OrderByOptions {
  orderByField?: string;
  orderDirection?: OrderByDirection; // "asc" | "desc"
}

export async function fetchService<T>(
  page: number,
  perPage: number,
  collectionName: string,
  customOrderBy?: OrderByOptions
): Promise<ResponsePaginationType<T>> {
  try {
    const colRef = collection(db, collectionName);
    const countSnap = await getCountFromServer(colRef);
    const total = countSnap.data().count;

    const orderField = customOrderBy?.orderByField ?? "dateTimeCreatedAt";
    const orderDir = customOrderBy?.orderDirection ?? "desc";

    let q = query(colRef, orderBy(orderField, orderDir), limit(perPage));

    // Step forward pages by chaining startAfter for each previous page
    if (page > 1) {
      let cursor: DocumentData | undefined;
      let skip = (page - 1) * perPage;
      let tempQ = query(colRef, orderBy(orderField, orderDir), limit(skip));
      const snap = await getDocs(tempQ);
      const docs = snap.docs;

      if (docs.length > 0) {
        cursor = docs[docs.length - 1];
        q = query(
          colRef,
          orderBy(orderField, orderDir),
          startAfter(cursor),
          limit(perPage)
        );
      }
    }

    const snapshot: QuerySnapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => {
      const { id, ...rest } = doc.data() as T & { id?: string };
      return { id: doc.id, ...rest } as T;
    });

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("fetchService error:", error);
    return {
      data: [],
      total: 0,
      error: (error as Error).message,
    };
  }
}

// import { db } from "@/src/config/configFirebase";
// import {
//     collection,
//     DocumentSnapshot,
//     getCountFromServer,
//     getDocs,
//     limit,
//     orderBy,
//     OrderByDirection,
//     query,
//     QuerySnapshot,
//     startAfter,
// } from "firebase/firestore";

// import { ResponsePaginationType } from "../types/firestore/ResponsePaginationType";

// export interface OrderByOptions {
//   orderByField?: string;
//   orderDirection?: OrderByDirection; // "asc" | "desc"
// }

// export async function fetchService<T>(
//   collectionName: string,
//   perPage: number,
//   lastVisibleDoc?: DocumentSnapshot,
//   customOrderBy?: OrderByOptions
// ): Promise<ResponsePaginationType<T>> {
//   try {
//     const colRef = collection(db, collectionName);
//     const countSnap = await getCountFromServer(colRef);
//     const total = countSnap.data().count;

//     const orderField = customOrderBy?.orderByField ?? "";
//     const orderDir = customOrderBy?.orderDirection ?? "desc";

//     let q = query(colRef, orderBy(orderField, orderDir), limit(perPage));

//     if (lastVisibleDoc) {
//       q = query(
//         colRef,
//         orderBy(orderField, orderDir),
//         startAfter(lastVisibleDoc),
//         limit(perPage)
//       );
//     }

//     const snapshot: QuerySnapshot = await getDocs(q);

//     const data = snapshot.docs.map((doc) => {
//       const { id, ...rest } = doc.data() as T & { id?: string };
//       return { id: doc.id, ...rest } as T;
//     });

//     const lastVisible = snapshot.docs[snapshot.docs.length - 1];

//     return {
//       data,
//       total,
//       lastVisibleDoc: lastVisible,
//     };
//   } catch (error) {
//     console.error("fetchService error:", error);
//     return {
//       data: [],
//       total: 0,
//       lastVisibleDoc: undefined,
//       error: (error as Error).message,
//     };
//   }
// }
