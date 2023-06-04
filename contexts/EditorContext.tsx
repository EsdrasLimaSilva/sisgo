"use client";

import { ReactNode, useState, createContext } from "react";

/**
 * Entities are the elements of the editor. They hava a type and a content representing a HTML tag an its text content
 */
export interface Entity {
    id: string;
    type: string;
    content: string;
}

interface ContextProps {
    entities: Entity[];
    changeContent: (id: string, newContent: string) => void;
}

export const EditorContext = createContext<ContextProps | undefined>(undefined);

const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [editorState, setEditorState] = useState<Entity[]>([
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

        {
            id: "3",
            type: "p",
            content:
                "Hão de chorar por ela os cinamomos, murchando as flores ao tombar do dia",
        },
    ]);

    /**
     * This functions changes some entity on editor state
     * @param id the entity id that it's being modified
     * @param newContent the new content
     */
    const changeContent = (id: string, newContent: string) => {
        setEditorState((prevState) => {
            const posts = prevState;
            const changedIndex = posts.findIndex((post) => post.id === id);
            posts[changedIndex].content = newContent;

            return posts;
        });
    };

    return (
        <EditorContext.Provider
            value={{ entities: editorState, changeContent }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
