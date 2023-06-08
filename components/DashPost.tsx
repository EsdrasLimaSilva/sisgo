"use client";

import styles from "@/app/styles/dashboard.module.scss";
import { BsPencilFill } from "react-icons/bs";

interface Props {
    title: string;
    id: string;
}

export default function DashPost({ title, id }: Props) {
    return (
        <li className={styles.dashPost}>
            <h2>{title}</h2>
            <button type="button">
                <BsPencilFill />
            </button>
        </li>
    );
}
