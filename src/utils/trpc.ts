import { createReactQueryHooks } from "@trpc/react";

import { AppRouter } from "@/server/route/app.route";

export const trpc = createReactQueryHooks<AppRouter>();
