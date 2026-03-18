"use server"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
 import { revalidatePath } from "next/cache"
import { FirebaseDB } from "@/config/firebase"
import { deleteFilesByUrls } from "@/utils/firebaseStorage"
import { Post } from "@/lib/types"
 
 export async function deletePostById(id: string) {
   try {
     const docRef = doc(FirebaseDB, "posts", id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
      return null
    }

    const post = snapshot.data() as Post

     await deleteDoc(docRef)
 
    await deleteFilesByUrls([
      ...(post.mainImage ? [post.mainImage] : []),
      ...(post.galleryImages || []),
    ])

     revalidatePath("/admin")
     revalidatePath("/")
     revalidatePath("/publicaciones")

     return {
       ok: true,
       message: "Post borrado",
       data: { id },
       error: null,
      status: 200,
     }
   } catch (error) {
     console.error("Error deleting post:", error)
 
     return {
       ok: false,
      message: "Error al borrar el post",
       data: null,
       error: error instanceof Error ? error.message : String(error),
      status: 500,
     }
   }
}
