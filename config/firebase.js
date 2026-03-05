// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "app-jardin-buron.firebaseapp.com",
  projectId: "app-jardin-buron",
  storageBucket: "app-jardin-buron.firebasestorage.app",
  messagingSenderId: "934272365646",
  appId: "1:934272365646:web:3df56f47987826a9cbff1f",
  measurementId: "G-WXYFWKCX51"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)

let analytics

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(FirebaseApp)
    }
  })
}