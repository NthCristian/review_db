import { JWTUserPayload, Title } from "@/types/models";
import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import EditWrapper from "./editWrapper";
import DeleteWrapper from "./deleteWrapper";

export default async function TitleOverview({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;

    const res = await fetch(`http://localhost:8080/titles/${id}`);

    if (!res.ok) {
        return res.statusText;
    }

    const title = (await res.json()) as Title;

    const cookieStore = await cookies();

    let payload = null;

    if (cookieStore.has("token")) {
        payload = jwt.decode(
            cookieStore.get("token")?.value!
        ) as JWTUserPayload;
    }

    const isAuthorized = title.user.id === payload?.id;

    return (
        <div className="lg:ml-12">
            <h1 className="text-3xl">{title.title}</h1>
            <div className="space-x-2">
                {!isAuthorized && (
                    <Link
                        href={`/users/${title.user.id}?name=${title.user.name}`}
                    >
                        <span className="text-sm font-sans font-light underline text-blue-700 active:text-blue-400">
                            {title.user.name}
                        </span>
                    </Link>
                )}
                {isAuthorized && (
                    <>
                        <EditWrapper title={title} className="inline">
                            <span className="text-sm font-sans font-light underline text-gray-700 active:text-gray-400 cursor-pointer">
                                edit
                            </span>
                        </EditWrapper>
                        <DeleteWrapper title={title} className="inline">
                            <span className="text-sm font-sans font-light underline text-red-700 active:text-red-400 cursor-pointer">
                                delete
                            </span>
                        </DeleteWrapper>
                    </>
                )}
            </div>
            <p className="mt-5 font-medium">Overview</p>
            <p className="text-sm mt-1 min-h-[100px] font-light">
                {title.overview}
            </p>
            <span className="text-sm font-light">
                <b>Created at</b>
                <br />
                {new Date(title.created_at).toLocaleString()}
            </span>
        </div>
    );
}
