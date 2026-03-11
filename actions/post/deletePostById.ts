"use server"
import {
  deleteDoc,
  doc,
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"
import { revalidatePath } from "next/cache"

export async function deletePostById(id: string) {
  try {
    const docRef = doc(FirebaseDB, "posts", id)
    await deleteDoc(docRef)

    revalidatePath("/admin")
    revalidatePath("/")
    revalidatePath("/publicaciones")
    return {
      ok: true,
      message: "Post borrado",
      data: { id },
      error: null,
      status: 200
    }

  } catch (error) {
    console.error("Error deleting post:", error)

    return {
      ok: false,
      message: "Error al obtener el post",
      data: null,
      error: error instanceof Error ? error.message : String(error),
      status: 500
    }
  }
}