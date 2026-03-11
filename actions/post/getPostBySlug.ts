import { collection, query, where, getDocs, limit } from "firebase/firestore"
import type { Post } from "@/lib/types"
import { FirebaseDB } from "@/config/firebase"

export async function getPostBySlug(slug: string) {
  try {
    const postsCollection = collection(FirebaseDB, "posts")

    const q = query(
      postsCollection,
      where("slug", "==", slug),
      limit(1)
    )

    const snapshot = await getDocs(q)

    console.log(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    if (snapshot.empty) {
      return {
        message: "Post no encontrado",
        data: null,
        error: null,
        status: 404
      }
    }

    const doc = snapshot.docs[0]

    const post: Post = {
      id: doc.id,
      ...(doc.data() as Omit<Post, "id">),
    }

    return {
      message: "Post encontrado",
      data: post,
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