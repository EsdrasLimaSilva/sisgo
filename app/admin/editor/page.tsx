"use client";
import { useState } from "react";
import styles from "@/app/styles/editor.module.scss";
import EditorElement from "@/components/EditorElement";

export interface Post {
    type: string;
    content: string;
}

export default function Editor() {
    const [editorState, setEditorState] = useState<Post[]>([
        {
            type: "h1",
            content: "Hello World",
        },

        {
            type: "h2",
            content: "Hello World",
        },
    ]);

    return (
        <>
            <header>
                <h1 className="logo-admin">Sisgo</h1>
            </header>
            <main className={styles.container}>
                {editorState.map((i: Post) => (
                    <EditorElement
                        key={Math.random() % 100}
                        type={i.type}
                        content={i.content}
                    />
                ))}
            </main>
        </>
    );
}
