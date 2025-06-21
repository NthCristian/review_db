"use client";

import { renderToString } from "react-dom/server.browser";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import { createTitle } from "./actions";

export default function CreateWrapper({
    children,
    className,
}: {
    children: any;
    className?: string;
}) {
    const onClick = async () => {
        const swalRes = await Swal.fire({
            title: "Create",
            showCancelButton: true,
            width: "fit-content",
            html: renderToString(
                <div className="form-container">
                    <form className="edit-form">
                        <div>
                            <label htmlFor="title">Title *</label>
                            <input name="title" type="text" />
                        </div>
                        <div>
                            <label htmlFor="overview">Overview</label>
                            <textarea
                                className="text-sm w-full"
                                name="overview"
                            />
                        </div>
                    </form>
                </div>
            ),
            preConfirm: () => {
                const formElement = document.querySelector(
                    ".edit-form"
                ) as HTMLFormElement;

                const formData = new FormData(formElement);

                if (!formData.get("title")) {
                    Swal.showValidationMessage("Title cannot be empty");
                }

                return {
                    title: formData.get("title")?.toString()!,
                    overview: formData.get("overview")?.toString()! || null,
                };
            },
        });

        if (!swalRes.isConfirmed) {
            return;
        }

        if (!swalRes.value) {
            throw new Error("Missing swal response values.");
        }

        const res = await createTitle({ ...swalRes.value });

        if (res instanceof Error) {
            Swal.fire("Error", "Couldn't update the title");
            throw res;
        }

        redirect("#");
    };

    return (
        <div onClick={onClick} className={className}>
            {children}
        </div>
    );
}
