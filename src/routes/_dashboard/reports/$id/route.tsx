import { createFileRoute } from "@tanstack/react-router"

import Reports from "./-reports"

export const Route = createFileRoute("/_dashboard/reports/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const params = Route.useParams()

    return <Reports projectId={+params.id} />
}
