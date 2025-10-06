import {
    createFileRoute,
    Outlet,
    useNavigate,
    useParams,
} from "@tanstack/react-router"

import ChatTab from "./-chat-tab"

export const Route = createFileRoute("/_dashboard/chat")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const params = useParams({
        from: "/_dashboard/chat/$id/",
        shouldThrow: false,
    })

    return (
        <>
            <ChatTab
                selectedChat={params?.id}
                onSelectChat={(id) => {
                    navigate({ to: "/chat/$id", params: { id } })
                }}
                onSelectProject={() => {}}
            />
            <Outlet />
        </>
    )
}
