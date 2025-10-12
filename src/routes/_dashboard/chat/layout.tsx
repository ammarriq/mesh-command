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
    const chatParams = useParams({
        from: "/_dashboard/chat/$id/",
        shouldThrow: false,
    })

    const projectParams = useParams({
        from: "/_dashboard/chat/project/$id/",
        shouldThrow: false,
    })

    return (
        <>
            <ChatTab
                selectedChat={chatParams?.id}
                selectedProject={projectParams ? +projectParams?.id : undefined}
                onSelectChat={(id) => {
                    navigate({
                        to: "/chat/$id",
                        params: { id },
                    })
                }}
                onSelectProject={(id) => {
                    navigate({
                        to: "/chat/project/$id",
                        params: { id: `${id}` },
                    })
                }}
            />
            <Outlet />
        </>
    )
}
