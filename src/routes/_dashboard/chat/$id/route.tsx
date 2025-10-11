import { createFileRoute } from "@tanstack/react-router"

import ChatView from "./-chat-view"

export const Route = createFileRoute("/_dashboard/chat/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const params = Route.useParams()
    return <ChatView chatId={params.id} />
}
