import {
    doc,
    getDoc,
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"
import { Post, Tag } from "@/lib/types"

export async function getTagById(tagId: string): Promise<Tag | undefined> {
  const tagRef = doc(FirebaseDB, "tags", tagId)

  const snapshot = await getDoc(tagRef)

  if (!snapshot.exists()) {
    return undefined
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Tag
}