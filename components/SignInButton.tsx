"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
    return (
        <button type="button" onClick={() => signIn()}>
            sign in
        </button>
    );
}
