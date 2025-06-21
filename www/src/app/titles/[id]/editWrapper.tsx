"use client";

import { Title } from "@/types/models";
import { renderToString } from "react-dom/server.browser";
import Swal from "sweetalert2";
import { editTitle } from "./actions";
import { redirect } from "next/navigation";

export default function EditWrapper({
    children,
    className,
    title,
}: {
    children: any;
    className?: string;
    title: Title;
}) {
    const onClick = async () => {
        const swalRes = await Swal.fire({
            title: "Edit",
            showCancelButton: true,
            width: "fit-content",
            html: renderToString(
                <div className="form-container">
                    <form className="edit-form">
                        <div>
                            <label htmlFor="title">Title *</label>
                            <input
                                name="title"
                                type="text"
                                defaultValue={title.title}
                            />
                        </div>
                        <div>
                            <label htmlFor="overview">Overview</label>
                            <textarea
                                className="text-sm w-full"
                                name="overview"
                                defaultValue={title.overview ?? ""}
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

        const res = await editTitle({ ...swalRes.value, id: title.id });

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
