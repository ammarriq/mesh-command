import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/directory/")({
    beforeLoad: () => {
        throw redirect({ to: "/directory/employees" })
    },
})
