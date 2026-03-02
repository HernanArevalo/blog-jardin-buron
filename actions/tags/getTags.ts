import {
  collection,
  getDocs,
  query,
} from "firebase/firestore/lite"
import { FirebaseDB } from "@/config/firebase"
import { Tag } from "@/lib/types"

export async function getTags(): Promise<Tag[]> {
  const tagsCollection = collection(FirebaseDB, "tags")

  const q = query(
    tagsCollection,
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tag[]
}