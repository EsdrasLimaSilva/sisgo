"use client";
import { useContext } from "react";
import styles from "@/app/styles/editor.module.scss";
import { EditorContext } from "@/contexts/EditorContext";
import EditorElement from "@/components/EditorElement";

export default function Editor() {
    const { posts } = useContext(EditorContext)!;

    return (
        <>
            <header>
                <h1 className="logo-admin">Sisgo</h1>
            </header>
            <main className={styles.container}>
                {posts.map((post) => (
                    <EditorElement
                        key={post.id}
                        id={post.id}
                        type={post.type}
                        content={post.content}
                    />
                ))}
            </main>
        </>
    );
}
