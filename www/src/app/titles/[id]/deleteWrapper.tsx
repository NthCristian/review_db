"use client";

import { Title } from "@/types/models";
import Swal from "sweetalert2";
import { deleteTitle } from "./actions";
import { redirect } from "next/navigation";

export default function DeleteWrapper({
    children,
    className,
    title,
}: {
    children: any;
    className?: string;
    title: Title;
}) {
    const onClick = async () => {
        const res = await deleteTitle(title.id);

        if (res instanceof Error) {
            Swal.fire("Error", "Couldn't delete the title");
            throw res;
        }

        redirect("/dashboard");
    };

    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    );
}
