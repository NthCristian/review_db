"use server";

export async function signIn(payload: { email: string; password: string }) {
    const res = await fetch("http://localhost:8080/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        return new Error(res.statusText);
    }

    return await res.text();
}
