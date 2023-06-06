"use client";

import { title } from "process";
import {
    ReactNode,
    useState,
    createContext,
    useCallback,
    useEffect,
} from "react";

/**
 * Entities are the elements of the editor. They hava a type and a content representing a HTML tag an its text content
 */
export interface Entity {
    id: string;
    type: string;
    content?: string;
    fields?: {
        url: string;
        alt: string;
    };
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
    changeType: (id: string, newType: string) => void;
    changeImageFields: (id: string, newUrl: string, newAlt: string) => void;
    pushElement: (type: "img" | "p" | "h1" | "h2" | "h3") => void;
    changeMetaInfo: (
        title: string,
        metadescription: string,
        tags: string
    ) => void;
}

export const EditorContext = createContext<ContextProps | undefined>(undefined);

const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [editorState, setEditorState] = useState<PostEntity>({
        title: "Some title",
        metadescription: "Meta my friend",
        tags: ["tag1", "tag2", "tag3"],
        entities: [],
    });

    const findEntity = useCallback((state: PostEntity, entityId: string) => {
        const newEntities = state.entities;
        const changeIndex = newEntities.findIndex(
            (entity) => entity.id === entityId
        );

        return { newEntities, changeIndex };
    }, []);

    /**
     * This functions changes the entity content on editor state
     * @param id the entity id that it'll being modified
     * @param newContent the new content
     */
    const changeContent = useCallback((id: string, newContent: string) => {
        setEditorState((prevState) => {
            const { newEntities, changeIndex } = findEntity(prevState, id);
            newEntities[changeIndex].content = newContent;

            return { ...prevState, entities: newEntities };
        });
    }, []);

    /**
     * This functions changes the entity type on editor state
     * @param id the entity id that it'll being modified
     * @param newType the new entity's type
     */
    const changeType = useCallback((id: string, newType: string) => {
        setEditorState((prevState) => {
            const { newEntities, changeIndex } = findEntity(prevState, id);
            newEntities[changeIndex].type = newType;

            return { ...prevState, entities: newEntities };
        });
    }, []);

    /**
     * Changes the image files (url ant alternative text)
     * @param id the entity image id
     * @param newUrl the new updated url
     * @param newAlt the new updated alternative text
     */
    const changeImageFields = useCallback(
        (id: string, newUrl: string, newAlt: string) => {
            setEditorState((prevState) => {
                const { newEntities, changeIndex } = findEntity(prevState, id);
                newEntities[changeIndex].fields!.url = newUrl;
                newEntities[changeIndex].fields!.alt = newAlt;

                return { ...prevState, entities: newEntities };
            });
        },
        []
    );

    const changeMetaInfo = useCallback(
        (title: string, metadescription: string, tags: string) => {
            const tagsArr = tags.split(",").map((tag) => tag.trim());

            setEditorState((prev) => {
                return { ...prev, title, metadescription, tags: tagsArr };
            });
        },
        []
    );

    /**
     * Adds a new element on the editor state
     * @param type the type of the entity
     */
    const pushElement = useCallback(
        (type: "img" | "p" | "h1" | "h2" | "h3") => {
            setEditorState((prevState) => {
                const newEntities = prevState.entities;

                if (type === "img") {
                    newEntities.push({
                        id: String(Math.random() % 9999),
                        type: "img",
                        fields: {
                            url: "",
                            alt: "",
                        },
                    });
                } else {
                    newEntities.push({
                        id: String(Math.random() % 9999),
                        type,
                        content: "digite algo",
                    });
                }

                return { ...prevState, entities: newEntities };
            });
        },
        []
    );

    const handleKeyAction = (e: KeyboardEvent) => {
        if (document.activeElement?.tagName === "BODY") {
            if (e.key === "a") pushElement("p");
            else if (e.key === "i") pushElement("img");
        }

        //remove focus from input
        else if (e.key === "Escape") {
            (document.activeElement as HTMLTextAreaElement).blur();
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", handleKeyAction);

        return () => window.removeEventListener("keyup", handleKeyAction);
    }, []);

    return (
        <EditorContext.Provider
            value={{
                postEntity: editorState,
                changeContent,
                changeType,
                changeImageFields,
                pushElement,
                changeMetaInfo,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
