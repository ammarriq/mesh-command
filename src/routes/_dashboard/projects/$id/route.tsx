import { createFileRoute } from "@tanstack/react-router"

import Project from "./-project"

export const Route = createFileRoute("/_dashboard/projects/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const params = Route.useParams()

    return <Project projectId={+params.id} />
}
