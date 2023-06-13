import styles from "@/app/styles/dashboard.module.scss";
import Dashboard from "@/components/Dashboard";
import { PostEntity } from "@/contexts/EditorContext";
import { getMongoPosts } from "@/lib/mongoClient";

export default async function DashboardPage() {
    let posts: PostEntity[] = [];

    posts = await getMongoPosts();

    return (
        <main className={styles.container}>
            <h1>
                Sisgo <sub>admin</sub>
            </h1>
            {posts.length ? <Dashboard posts={posts} /> : <h2>Vazio</h2>}
        </main>
    );
}
