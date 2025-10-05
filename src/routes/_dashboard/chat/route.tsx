import { useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { useAppStore, useSelectedChat } from "@/store"

import ChatTab from "./-chat-tab"
import ChatView from "./-chat-view"

export const Route = createFileRoute("/_dashboard/chat/")({
    component: RouteComponent,
})

function RouteComponent() {
    const {
        chat: { chats, selectedChatId },
        setSelectedChat,
        createNewChat,
    } = useAppStore()

    const selectedChat = useSelectedChat()

    useEffect(() => {
        if (chats.length === 0) {
            createNewChat()
            return
        }

        if (!selectedChatId && chats.length > 0) {
            setSelectedChat(chats[0].id)
        }
    }, [chats, selectedChatId, setSelectedChat, createNewChat])

    if (!selectedChat) return null

    return (
        <>
            <ChatTab />
            {/* <SelectRobot /> */}
            <ChatView />
        </>
    )
}
