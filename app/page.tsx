import HomePost from "@/components/HomePost";
import { getMongoPosts } from "@/lib/mongoClient";
import styles from "@/app/styles/home.module.scss";

export default async function Home() {
    const posts = await getMongoPosts();

    return (
        <>
            <header className={styles.header}>
                <h1>Sisgo</h1>
            </header>
            <main>
                {posts.map((post) => (
                    <HomePost key={post._id} post={post} />
                ))}
            </main>
        </>
    );
}
