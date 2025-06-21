import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();

    const isAuthenticated = cookieStore.has("token");

    if (!isAuthenticated) {
        redirect("/auth/sign-in");
    }

    return children;
}
