import { Link, Outlet, type RouteComponent } from "@tanstack/react-router"

export const DashboardLayout: RouteComponent = () => {
    return (
        <div>
            {/*TODO: Add sidebar */}
            {/*<div>SIDEBAR</div>*/}

            <div className={"flex flex-col gap-4"}>
                <Link to={"/dashboard/send"}>Send</Link>

                <Link to={"/dashboard/download"}>Download</Link>
            </div>

            <main className={"p-8 container mx-auto"}>
                <Outlet />
            </main>
        </div>
    )
}
