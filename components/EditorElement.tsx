"use client";

import { Entity } from "@/contexts/EditorContext";
import styles from "@/app/styles/editor.module.scss";
import { ChangeEvent, memo, useCallback, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";

interface Props extends Entity {
    changeContent: (id: string, newContent: string) => void;
    changeType: (id: string, newType: string) => void;
    popElement: (id: string) => void;
}

const EditorElement = ({
    id,
    type,
    content,
    changeContent,
    changeType,
    popElement,
}: Props) => {
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

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        changeType(id, e.target.value);
        resize();
    };

    return (
        <div className={styles.inputContainer}>
            <div>
                <select defaultValue={type} onChange={handleSelectChange}>
                    <option value="h1">h1</option>
                    <option value="h2">h2</option>
                    <option value="h3">h3</option>
                    <option value="p">p</option>
                </select>
                <button type="button" onClick={() => popElement(id)}>
                    <FaTrash />
                </button>
            </div>
            <textarea
                id={id}
                ref={inputRef}
                value={content}
                spellCheck={false}
                className={styles[`input-${type}`]}
                onChange={handleChange}
                placeholder="digite algo"
            />
        </div>
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
