import { createRoute } from "@tanstack/react-router";
import { IndexPage } from "@/pages";
import { rootRoute } from "@/routes/__root";

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: IndexPage
})