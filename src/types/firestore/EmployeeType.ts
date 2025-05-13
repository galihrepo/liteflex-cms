import { DocumentReference } from "firebase/firestore";

export interface EmployeeType {
    dealersId: DocumentReference;
    email: string;
    name: string;
    phone: string;
    pictureUrl: string;
}