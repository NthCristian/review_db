import { Elysia } from "elysia";
import auth from "./auth";
import title from "./title";

const app = new Elysia().use(auth).use(title).listen(8080);

export { app };
