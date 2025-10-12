import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router"

import CrossCircleIcon from "@/icons/cross-circle"
import NavBar from "@/routes/_dashboard/-nav-bar"
import Sidebar from "@/routes/_dashboard/-sidebar"
import { useSplitScreen } from "@/context/split-screen"

export const Route = createFileRoute("/_dashboard")({
    component: LayoutComponent,
})

function LayoutComponent() {
    const { activeTabs, onTabClick } = useSplitScreen()
    const { pathname } = useLocation()

    const urlPrefix = "/" + pathname.split("/").filter(Boolean)[0]
    const activeTabList = [
        urlPrefix,
        ...activeTabs.filter((tab) => !tab.startsWith(urlPrefix)),
    ]

    return (
        <main className="grid size-full grid-rows-[auto_minmax(0,1fr)] justify-stretch">
            <NavBar />

            <section className="grid h-full grid-cols-[auto_minmax(0,1fr)]">
                <Sidebar />

                <section className="bg-Bg-Dark grid size-full grid-rows-[auto_minmax(0,1fr)] p-4">
                    <header className="bg-light-bg border-Bg-Dark flex border-b">
                        {activeTabList.map((tab) => (
                            <div
                                key={tab}
                                className="border-Bg-Dark flex w-full max-w-56 items-center justify-between gap-6 border-r bg-white px-2 py-1"
                            >
                                <h3 className="text-sm font-medium capitalize">
                                    {tab.replace("/", "")}
                                </h3>

                                <button
                                    data-url-prefix={urlPrefix}
                                    data-tab={tab}
                                    onClick={() => {
                                        if (urlPrefix === tab) return
                                        onTabClick((prev) =>
                                            prev.filter((id) => id !== tab),
                                        )
                                    }}
                                >
                                    <CrossCircleIcon className="size-4 cursor-pointer" />
                                </button>
                            </div>
                        ))}
                    </header>

                    <aside className="@container grid size-full max-h-[calc(100vh-10rem)] flex-1 grid-cols-[400px_1fr] bg-white">
                        <Outlet />
                    </aside>
                </section>
            </section>
        </main>
    )
}
