import Constants from 'expo-constants';
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/configFirebase";

export const saveUser = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, "employee", user.uid || '');
  const existingDoc = await getDoc(userRef);

  if (!existingDoc.exists()) {
    const userData = {
        dealersId: `/dealers/${Constants.expoConfig?.extra?.dealer}`,
        email: user.email || "",
        name: user.displayName || "",
        phone: user.phoneNumber || "",
    };

    await setDoc(userRef, userData);    
  }
};