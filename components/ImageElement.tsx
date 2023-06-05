"use client";

import styles from "@/app/styles/editor.module.scss";
import { ChangeEvent, use, useRef } from "react";

interface Props {
    id: string;
    url: string;
    alt: string;
    changeImageFields: (id: string, newUrl: string, newAlt: string) => void;
}

export default function ImageElement({
    id,
    url,
    alt,
    changeImageFields,
}: Props) {
    const urlRef = useRef(null);
    const altRef = useRef(null);

    const handleChange = (e: ChangeEvent) => {
        const inputUrl = urlRef.current! as HTMLInputElement;
        const inputAlt = altRef.current! as HTMLInputElement;

        changeImageFields(id, inputUrl.value, inputAlt.value);
    };

    return (
        <div className={styles.imageElement}>
            <header>
                <button type="button">x</button>
            </header>

            <img src={url} alt={alt} />
            <input
                ref={urlRef}
                type="text"
                placeholder="url"
                value={url}
                onChange={handleChange}
            />
            <input
                ref={altRef}
                type="text"
                placeholder="texto alternativo"
                value={alt}
                onChange={handleChange}
            />
        </div>
    );
}
