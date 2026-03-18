import {
  doc,
  getDoc,
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"

export async function getUser(email: string){
  try {
      const emailNormalized = email.trim().toLowerCase()
      const docRef = doc(FirebaseDB, "users", emailNormalized)
      const docSnap = await getDoc(docRef)
    
      if (!docSnap.exists()) {
        return null
      }
    
        return {
          message: "User encontrado",
          data: {
            ...docSnap.data(),
          },
          ok: true,
          error: null,
          status: 200
        }
    
 } catch (error) {
    console.error("Error fetching user by email:", error)

    return {
      message: "Error al obtener el user",
      data: null,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      status: 500
    }
  }
}