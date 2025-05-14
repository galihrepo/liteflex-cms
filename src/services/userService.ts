import { User } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from '../config/configFirebase';
import { COLLECTIONS } from '../contants/firestore';
import { BaseConfigType } from "../types/config/BaseConfigType";

interface UserProps {
  user: User;
  config: BaseConfigType;
  onRegistered: () => void;
  onUnregistered: () => void;
}

export const saveUser = async (props: UserProps) => {
  const { user, config, onRegistered, onUnregistered } = props;

  if (!user) return;

  try {
    const firestoreDocIdDealers = config?.firestoreDocIdDealers;

    const collectionEmployee = collection(db, COLLECTIONS.EMPLOYEE);

    const dealersId = doc(db, COLLECTIONS.DEALERS, firestoreDocIdDealers);

    const queryEmployee = query(
      collectionEmployee, 
      where('dealersId', '==', dealersId), 
      where('email', '==', user.email || '')
    );

    const snapshot = await getDocs(queryEmployee);
    if (!snapshot.empty) {
      // registered
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, {
        name: user.displayName || '',
        pictureUrl: user.photoURL || '',
      })
      onRegistered()
    } else {
      // unregister
      onUnregistered()
    }    
  } catch (e) {
    console.error(e);
    onUnregistered()
  }
  
};