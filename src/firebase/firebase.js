import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log(process.env.REACT_APP_FIREBASE);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "cv-builder-2868b.firebaseapp.com",
  projectId: "cv-builder-2868b",
  storageBucket: "cv-builder-2868b.appspot.com",
  messagingSenderId: "858754241385",
  appId: "1:858754241385:web:be6e9492a30165d6ce23f8",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
