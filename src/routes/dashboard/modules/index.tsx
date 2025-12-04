import { createRoute } from "@tanstack/react-router"
import { DashboardModulesLayout } from "@/layouts/dashboard/modules"
import { dashboardLayoutRoute } from "@/routes/dashboard"

export const dashboardModulesLayoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    id: "modules",
    component: DashboardModulesLayout,
})
