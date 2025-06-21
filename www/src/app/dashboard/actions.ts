"use server";

import { cookies } from "next/headers";

export async function createTitle(title: {
    title: string;
    overview: string | null;
}) {
    const cookieStore = await cookies();

    const payload: Record<string, string> = {
        title: title.title,
    };

    if (title.overview) {
        payload.overview = title.overview;
    }

    const res = await fetch("http://localhost:8080/titles", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieStore.get("token")?.value ?? ""}`,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        return new Error(res.statusText);
    }

    return res.ok;
}
