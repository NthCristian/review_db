import Elysia from "elysia";
import authController from "./controller";

export default new Elysia().use(authController);
