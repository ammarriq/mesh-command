import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router"

import NavBar from "@/components/layout/nav-bar"
import Sidebar from "@/components/layout/sidebar"
import CrossCircleIcon from "@/icons/cross-circle"

export const Route = createFileRoute("/_dashboard")({
    component: LayoutComponent,
})

function LayoutComponent() {
    const { pathname } = useLocation()

    return (
        <main className="grid size-full grid-rows-[auto_minmax(0,1fr)] justify-stretch">
            <NavBar />

            <section className="grid h-full grid-cols-[auto_minmax(0,1fr)]">
                <Sidebar />

                <section className="bg-Bg-Dark grid size-full grid-rows-[auto_minmax(0,1fr)] p-4">
                    <header className="bg-light-bg border-Bg-Dark border-b">
                        <div className="border-Bg-Dark flex w-full max-w-56 items-center justify-between gap-6 border-r bg-white px-2 py-1">
                            <h3 className="text-sm font-medium capitalize">
                                {pathname.split("/").at(1)}
                            </h3>
                            <CrossCircleIcon className="size-4 cursor-pointer" />
                        </div>
                    </header>

                    <aside className="grid size-full flex-1 grid-cols-[400px_1fr] bg-white pr-4 pb-4">
                        <Outlet />
                    </aside>
                </section>
            </section>
        </main>
    )
}
