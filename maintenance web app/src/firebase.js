// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCui1PjJfcAHt1m5AQypHd0BiKBtBtAmbg",
  authDomain: "apartment-maintenance-web-app.firebaseapp.com",
  projectId: "apartment-maintenance-web-app",
  storageBucket: "apartment-maintenance-web-app.firebasestorage.app",
  messagingSenderId: "222120891208",
  appId: "1:222120891208:web:5c6604f334c1146d22997d",
  measurementId: "G-FXCYVFEX0W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();