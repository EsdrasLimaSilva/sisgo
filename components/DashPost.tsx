"use client";

import styles from "@/app/styles/dashboard.module.scss";
import { PostEntity } from "@/contexts/EditorContext";
import { useRouter } from "next/navigation";
import { BsPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

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

    const handleDeletePost = async () => {
        try {
            await fetch(`/api/posts?id=${post._id}`, {
                method: "DELETE",
            });
            router.replace("/admin/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <li className={styles.dashPost}>
            <h2>{post.title}</h2>
            <span className={styles.actionsContainer}>
                <button type="button" onClick={handleEditPost}>
                    <BsPencilFill />
                </button>

                <button type="button" onClick={handleDeletePost}>
                    <FaTrash />
                </button>
            </span>
        </li>
    );
}
