import { Faculty_Glyphic } from "next/font/google";
import Link from "next/link";

const titleFont = Faculty_Glyphic({ weight: "400", subsets: ["latin"] });

export default function Header() {
    const routings: { label: string; href: string }[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
    ];

    return (
        <header className="px-5 py-3 min-h-[85px] border-b bg-slate-600 text-white flex justify-between items-center select-none">
            <Link href="/">
                <h1 className={`${titleFont.className} text-2xl`}>ReviewDb</h1>
            </Link>
            <nav>
                <ul className="[&_li]:inline-block space-x-4">
                    {routings.map((route, i) => (
                        <Link href={route.href} key={i}>
                            <li className="cursor-pointer hover:underline active:scale-95">
                                {route.label}
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
