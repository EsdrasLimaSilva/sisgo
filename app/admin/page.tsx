import styles from "@/app/styles/admin.module.scss";
import Link from "next/link";

export default async function Admin() {
    return (
        <main className={styles.container}>
            <h1>Sisgo</h1>
            <Link href="/admin/dashboard">Dashboard</Link>
        </main>
    );
}
