// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0j2UwJKlSqN9nCh1BFKTOEMPFGh9dx_A",
  authDomain: "bookreading-2b85b.firebaseapp.com",
  projectId: "bookreading-2b85b",
  storageBucket: "bookreading-2b85b.appspot.com",
  messagingSenderId: "540650228297",
  appId: "1:540650228297:web:0b0b71074fe94214fb4d98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
