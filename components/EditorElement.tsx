"use client";

import { Post } from "@/app/admin/editor/page";
import styles from "@/app/styles/editor.module.scss";
import { memo } from "react";

const EditorElement = ({ type, content }: Post) => {
    return (
        <textarea
            key={Math.random() % 100}
            defaultValue={content}
            className={styles.element}
        />
    );
};

export default memo(EditorElement);
