import { DocumentReference } from "firebase/firestore";

export interface VariantsType {
    docId: string;
    modelsId: DocumentReference;
    name: string;
  }
  