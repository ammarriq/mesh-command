import type { MessagePair } from "@/types/chat"

import React, { useState } from "react"

import { RobotMsg } from "@/components/shared/robot-msg"
import { UserMsg } from "@/components/shared/user-msg"
import { RobotIcon } from "@/icons/robot"
import { useChatStore, useSelectedChat } from "@/store"

import MessageForm from "./-message-form"

function ChatView() {
    const [isRenamingChat, setIsRenamingChat] = useState(false)
    const [chatName, setChatName] = useState("")

    const selectedChat = useSelectedChat()
    const updateChat = useChatStore((state) => state.updateChat)

    if (!selectedChat) return null

    const createUserMessage = (userMsg: string) => ({
        message: userMsg,
        createdAt: new Date().toISOString(),
    })

    const createRobotResponse = (userMsg: string) => ({
        response: `I understand your message: "${userMsg}". This is a generic robot response for now.`,
        createdAt: new Date().toISOString(),
    })

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userMsg = ((formData.get("userMessage") as string) || "").trim()

        if (!userMsg) return

        const userMessage = createUserMessage(userMsg)
        const currentMessages = selectedChat.messages

        const tempMessagePair: MessagePair = [
            userMessage,
            { response: "", createdAt: "" },
        ]

        const updatedChat = {
            ...selectedChat,
            messages: [...currentMessages, tempMessagePair],
        }

        updateChat(updatedChat)
        e.currentTarget.reset()

        setTimeout(() => {
            const robotResponse = createRobotResponse(userMsg)
            const completeMessagePair: MessagePair = [
                userMessage,
                robotResponse,
            ]

            const finalUpdatedChat = {
                ...selectedChat,
                messages: [...currentMessages, completeMessagePair],
            }

            updateChat(finalUpdatedChat)
        }, 2000)
    }

    const handleRenameChat = () => {
        setIsRenamingChat(true)
        setChatName(selectedChat.name)
    }

    const handleSaveRename = () => {
        if (!chatName.trim()) return
        updateChat({ ...selectedChat, name: chatName.trim() })
        setIsRenamingChat(false)
    }

    const handleCancelRename = () => {
        setIsRenamingChat(false)
        setChatName("")
    }

    return (
        <section className="flex w-full flex-col">
            <header className="border-b-Bg-Dark flex h-14 items-center justify-between border-b p-4">
                <div className="text-text-primary flex flex-col items-center gap-2 gap-y-3 2xl:flex-row 2xl:items-start">
                    {isRenamingChat ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={chatName}
                                onChange={(e) => setChatName(e.target.value)}
                                className="border-primary rounded border bg-transparent px-2 py-1 text-sm outline-none"
                                autoFocus
                            />
                            <button
                                onClick={handleSaveRename}
                                className="text-xs font-semibold text-green-600 hover:text-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelRename}
                                className="text-xs font-semibold text-red-600 hover:text-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <p className="inline-flex items-center gap-2">
                            <RobotIcon className="size-6" />
                            <span className="text-text-primary text-sm">
                                {selectedChat.name}
                            </span>
                        </p>
                    )}
                </div>

                {!isRenamingChat && (
                    <button
                        onClick={handleRenameChat}
                        className="text-primary hover:text-primary/90 text-xs font-semibold"
                    >
                        Rename Chat
                    </button>
                )}
            </header>

            <section className="flex h-full max-h-[calc(100vh-13.5rem)] flex-col overflow-y-auto">
                <div className="flex-1 space-y-1 py-4 pl-4">
                    {selectedChat.messages.map((messagePair, index) => (
                        <React.Fragment key={index}>
                            <UserMsg
                                msg={messagePair[0].message}
                                time={messagePair[0].createdAt}
                            />

                            <RobotMsg
                                response={messagePair[1].response}
                                time={messagePair[1].createdAt}
                                model={
                                    selectedChat.selectedModel || "Deepseek-R1"
                                }
                            />
                        </React.Fragment>
                    ))}
                </div>

                <MessageForm
                    onSubmit={handleSendMessage}
                    selectedModel={selectedChat.selectedModel || "Deepseek-R1"}
                />
            </section>
        </section>
    )
}

export default ChatView
