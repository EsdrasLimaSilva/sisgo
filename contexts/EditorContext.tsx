"use client";

import { ReactNode, useState, createContext } from "react";

export interface Post {
    id: string;
    type: string;
    content: string;
}

interface ContextProps {
    posts: Post[];
    changeContent: (id: string, newContent: string) => void;
}

export const EditorContext = createContext<ContextProps | undefined>(undefined);

const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [editorState, setEditorState] = useState<Post[]>([
        {
            id: "1",
            type: "h1",
            content: "Hello World",
        },

        {
            id: "2",
            type: "h2",
            content: "Hello World",
        },
    ]);

    const changeContent = (id: string, newContent: string) => {
        setEditorState((prevState) => {
            const posts = prevState;
            const changedIndex = posts.findIndex((post) => post.id === id);
            posts[changedIndex].content = newContent;

            return posts;
        });
    };

    return (
        <EditorContext.Provider value={{ posts: editorState, changeContent }}>
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
