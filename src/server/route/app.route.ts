import { createRoute } from "@/server/createRoute";
import { userRouter } from "@/server/route/user.route";

export const appRouter = createRoute().merge("users.", userRouter);

export type AppRouter = typeof appRouter;
