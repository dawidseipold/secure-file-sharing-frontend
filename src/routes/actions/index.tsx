import {createRoute} from "@tanstack/react-router";
import {rootRoute} from "@/routes/__root.tsx";
import {ActionsLayout} from "@/layouts/actions";

export const actionsLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/actions",
    component: ActionsLayout,
})