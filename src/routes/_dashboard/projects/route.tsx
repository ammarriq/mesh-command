import { createFileRoute } from "@tanstack/react-router"

import ProjectSelectorTab from "./-project-tab"

export const Route = createFileRoute("/_dashboard/projects/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <ProjectSelectorTab
                showCreateButton={true}
                onCreateProject={() => {}}
            />

            <div className="flex flex-1 items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Select a project to view details
                </p>
            </div>
        </>
    )
}
