import SignInButton from "@/components/SignInButton";
import styles from "@/app/styles/admin.module.scss";
import SignOutButton from "@/components/SignOutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Admin() {
    const session = await getServerSession();

    if (session) redirect("/admin");

    return (
        <main className={styles.container}>
            <h1>Sisgo</h1>

            <SignInButton />
            <SignOutButton />
        </main>
    );
}
