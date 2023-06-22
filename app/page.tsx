import HomePost from "@/components/HomePost";
import { getMongoPosts } from "@/lib/mongoClient";
import styles from "@/app/styles/home.module.scss";
import { headers } from "next/dist/client/components/headers";

export default async function Home() {
    const headersList = headers();
    const posts = await getMongoPosts();

    return (
        <>
            <header className={styles.header}>
                <h1>Sisgo</h1>
            </header>
            <main className={styles.container}>
                <p>
                    Este blog tem como objetivo discutir os mais variados
                    assuntos tratados no curso de Análise e Desenvolvimento de
                    Sistemas. Ajudando estudantes a superarem mais facilmente
                    algumas etapas de todo o processo de formação.
                </p>

                <section className={styles.postsSection}>
                    <h2>Recentes</h2>
                    <div className={styles.postsContainer}>
                        {posts.map((post) => (
                            <HomePost key={post._id} post={post} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
