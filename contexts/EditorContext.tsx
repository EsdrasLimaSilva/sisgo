"use client";

import { ReactNode, useState, createContext, useCallback } from "react";

/**
 * Entities are the elements of the editor. They hava a type and a content representing a HTML tag an its text content
 */
export interface Entity {
    id: string;
    type?: string;
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
}

export const EditorContext = createContext<ContextProps | undefined>(undefined);

const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [editorState, setEditorState] = useState<PostEntity>({
        title: "Elementos de Hardware e arquitetura de Von Neumann",
        metadescription:
            "Neste post nós discutimos os principais componentes de um computador atual e como seus módulos são organizados",
        tags: [
            "Hardware",
            "Von Neumann",
            "Fundamentos da computaçao",
            "Ciência da computação",
        ],
        entities: [
            {
                id: "1",
                type: "h1",
                content: "Elementos de Hardware e arquitetura de Von Neumann",
            },

            {
                id: "2",
                type: "p",
                content:
                    "Os elementos que compõem um computador atual são vários. Desde chips até placas completas com inúmeros circuitos integrados, os PCs atuais possuem uma complexidade imensa. Contudo, uma arquitetura que surgiu por volta de 1945, ainda faz parte do nosso dia a dia computacional.",
            },

            {
                id: "3",
                type: "p",
                content:
                    "Foi ela que permitiu a existência do conceito de programa armazenado, permitindo assim que os nosso laptops e celulares existam hoje em dia. Antes dela, os computadores eram feitos para executar uma única tarefa específica.",
            },
            {
                id: "4",
                type: "h2",
                content: "Arquitetura dos computadores",
            },
            {
                id: "5",
                type: "p",
                content:
                    "Podemos definir uma arquitetura de computador como a organização dos módulos funcionais do computador, como o processador, memória e etc, bem como todo o conjunto de suas propriedades lógicas e abstratas.",
            },
            {
                id: "6",
                type: "p",
                content:
                    "A arquitetura que utilizamos atualmente é conhecida como Arquitetura de Von Neumann. Ela é constituída por três módulos básicos: O processador, a memória principal e o barramento.",
            },

            {
                id: "7",
                type: "h3",
                content:
                    "A arquitetura que utilizamos atualmente é conhecida como Arquitetura de Von Neumann. Ela é constituída por três módulos básicos: O processador, a memória principal e o barramento.",
            },
            {
                id: "8",
                type: "img",
                fields: {
                    url: "",
                    alt: "",
                },
            },
        ],
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

    return (
        <EditorContext.Provider
            value={{
                postEntity: editorState,
                changeContent,
                changeType,
                changeImageFields,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;
