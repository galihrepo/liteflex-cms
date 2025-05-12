import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
