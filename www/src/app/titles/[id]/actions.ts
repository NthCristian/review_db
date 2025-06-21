"use server";

import { cookies } from "next/headers";

export async function editTitle(title: {
    id: number;
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

    const res = await fetch(`http://localhost:8080/titles/${title.id}`, {
        method: "PATCH",
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

export async function deleteTitle(id: number) {
    const cookieStore = await cookies();

    const res = await fetch(`http://localhost:8080/titles/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${cookieStore.get("token")?.value ?? ""}`,
        },
    });

    if (!res.ok) {
        return new Error(res.statusText);
    }

    return res.ok;
}
