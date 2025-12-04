import { createRoute } from "@tanstack/react-router"
import { ActionsSendPage } from "@/pages/dashboard/modules/send"
import { dashboardModulesLayoutRoute } from "@/routes/dashboard/modules"
import { setDashboardModulesLayout } from "@/stores/dashboardModulesLayoutStore.ts"

export const dashboardModulesSendRoute = createRoute({
    getParentRoute: () => dashboardModulesLayoutRoute,
    path: "/send",
    component: ActionsSendPage,
    beforeLoad: () => {
        setDashboardModulesLayout({
            title: "Secure transfer",
            subtitle: "End-to-end encrypted file sharing.",
        })
    },
})
