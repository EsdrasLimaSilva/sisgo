"use client";

import styles from "@/app/styles/dashboard.module.scss";
import { PostEntity } from "@/contexts/EditorContext";
import { useRouter } from "next/navigation";
import { BsPencilFill } from "react-icons/bs";

interface Props {
    post: PostEntity;
    editPost: (post: PostEntity) => void;
}

export default function DashPost({ post, editPost }: Props) {
    const router = useRouter();

    const handleEditPost = () => {
        editPost(post);
        router.push("/admin/editor");
    };

    return (
        <li className={styles.dashPost}>
            <h2>{post.title}</h2>
            <button type="button" onClick={handleEditPost}>
                <BsPencilFill />
            </button>
        </li>
    );
}
