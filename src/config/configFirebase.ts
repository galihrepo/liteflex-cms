import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJseSb5hMywlcnDJoTF4kr6pWDNzu6i1U",
  authDomain: "flexlite-e8436.firebaseapp.com",
  projectId: "flexlite-e8436",
  storageBucket: "flexlite-e8436.firebasestorage.app",
  messagingSenderId: "646527104701",
  appId: "1:646527104701:web:15489a547e721ce743e9d4",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// import { getApp, getApps, initializeApp } from "@firebase/app";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDJseSb5hMywlcnDJoTF4kr6pWDNzu6i1U",
//   authDomain: "flexlite-e8436.firebaseapp.com",
//   projectId: "flexlite-e8436",
//   storageBucket: "flexlite-e8436.firebasestorage.app",
//   messagingSenderId: "646527104701",
//   appId: "1:646527104701:web:15489a547e721ce743e9d4",
// };

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// // export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });