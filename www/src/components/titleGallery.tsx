import { Title } from "@/types/models";
import Link from "next/link";

export default async function TitleGallery(params: {
    search?: string;
    user?: string;
}) {
    const res = await fetch(
        `http://localhost:8080/titles?${new URLSearchParams(params).toString()}`
    );

    if (!res.ok) {
        return "err";
    }

    const titles = (await res.json()) as Title[];

    return (
        <div className="flex justify-center flex-wrap gap-3">
            {titles.map((title, i) => (
                <Link href={`/titles/${title.id}`} key={i}>
                    <div className="bg-[#a7a7a7] shadow-md opacity-80 p-4 rounded-sm text-white text-shadow-lg w-[135px] h-[175px] hover:scale-105 active:scale-100 cursor-pointer transition-transform duration-100">
                        <h1 className="mb-1">{title.title}</h1>
                        <p className="text-sm font-extralight w-full wrap-break-word">
                            {title.overview}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
