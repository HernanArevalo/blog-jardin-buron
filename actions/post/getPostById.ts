import {
  doc,
  getDoc,
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"
import { Post } from "@/lib/types"

export async function getPostById(id: string){
  try {
      const docRef = doc(FirebaseDB, "posts", id)
      const docSnap = await getDoc(docRef)
    
      if (!docSnap.exists()) {
        return null
      }
    
        return {
          message: "Post encontrado",
          data: {
            ...docSnap.data(),
          },
          error: null,
          status: 200
        }
    
 } catch (error) {
    console.error("Error fetching post by slug:", error)

    return {
      message: "Error al obtener el post",
      data: null,
      error: error instanceof Error ? error.message : String(error),
      status: 500
    }
  }
}