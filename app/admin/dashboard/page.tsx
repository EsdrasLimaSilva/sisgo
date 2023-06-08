"use client";

import styles from "@/app/styles/dashboard.module.scss";
import Dashboard from "@/components/Dashboard";
import { PostEntity } from "@/contexts/EditorContext";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [posts, setPosts] = useState<PostEntity[]>([]);

    const getPosts = async () => {
        const response = await fetch("/api/posts", {
            method: "GET",
        });
        const posts: PostEntity[] = await response.json();
        setPosts(posts);
    };

    useEffect(() => {
        getPosts();
    }, []);

    if (posts) {
        return (
            <main className={styles.container}>
                <h1>
                    Sisgo <sub>admin</sub>
                </h1>
                <Dashboard posts={posts} />
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <h1>
                Sisgo <sub>admin</sub>
            </h1>
            <p>Requisitando posts...</p>
        </main>
    );
}
