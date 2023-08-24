import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase"



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

