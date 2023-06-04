"use client";

import { Entity } from "@/contexts/EditorContext";
import styles from "@/app/styles/editor.module.scss";
import { memo } from "react";

const EditorElement = ({ id, type, content }: Entity) => {
    return (
        <textarea
            key={Math.random() % 100}
            defaultValue={content}
            className={styles.element}
        />
    );
};

export default memo(EditorElement);
