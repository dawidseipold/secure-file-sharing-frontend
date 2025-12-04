import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "@/routes/__root.tsx"
import { DashboardLayout } from "@/layouts/dashboard"

export const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: DashboardLayout,
})
