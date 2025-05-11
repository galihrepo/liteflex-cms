import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJseSb5hMywlcnDJoTF4kr6pWDNzu6i1U",
  authDomain: "flexlite-e8436.firebaseapp.com",
  projectId: "flexlite-e8436",
  storageBucket: "flexlite-e8436.firebasestorage.app",
  messagingSenderId: "646527104701",
  appId: "1:646527104701:web:15489a547e721ce743e9d4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
