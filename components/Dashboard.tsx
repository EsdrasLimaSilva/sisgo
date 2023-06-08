"use client";

import styles from "@/app/styles/dashboard.module.scss";
import { PostEntity } from "@/contexts/EditorContext";
import DashPost from "./DashPost";

export default function Dashboard({ posts }: { posts: PostEntity[] }) {
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
                            title={post.title}
                            id={post._id}
                        />
                    ))}
                </ul>
            }

            <button type="button" className={styles.criarPostBtn}>
                criar post
            </button>
        </div>
    );
}
