 import {

   doc,
  getDoc,
   serverTimestamp,
  updateDoc,
 } from "firebase/firestore"
import { revalidatePath } from "next/cache"
 import { FirebaseDB } from "@/config/firebase"
 import { Post } from "@/lib/types"
import { deleteFilesByUrls } from "@/utils/firebaseStorage"
 
 export async function UpdatePostById(
   id: string,
   data: Partial<Omit<Post, "id" | "createdAt">>
 ) {
   try {

    const docRef = doc(FirebaseDB, "posts", id)
    const previousSnapshot = await getDoc(docRef)

    if (!previousSnapshot.exists()) {
      return null
    }

    const previousPost = previousSnapshot.data() as Post

     const postUpdatedData: Partial<Omit<Post, "id" | "createdAt">> = {
       ...data,
      updatedAt: serverTimestamp() as Post["updatedAt"],
    }

    await updateDoc(docRef, postUpdatedData)

    const removedGalleryImages = (previousPost.galleryImages || []).filter(
      (oldUrl) => !(data.galleryImages || previousPost.galleryImages || []).includes(oldUrl)
    )

    const mainImageWasReplaced =
      Boolean(previousPost.mainImage) &&
      typeof data.mainImage === "string" &&
      data.mainImage !== previousPost.mainImage

    await deleteFilesByUrls([
      ...(mainImageWasReplaced && previousPost.mainImage ? [previousPost.mainImage] : []),
      ...removedGalleryImages,
    ])

    revalidatePath("/admin")
    revalidatePath("/")
    revalidatePath("/publicaciones")

    return {
      message: "Post actualizado correctamente",
      data: {
        ...previousPost,
        ...data,
        id: docRef.id,
      },
      ok: true,
      error: null,
      status: 200,
     }
  } catch (error) {
     console.error("Error updating post:", error)
 
     return {
       message: "Error al actualizar el post",
       data: null,
       error: error instanceof Error ? error.message : String(error),
      ok: false,
      status: 500,
     }
   }
}
