import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"
import { Post } from "@/lib/types"

export async function UpdatePostById(
  id: string,
  data: Partial<Omit<Post, "id" | "createdAt">>
) {

  try {
    const docRef = doc(FirebaseDB, 'posts', id);
  
    const postUpdatedData: Partial<Omit<Post, "id" | "createdAt">> = {
      ...data,
      updatedAt: serverTimestamp() as Timestamp
    };
  
  
    await updateDoc(docRef, postUpdatedData);
  
    if (!doc) {
      return null
    }
  
        return {
            message: "Post created successfully",
            data: {
                id: docRef.id,
                ...data,
            },
            ok: true,
            error: null,
            status: 201,
        }
 } catch (error) {
    console.error("Error updating post:", error)

    return {
      message: "Error al actualizar el post",
      data: null,
      error: error instanceof Error ? error.message : String(error),
      status: 500
    }
  }
}