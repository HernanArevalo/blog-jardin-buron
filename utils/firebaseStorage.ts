import { deleteObject, ref } from "firebase/storage"
import { FirebaseStorage } from "@/config/firebase"

function getStoragePathFromUrl(url: string): string | null {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)

    const objectPathMatch = parsedUrl.pathname.match(/\/o\/(.+)$/)

    if (!objectPathMatch) {
      return null
    }

    return decodeURIComponent(objectPathMatch[1])
  } catch {
    return null
  }
}

export async function deleteFileByUrl(url: string): Promise<void> {
  const path = getStoragePathFromUrl(url)

  if (!path) {
    return
  }

  try {
    const fileRef = ref(FirebaseStorage, path)
    await deleteObject(fileRef)
  } catch (error) {
    console.warn("No se pudo borrar el archivo en Firebase Storage:", error)
  }
}

export async function deleteFilesByUrls(urls: string[]): Promise<void> {
  await Promise.all(urls.map((url) => deleteFileByUrl(url)))
}
