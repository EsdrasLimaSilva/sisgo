import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb";
import { Collection, ObjectId } from "mongodb";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "seu email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "senha",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const mongo = await clientPromise;
                const db = mongo.db("sisgo");
                const usersCollection: Collection<User> =
                    db.collection<User>("users");

                const users = await usersCollection
                    .find({
                        email: credentials.email,
                        password: credentials.password,
                    })
                    .toArray();

                if (!users.length) return null;

                return {
                    id: users[0]._id,
                    email: users[0].email,
                    name: users[0].name,
                };
            },
        }),
    ],
};
