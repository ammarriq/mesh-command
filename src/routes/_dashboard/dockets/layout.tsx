import {
    createFileRoute,
    Outlet,
    useNavigate,
    useParams,
} from "@tanstack/react-router"

import ProjectSelectorTab from "../projects/-project-tab"

export const Route = createFileRoute("/_dashboard/dockets")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const params = useParams({
        from: "/_dashboard/dockets/$id/",
        shouldThrow: false,
    })

    return (
        <>
            <ProjectSelectorTab
                showCreateButton={false}
                selectedProject={params?.id ? +params.id : undefined}
                onSelectProject={(id) => {
                    navigate({
                        to: "/dockets/$id",
                        params: { id: id.toString() },
                    })
                }}
            />
            <Outlet />
        </>
    )
}
