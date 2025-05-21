import { DocumentSnapshot } from "firebase/firestore";

export interface ResponsePaginationType<T> {
    data: T[];
    total: number;
    lastVisibleDoc?: DocumentSnapshot;
    error?: string;
  }