import { DocumentReference } from "firebase/firestore";

export interface ModelsType {
    docId: string;
    brandsId: DocumentReference;
    variant: string;
  }
  