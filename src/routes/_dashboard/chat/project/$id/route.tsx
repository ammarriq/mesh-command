import Project from "@/routes/_dashboard/projects/$id/-project"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/chat/project/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const params = Route.useParams()

    return <Project projectId={+params.id} />
}
