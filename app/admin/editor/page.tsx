"use client";
import { ChangeEvent, useContext, useRef } from "react";
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
        changeMetaInfo,
        popElement,
    } = useContext(EditorContext)!;

    const titleRef = useRef(null);
    const descRef = useRef(null);
    const tagsRef = useRef(null);

    const handleChange = (e: ChangeEvent) => {
        const titleInput = titleRef.current as HTMLInputElement | null;
        const descInput = descRef.current as HTMLTextAreaElement | null;
        const tagsInput = tagsRef.current as HTMLInputElement | null;

        console.log(postEntity.tags);

        if (titleInput && descInput && tagsInput) {
            changeMetaInfo(titleInput.value, descInput.value, tagsInput.value);
        }
    };

    return (
        <>
            <header>
                <h1 className="logo-admin">Sisgo</h1>
            </header>
            <main className={styles.container}>
                <h2>Post</h2>
                <div className={styles.metaInfoContainer}>
                    <input
                        ref={titleRef}
                        type="text"
                        placeholder="título"
                        required
                        value={postEntity.title}
                        onChange={handleChange}
                    />
                    <textarea
                        ref={descRef}
                        placeholder="meta descrição"
                        rows={8}
                        required
                        value={postEntity.metadescription}
                        onChange={handleChange}
                    />
                    <input
                        ref={tagsRef}
                        type="text"
                        placeholder="tags separadas por vírgula"
                        required
                        value={postEntity.tags}
                        onChange={handleChange}
                    />
                </div>

                {postEntity.entities.map((entity) => {
                    if (entity.type == "img")
                        return (
                            <ImageElement
                                key={entity.id}
                                id={entity.id}
                                url={entity.fields!.url}
                                alt={entity.fields!.alt}
                                changeImageFields={changeImageFields}
                                popElement={popElement}
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
                            popElement={popElement}
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
