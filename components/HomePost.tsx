import { PostEntity } from "@/contexts/EditorContext";
import styles from "@/app/styles/home.module.scss";
import Link from "next/link";

export default function HomePost({ post }: { post: PostEntity }) {
    return (
        <Link className={styles.homePost} href={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
        </Link>
    );
}
