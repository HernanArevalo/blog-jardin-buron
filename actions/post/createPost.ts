import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore"
import { FirebaseDB } from "@/config/firebase"
import { CreatePostInput } from "@/lib/types"
import { ok } from "assert"
import { generateSlug } from "@/utils/generateSlug"
import { revalidatePath } from "next/cache"

export async function createPost(data: CreatePostInput) {
    try {
        const post = {
            ...data,
            slug: data.slug || generateSlug(data.title),
            galleryImages: data.galleryImages ?? [],
            tags: data.tags ?? [],
            featured: data.featured ?? false,
            status: data.status ?? "draft",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }

        const postsCollection = collection(FirebaseDB, "posts")
        const docRef = await addDoc(postsCollection, post);

        await updateDoc(docRef, {
            id: docRef.id
        })

        revalidatePath("/admin")
        revalidatePath("/")
        revalidatePath("/publicaciones")

        return {
            message: "Post created successfully",
            data: {
                id: docRef.id,
                ...post,
            },
            ok: true,
            error: null,
            status: 201,
        }

    } catch (error) {
        console.error("Error creating post:", error)

        return {
            message: "Failed to create post",
            data: null,
            error: error instanceof Error ? error.message : String(error),
            ok: false,
            status: 500,
        }
    }
}