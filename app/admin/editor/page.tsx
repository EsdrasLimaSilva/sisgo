"use client";
import { useContext } from "react";
import styles from "@/app/styles/editor.module.scss";
import { EditorContext } from "@/contexts/EditorContext";
import EditorElement from "@/components/EditorElement";

export default function Editor() {
    const { entities } = useContext(EditorContext)!;

    return (
        <>
            <header>
                <h1 className="logo-admin">Sisgo</h1>
            </header>
            <main className={styles.container}>
                {entities.map((entity) => (
                    <EditorElement
                        key={entity.id}
                        id={entity.id}
                        type={entity.type}
                        content={entity.content}
                    />
                ))}
            </main>
        </>
    );
}
