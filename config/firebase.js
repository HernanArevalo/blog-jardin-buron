import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "app-jardin-buron.firebaseapp.com",
  projectId: "app-jardin-buron",
  storageBucket: "app-jardin-buron.firebasestorage.app",
  messagingSenderId: "934272365646",
  appId: "1:934272365646:web:3df56f47987826a9cbff1f",
  measurementId: "G-WXYFWKCX51",
}

// evita doble init
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(app)
export const FirebaseDB = getFirestore(app)
export const FirebaseStorage = getStorage(app)

// analytics SOLO en cliente
let analytics = null

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app)
  })
}

export { analytics }