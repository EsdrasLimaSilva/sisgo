"use client";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import styles from "@/app/styles/editor.module.scss";
import { EditorContext } from "@/contexts/EditorContext";
import EditorElement from "@/components/EditorElement";
import ImageElement from "@/components/ImageElement";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

    const [postState, setpostState] = useState({
        publishing: false,
    });

    const titleRef = useRef(null);
    const descRef = useRef(null);
    const tagsRef = useRef(null);
    const overlayRef = useRef(null);

    const router = useRouter();

    //handle the change on the meta inputs
    const handleChange = (e: ChangeEvent) => {
        const titleInput = titleRef.current as HTMLInputElement | null;
        const descInput = descRef.current as HTMLTextAreaElement | null;
        const tagsInput = tagsRef.current as HTMLInputElement | null;

        if (titleInput && descInput && tagsInput) {
            changeMetaInfo(titleInput.value, descInput.value, tagsInput.value);
        }
    };

    //tries to publish the post
    const publishPost = async () => {
        try {
            // (overlayRef.current! as HTMLDivElement).style.display = "";
            setpostState((prev) => ({ ...prev, publishing: true }));
            await fetch("/api/posts", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postEntity),
            });

            alert("Tudo certo!");
        } catch (err) {
            alert("Algo deu errado!");
        } finally {
            setpostState((prev) => ({
                ...prev,
                publishing: false,
            }));
        }
    };

    //push to dashboard if there is no post _id
    useEffect(() => {
        if (!postEntity._id) router.replace("/admin/dashboard");
    }, []);

    if (postEntity._id)
        return (
            <>
                <header>
                    <h1 className="logo-admin">Sisgo</h1>
                </header>
                <main className={styles.container}>
                    {postState.publishing && (
                        <div className={styles.overlay} ref={overlayRef}>
                            <div>
                                <h2>Publicando</h2>
                                <FaSpinner />
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        className={styles.publishButton}
                        onClick={publishPost}
                    >
                        publicar
                    </button>

                    <h2>Post</h2>
                    <div className={styles.metaInfoContainer}>
                        <input
                            ref={titleRef}
                            type="text"
                            placeholder="título"
                            required
                            value={postEntity.title}
                            onChange={handleChange}
                            spellCheck={false}
                        />
                        <textarea
                            ref={descRef}
                            placeholder="meta descrição"
                            rows={8}
                            required
                            value={postEntity.metadescription}
                            onChange={handleChange}
                            spellCheck={false}
                        />
                        <input
                            ref={tagsRef}
                            type="text"
                            placeholder="tags separadas por vírgula"
                            required
                            value={postEntity.tags}
                            onChange={handleChange}
                            spellCheck={false}
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
                            adicionar elemento
                        </button>
                        <button
                            type="button"
                            className={styles.addButton}
                            onClick={() => pushElement("img")}
                        >
                            adicionar imagem
                        </button>
                    </div>
                </main>
            </>
        );

    return <h1></h1>;
}
