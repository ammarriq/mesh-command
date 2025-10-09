import {
    createFileRoute,
    Outlet,
    useNavigate,
    useParams,
} from "@tanstack/react-router"

import ProjectSelectorTab from "../projects/-project-tab"

export const Route = createFileRoute("/_dashboard/reports")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const params = useParams({
        from: "/_dashboard/reports/$id/",
        shouldThrow: false,
    })

    return (
        <>
            <ProjectSelectorTab
                showCreateButton={true}
                selectedProject={params?.id ? +params.id : undefined}
                onSelectProject={(id) => {
                    navigate({
                        to: "/reports/$id",
                        params: { id: id.toString() },
                    })
                }}
                onCreateProject={() => {}}
            />

            <Outlet />
        </>
    )
}
