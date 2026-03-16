import { initializeApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
 

 const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
   authDomain: "app-jardin-buron.firebaseapp.com",
   projectId: "app-jardin-buron",
   storageBucket: "app-jardin-buron.firebasestorage.app",
   messagingSenderId: "934272365646",
   appId: "1:934272365646:web:3df56f47987826a9cbff1f",

  measurementId: "G-WXYFWKCX51",
}
 
 const FirebaseApp = initializeApp(firebaseConfig)
 
 export const FirebaseAuth = getAuth(FirebaseApp)
 export const FirebaseDB = getFirestore(FirebaseApp)
export const FirebaseStorage = getStorage(FirebaseApp)
 
 let analytics
 
 if (typeof window !== "undefined") {
   isSupported().then((yes) => {
     if (yes) {
       analytics = getAnalytics(FirebaseApp)
     }
   })
}
