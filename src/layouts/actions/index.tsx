import {Outlet, type RouteComponent} from "@tanstack/react-router";
import {H1, Lead} from "@/components/typography";
import {useActionsLayoutStore} from "@/stores/actionsLayoutStore.ts";

export const ActionsLayout: RouteComponent = () => {
    const title = useActionsLayoutStore((s) => s.title);
    const subtitle = useActionsLayoutStore((s) => s.subtitle);

    return (
        <div>
            <H1>{title}</H1>
            <Lead>{subtitle}</Lead>

            <Outlet/>
        </div>
    )
}