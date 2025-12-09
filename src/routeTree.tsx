import { indexRoute } from "@/routes"
import { rootRoute } from "@/routes/__root"
import { dashboardLayoutRoute } from "@/routes/dashboard"
import { dashboardModulesSendRoute } from "@/routes/dashboard/modules/send"
import { dashboardModulesLayoutRoute } from "@/routes/dashboard/modules"
import { dashboardModulesDownloadRoute } from "@/routes/dashboard/modules/download.tsx"

export const routeTree = rootRoute.addChildren([
    indexRoute,
    dashboardLayoutRoute.addChildren([
        dashboardModulesLayoutRoute.addChildren([
            dashboardModulesSendRoute,
            dashboardModulesDownloadRoute,
        ]),
    ]),
])
