import Elysia, { t } from "elysia";
import authGuard from "../auth/guard";
import prismaService from "../service/prisma";

const titleNotFoundMessage = "Could not find this title";

const titleController = new Elysia({ prefix: "titles" })
    .use(prismaService)
    .model("IdParams", t.Object({ id: t.Number({ minimum: 1 }) }))
    .get(
        "",
        async ({ prisma, query }) => {
            return prisma.title.findMany({
                where: {
                    created_by: query.user,
                    OR: query.search
                        ? [
                              {
                                  title: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  overview: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                              },
                          ]
                        : undefined,
                },
                include: {
                    user: { select: { id: true, name: true } },
                },
                omit: {
                    created_by: true,
                },
            });
        },
        {
            query: t.Object({
                user: t.Optional(t.Number({ minimum: 1 })),
                search: t.Optional(t.String()),
            }),
        }
    )
    .get(
        "/:id",
        async ({ prisma, params, status }) => {
            return prisma.title
                .findUniqueOrThrow({
                    where: { id: params.id },
                    include: {
                        user: { select: { id: true, name: true } },
                    },
                    omit: {
                        created_by: true,
                    },
                })
                .catch(() => status("Not Found", titleNotFoundMessage));
        },
        { params: "IdParams" }
    )
    .use(authGuard)
    .macro({
        isAuthorized(enabled: boolean) {
            if (!enabled) return;

            return {
                async beforeHandle({ user, prisma, params, status }) {
                    const title = await prisma.title.findUnique({
                        where: { id: Number.parseInt(params["id"]!) },
                    });

                    if (!title)
                        return status("Not Found", titleNotFoundMessage);

                    if (title.created_by !== user?.id) {
                        return status("Unauthorized");
                    }
                },
            };
        },
    })
    .delete(
        "/:id",
        async ({ prisma, params, status }) => {
            return prisma.title
                .delete({ where: { id: params.id } })
                .then(() => status("OK"))
                .catch(() => status("Not Found", titleNotFoundMessage));
        },
        {
            params: "IdParams",
            isAuthorized: true,
        }
    )
    .guard({
        body: t.Object({
            title: t.String({ minLength: 1 }),
            overview: t.Optional(t.String({ minLength: 1 })),
        }),
    })
    .put("", async ({ prisma, user, body }) => {
        return prisma.title.create({
            data: { ...body, created_by: user.id as number },
            include: {
                user: { select: { id: true, name: true } },
            },
            omit: {
                created_by: true,
            },
        });
    })
    .patch(
        "/:id",
        async ({ prisma, body, params, status }) => {
            const title = await prisma.title
                .findUniqueOrThrow({ where: { id: params.id } })
                .catch(() => null);

            if (!title) {
                return status("Not Found", titleNotFoundMessage);
            }

            return prisma.title.update({
                where: { id: params.id },
                data: body,
                include: {
                    user: { select: { id: true, name: true } },
                },
                omit: {
                    created_by: true,
                },
            });
        },
        {
            params: "IdParams",
            isAuthorized: true,
        }
    );

export default titleController;
