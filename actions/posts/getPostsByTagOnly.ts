import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"
import { Post } from "@/lib/types"

export async function getPostsByTagOnly(tagId: string): Promise<Post[]> {
  const postsCollection = collection(FirebaseDB, "posts")

  const q = query(
    postsCollection,
    where("status", "==", "published"),
    where("tags", "array-contains-any", [tagId]),
    orderBy("createdAt", "desc")
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[]
}