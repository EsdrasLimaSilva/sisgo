"use client";
import { useContext } from "react";
import styles from "@/app/styles/editor.module.scss";
import { EditorContext } from "@/contexts/EditorContext";
import EditorElement from "@/components/EditorElement";
import ImageElement from "@/components/ImageElement";

export default function Editor() {
    const {
        postEntity,
        changeContent,
        changeType,
        changeImageFields,
        pushElement,
    } = useContext(EditorContext)!;

    return (
        <>
            <header>
                <h1 className="logo-admin">Sisgo</h1>
            </header>
            <main className={styles.container}>
                {postEntity.entities.map((entity) => {
                    if (entity.type == "img")
                        return (
                            <ImageElement
                                key={entity.id}
                                id={entity.id}
                                url={entity.fields!.url}
                                alt={entity.fields!.alt}
                                changeImageFields={changeImageFields}
                            />
                        );

                    return (
                        <EditorElement
                            key={entity.id}
                            id={entity.id}
                            type={entity.type}
                            content={entity.content}
                            changeContent={changeContent}
                            changeType={changeType}
                        />
                    );
                })}

                <div className={styles.addContainer}>
                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={() => pushElement("p")}
                    >
                        add element
                    </button>
                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={() => pushElement("img")}
                    >
                        add image
                    </button>
                </div>
            </main>
        </>
    );
}
