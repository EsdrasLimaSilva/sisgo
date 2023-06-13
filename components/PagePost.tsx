import { PostEntity } from "@/contexts/EditorContext";
import { createElement } from "react";
import styles from "@/app/styles/postPage.module.scss";
import Link from "next/link";

export default function PagePost({ post }: { post: PostEntity }) {
    return (
        <>
            <header className={styles.header}>
                <Link href="/">Sisgo</Link>
            </header>
            <main className={styles.container}>
                {post.entities.map((entity) => {
                    if (entity.type === "img") {
                        const element = createElement(entity.type, {
                            src: entity.fields!.url,
                            alt: entity.fields!.alt,
                        });
                        return element;
                    }

                    const element = createElement(
                        entity.type,
                        {},
                        entity.content
                    );
                    return element;
                })}
            </main>
        </>
    );
}
