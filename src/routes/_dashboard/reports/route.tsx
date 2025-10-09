import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/reports/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex flex-1 items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a project to view details</p>
        </div>
    )
}
