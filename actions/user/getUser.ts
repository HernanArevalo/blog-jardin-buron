import {
  collection,

  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"

export async function getUser(email: string) {
  try {
    const emailNormalized = email.trim().toLowerCase()

    const usersCollection = collection(FirebaseDB, "users")

    const q = query(
      usersCollection,
      where("email", "==", emailNormalized),
      limit(1)
    )

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return {
        message: "User no encontrado",
        data: null,
        ok: false,
        error: "user not found",
        status: 404
      }
    }

    const doc = snapshot.docs[0]

    return {
      message: "User encontrado",
      data: {
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      password: doc.data().password
      },
      ok: true,
      error: null,
      status: 200
    }

  } catch (error) {
    console.error("Error fetching user by email:", error)

    return {
      message: "Error al obtener el user",
      data: null,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      status: 500
    }
  }
}