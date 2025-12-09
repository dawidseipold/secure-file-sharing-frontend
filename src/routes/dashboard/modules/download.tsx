import { createRoute } from "@tanstack/react-router"
import { DashboardModulesDownloadPage } from "@/pages/dashboard/modules/download"
import { dashboardModulesLayoutRoute } from "@/routes/dashboard/modules"
import { setDashboardModulesLayout } from "@/stores/dashboardModulesLayoutStore.ts"

export const dashboardModulesDownloadRoute = createRoute({
    getParentRoute: () => dashboardModulesLayoutRoute,
    path: "/download",
    component: DashboardModulesDownloadPage,
    beforeLoad: () => {
        setDashboardModulesLayout({
            title: "Secure download",
            subtitle: "Download your files.",
        })
    },
})
