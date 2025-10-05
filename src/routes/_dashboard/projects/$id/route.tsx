import { createFileRoute } from "@tanstack/react-router"

import ProjectSelectorTab from "../-project-tab"

import Project from "./-project"

export const Route = createFileRoute("/_dashboard/projects/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const params = Route.useParams()

    return (
        <>
            <ProjectSelectorTab
                showCreateButton={true}
                onCreateProject={() => {}}
            />

            <Project projectId={+params.id} />
        </>
    )
}
