import EditorProvider from "@/contexts/EditorContext";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <EditorProvider>{children}</EditorProvider>;
}
