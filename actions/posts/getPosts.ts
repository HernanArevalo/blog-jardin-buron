import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore/lite"
import { FirebaseDB } from "@/config/firebase"
import { Post } from "@/lib/types"

export async function getPosts(): Promise<Post[]> {
  const postsCollection = collection(FirebaseDB, "posts")

  const q = query(
    postsCollection,
    orderBy("createdAt", "desc")
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[]
}