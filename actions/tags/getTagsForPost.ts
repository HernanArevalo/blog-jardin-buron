import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"
import { Post, Tag } from "@/lib/types"

export async function getTagsForPost(post: Post): Promise<Tag[]> {
  if (!post.tags.length) return []

  const tagsCollection = collection(FirebaseDB, "tags")

  const q = query(
    tagsCollection,
    where(documentId(), "in", post.tags)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tag[]
}