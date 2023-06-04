"use client";

import { Entity } from "@/contexts/EditorContext";
import styles from "@/app/styles/editor.module.scss";
import { ChangeEvent, memo, useCallback, useEffect, useRef } from "react";

interface Props extends Entity {
    changeContent: (id: string, newContent: string) => void;
}

const EditorElement = ({ id, type, content, changeContent }: Props) => {
    const inputRef = useRef(null);

    /**
     * Resize the textarea heigh when its content changes
     */
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
        changeContent(id, (e.target as HTMLTextAreaElement).value);
    };

    return (
        <textarea
            ref={inputRef}
            value={content}
            spellCheck={false}
            className={styles[`input-${type}`]}
            onChange={handleChange}
        />
    );
};

function compareProps(
    prevProps: Readonly<Entity>,
    nextProps: Readonly<Entity>
) {
    const sameId = prevProps.id === nextProps.id;
    const sameContent = prevProps.content === nextProps.content;
    const sameType = prevProps.type === nextProps.type;

    return sameId && sameContent && sameType;
}

export default memo(EditorElement, compareProps);
