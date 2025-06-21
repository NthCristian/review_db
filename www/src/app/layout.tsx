import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./header";

const defaultFont = Montserrat({ fallback: ["Arial"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ReviewDb",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={`${defaultFont.className} antialiased bg-[#eee]`}>
                <Header />
                <main className="p-5">{children}</main>
            </body>
        </html>
    );
}
