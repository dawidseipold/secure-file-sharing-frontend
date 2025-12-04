import { Link, Outlet, type RouteComponent } from "@tanstack/react-router"
import { H2, Lead, Muted } from "@/components/typography"
import { useDashboardModulesLayoutStore } from "@/stores/dashboardModulesLayoutStore.ts"
import { QuestionMarkTooltip } from "@/components/ui/tooltip"
import { ArrowLeft } from "lucide-react"

export const DashboardModulesLayout: RouteComponent = () => {
    const { title, subtitle, tooltip } = useDashboardModulesLayoutStore()

    return (
        <div className={"flex flex-col gap-y-4"}>
            <div className={"flex flex-col gap-y-6"}>
                <Link
                    to={"/dashboard"}
                    children={() => {
                        return (
                            <Muted className={"flex items-center gap-2"} hover>
                                <ArrowLeft size={16} />
                                Back to Dashboard
                            </Muted>
                        )
                    }}
                />

                <div>
                    <div className={"flex items-center gap-2"}>
                        <H2>{title}</H2>
                        <QuestionMarkTooltip text={tooltip} />
                    </div>

                    <Lead>{subtitle}</Lead>
                </div>
            </div>

            <Outlet />
        </div>
    )
}
