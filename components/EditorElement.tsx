"use client";

import { Entity } from "@/contexts/EditorContext";
import styles from "@/app/styles/editor.module.scss";
import { ChangeEvent, memo, useCallback, useEffect, useRef } from "react";

const EditorElement = ({ id, type, content }: Entity) => {
    const inputRef = useRef(null);

    const resize = useCallback(() => {
        if (inputRef.current) {
            const area = inputRef.current as HTMLTextAreaElement;
            area.style.height = `${area.scrollHeight}px`;
        }
    }, []);

    useEffect(() => {
        resize();
    }, []);

    const handleChange = (e: ChangeEvent) => {
        resize();
    };

    return (
        <textarea
            ref={inputRef}
            key={Math.random() % 100}
            defaultValue={content}
            spellCheck={false}
            className={styles[`input-${type}`]}
            onChange={handleChange}
        />
    );
};

export default memo(EditorElement);
