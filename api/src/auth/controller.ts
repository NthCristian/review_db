import Elysia, { t } from "elysia";
import prismaService from "../service/prisma";
import jwt from "@elysiajs/jwt";

const authController = new Elysia({ prefix: "auth" })
    .use(prismaService)
    .use(
        jwt({
            secret: "MY_SECRET",
        })
    )
    .put(
        "sign-up",
        async ({ status, body, prisma }) => {
            return await prisma.user
                .create({
                    data: {
                        ...body,
                        password: await Bun.password.hash(body.password),
                    },
                })
                .then(() => status("OK"))
                .catch((err) => {
                    console.error(err);
                    return status("Internal Server Error");
                });
        },
        {
            body: t.Object({
                name: t.String({ minLength: 1 }),
                email: t.String({ format: "email" }),
                password: t.String({}),
            }),
        }
    )
    .post(
        "sign-in",
        async ({ body, status, prisma, jwt }) => {
            const user = await prisma.user.findUnique({
                where: { email: body.email },
            });

            if (
                !user ||
                !(await Bun.password.verify(body.password, user.password))
            ) {
                return status("Unauthorized");
            }

            return jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        },
        {
            body: t.Object({
                email: t.String({ format: "email" }),
                password: t.String(),
            }),
        }
    );

export default authController;
