import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router"

import Docket from "@/components/split-screen/docket"
import Project from "@/components/split-screen/project"
import Reports from "@/components/split-screen/reports"
import { useSplitScreen } from "@/context/split-screen"
import CrossCircleIcon from "@/icons/cross-circle"
import NavBar from "@/routes/_dashboard/-nav-bar"
import Sidebar from "@/routes/_dashboard/-sidebar"

export const Route = createFileRoute("/_dashboard")({
    component: LayoutComponent,
})

function LayoutComponent() {
    const { activeTabs, selectedProject, onTabClick } = useSplitScreen()
    const { pathname } = useLocation()

    const urlPrefix = "/" + pathname.split("/").filter(Boolean)[0]
    const activeTabList = [
        urlPrefix,
        ...activeTabs.filter((tab) => !tab.startsWith(urlPrefix)),
    ]

    return (
        <main className="grid size-full grid-rows-[auto_minmax(0,1fr)] justify-stretch">
            <NavBar activePath={urlPrefix} />

            <section className="grid h-full grid-cols-[auto_minmax(0,1fr)]">
                <Sidebar />

                <div
                    data-split-view={activeTabList.length > 1}
                    className="bg-Bg-Dark grid w-full gap-4 p-4 data-[split-view=true]:grid-cols-[minmax(0,1fr)_480px]"
                >
                    {activeTabList.map((tab) => (
                        <section
                            key={tab}
                            className="grid size-full grid-rows-[auto_minmax(0,1fr)]"
                        >
                            <header className="bg-light-bg border-Bg-Dark flex border-b">
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
                            </header>

                            <aside
                                data-active-url={urlPrefix === tab}
                                className="@container size-full max-h-[calc(100vh-10rem)] flex-1 grid-cols-[400px_1fr] overflow-hidden bg-white data-[active-url=true]:grid"
                            >
                                {urlPrefix === tab ? (
                                    <Outlet />
                                ) : tab === "/projects" ? (
                                    <Project
                                        projectId={selectedProject ?? undefined}
                                    />
                                ) : tab === "/dockets" ? (
                                    <Docket
                                        projectId={selectedProject ?? undefined}
                                    />
                                ) : tab === "/reports" ? (
                                    <Reports
                                        projectId={selectedProject ?? undefined}
                                    />
                                ) : null}
                            </aside>
                        </section>
                    ))}
                </div>
            </section>
        </main>
    )
}
