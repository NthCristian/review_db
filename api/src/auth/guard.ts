import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

const authGuard = new Elysia({ name: "auth.guard" })
    .use(
        jwt({
            secret: "MY_SECRET",
        })
    )
    .use(bearer())
    .resolve(async ({ bearer, jwt, status }) => {
        const verifiedData = await jwt.verify(bearer);

        if (!verifiedData) {
            return status("Unauthorized");
        }

        return {
            user: verifiedData,
        };
    })
    .as("scoped");

export default authGuard;
