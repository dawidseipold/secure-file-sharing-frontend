import { Outlet, type RouteComponent } from "@tanstack/react-router"

export const DashboardLayout: RouteComponent = () => {
    return (
        <div>
            {/*TODO: Add sidebar */}
            <div>SIDEBAR</div>

            <main className={"p-8 container mx-auto"}>
                <Outlet />
            </main>
        </div>
    )
}
