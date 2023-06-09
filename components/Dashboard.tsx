"use client";

import styles from "@/app/styles/dashboard.module.scss";
import { EditorContext, PostEntity } from "@/contexts/EditorContext";
import DashPost from "./DashPost";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard({ posts }: { posts: PostEntity[] }) {
    const { createPost, editPost } = useContext(EditorContext)!;
    const router = useRouter();

    const handleCreatePost = async () => {
        try {
            const response = await fetch("/api/posts", {
                method: "POST",
            });

            const post = await response.json();

            createPost(post.insertedId);
            router.push("/admin/editor");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.dashboard}>
            <form>
                <input
                    type="search"
                    placeholder="pesquise por um post"
                    className={styles.input}
                />
            </form>
            {
                <ul className={styles.postList}>
                    {posts.map((post) => (
                        <DashPost
                            key={post._id}
                            post={post}
                            editPost={editPost}
                        />
                    ))}
                </ul>
            }

            <button
                type="button"
                className={styles.criarPostBtn}
                onClick={handleCreatePost}
            >
                criar post
            </button>
        </div>
    );
}
