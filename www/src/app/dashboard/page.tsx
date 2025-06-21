import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWTUserPayload } from "@/types/models";
import TitleGallery from "@/components/titleGallery";
import LogoutWrapper from "./logoutWrapper";
import CreateWrapper from "./createWrapper";

export default async function DashboardPage() {
    const cookieStore = await cookies();

    const payload = jwt.decode(
        cookieStore.get("token")?.value!
    ) as JWTUserPayload | null;

    return (
        <>
            <div className="w-full flex justify-between mb-10">
                <h1 className="text-2xl">Hello, {payload?.name}</h1>
                <div className="[&>*]:inline space-x-2">
                    <CreateWrapper>
                        <span className="text-sm font-light cursor-pointer text-lime-500 active:text-lime-300 underline">
                            new
                        </span>
                    </CreateWrapper>
                    <LogoutWrapper>
                        <span className="text-sm font-light cursor-pointer text-red-500 active:text-red-300 underline">
                            log-out
                        </span>
                    </LogoutWrapper>
                </div>
            </div>
            <TitleGallery user={payload?.id.toString()} />
        </>
    );
}
