"use client";

import { FormEvent, useCallback, useState } from "react";
import { signIn } from "./actions";
import { redirect } from "next/navigation";
import cookies from "js-cookie";

export default function SignIn() {
    const [isNotSuccessful, setIsNotSuccessful] = useState<string | null>(null);

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const email = formData.get("email") as string | null;
        const password = formData.get("password") as string | null;

        if (!email || !password) {
            setIsNotSuccessful("E-mail and password are needed!");
            return;
        }

        const token = await signIn({
            email,
            password,
        });

        if (token instanceof Error) {
            (e.target as HTMLFormElement).reset();
            setIsNotSuccessful(token.message);
            throw token;
        }

        cookies.set("token", token);
        redirect("/dashboard");
    }, []);

    return (
        <div className="form-container">
            <h1>Sign-In</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input name="email" type="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" />
                </div>
                {isNotSuccessful && <span>{isNotSuccessful}</span>}
                <div>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
}
