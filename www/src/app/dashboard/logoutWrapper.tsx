"use client";

import cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function LogoutWrapper({
    children,
    className,
}: {
    children: any;
    className?: string;
}) {
    const onClick = async () => {
        cookies.remove("token");

        redirect("/");
    };

    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    );
}
