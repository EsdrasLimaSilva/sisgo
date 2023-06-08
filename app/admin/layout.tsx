import EditorProvider from "@/contexts/EditorContext";
import { ReactNode } from "react";

export const metadata = {
    title: "Sisgo | Admin",
};

export default function Layout({ children }: { children: ReactNode }) {
    return <EditorProvider>{children}</EditorProvider>;
}
