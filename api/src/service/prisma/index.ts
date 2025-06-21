import Elysia from "elysia";
import { PrismaClient } from "./generated";

const prismaService = new Elysia({ name: "service.prisma" })
    .decorate("prisma", new PrismaClient())
    .as("scoped");

export default prismaService;
