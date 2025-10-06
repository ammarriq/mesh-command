import {
    createFileRoute,
    Outlet,
    useNavigate,
    useParams,
} from "@tanstack/react-router"

import ProjectSelectorTab from "./-project-tab"

export const Route = createFileRoute("/_dashboard/projects")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const params = useParams({
        from: "/_dashboard/projects/$id/",
        shouldThrow: false,
    })

    return (
        <>
            <ProjectSelectorTab
                showCreateButton={true}
                selectedProject={params ? +params.id : undefined}
                onSelectProject={(id) => {
                    navigate({
                        to: "/projects/$id",
                        params: { id: id.toString() },
                    })
                }}
                onCreateProject={() => {}}
            />

            <Outlet />
        </>
    )
}
