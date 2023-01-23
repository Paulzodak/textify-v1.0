// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4R6mTM25swXfEEhd4DDO2KVVbn2jO2Bo",
  authDomain: "textify-10f37.firebaseapp.com",
  projectId: "textify-10f37",
  storageBucket: "textify-10f37.appspot.com",
  messagingSenderId: "366524200401",
  appId: "1:366524200401:web:528cf99fc57af168d01cf0",
  measurementId: "G-MR3H31NPT1",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
