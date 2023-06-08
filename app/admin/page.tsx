"use client";

import { signIn } from "next-auth/react";

export default function Admin() {
    return (
        <main>
            <button type="button" onClick={() => signIn()}>
                signin
            </button>
        </main>
    );
}
