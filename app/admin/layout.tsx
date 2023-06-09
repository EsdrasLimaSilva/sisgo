import EditorProvider from "@/contexts/EditorContext";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata = {
    title: "Sisgo | Admin",
};

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/admin");

    return <EditorProvider>{children}</EditorProvider>;
}
