import { Outlet, type RouteComponent } from "@tanstack/react-router"
import { H3, Lead } from "@/components/typography"
import { useActionsLayoutStore } from "@/stores/actionsLayoutStore.ts"
import { PageTooltip } from "@/components/ui/page/page-tooltip.tsx"

export const ActionsLayout: RouteComponent = () => {
    const title = useActionsLayoutStore((s) => s.title)
    const subtitle = useActionsLayoutStore((s) => s.subtitle)
    const tooltip = useActionsLayoutStore((s) => s.tooltip)

    return (
        <div>
            <div>
                <div className={"flex items-center gap-2"}>
                    <H3>{title}</H3>
                    <PageTooltip text={tooltip} />
                </div>

                <Lead>{subtitle}</Lead>
            </div>

            <Outlet />
        </div>
    )
}
