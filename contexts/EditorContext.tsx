"use client";

import { ReactNode, useState, createContext, useCallback } from "react";

/**
 * Entities are the elements of the editor. They hava a type and a content representing a HTML tag an its text content
 */
export interface Entity {
    id: string;
    type: string;
    content: string;
}

interface PostEntity {
    title: string;
    metadescription: string;
    tags: string[];
    entities: Entity[];
}

interface ContextProps {
    postEntity: PostEntity;
    changeContent: (id: string, newContent: string) => void;
}

export const EditorContext = createContext<ContextProps | undefined>(undefined);

const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [editorState, setEditorState] = useState<PostEntity>({
        title: "Post 1",
        metadescription: "este é o post de teste",
        tags: ["tag1", "tag2", "tag3"],
        entities: [
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
        ],
    });

    /**
     * This functions changes some entity on editor state
     * @param id the entity id that it's being modified
     * @param newContent the new content
     */
    const changeContent = useCallback((id: string, newContent: string) => {
        setEditorState((prevState) => {
            const newEntities = prevState.entities;
            const changedIndex = newEntities.findIndex(
                (post) => post.id === id
            );
            newEntities[changedIndex].content = newContent;

            return { ...prevState, entities: newEntities };
        });
    }, []);

    return (
        <EditorContext.Provider
            value={{ postEntity: editorState, changeContent }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
