import React, { useState } from "react"

import { RobotMsg } from "@/components/robot-msg"
import { UserMsg } from "@/components/user-msg"
import { RobotIcon } from "@/icons/robot"

import { chats } from "../-sample"

import MessageForm from "./-message-form"

interface Props {
    chatId: string
}

function ChatView({ chatId }: Props) {
    const [isRenamingChat, setIsRenamingChat] = useState(false)
    const [chatName, setChatName] = useState("")

    const [selectedChat, setSelectedChat] = useState(() => {
        return chats.find((chat) => chat.id === chatId)
    })

    if (!selectedChat) return null

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userMsg = ((formData.get("userMessage") as string) || "").trim()

        if (!userMsg) return

        setSelectedChat((prev) => {
            if (!prev) return prev

            const messages = [...prev.messages]
            messages.push({
                message: userMsg,
                uid: "user-1",
                createdAt: new Date().toISOString(),
            })

            const updatedChat = { ...prev, messages }
            return updatedChat
        })

        setTimeout(() => {
            setSelectedChat((prev) => {
                if (!prev) return prev

                const messages = [...prev.messages]
                messages.push({
                    message: `I understand your message: "${userMsg}". This is a generic robot response for now`,
                    uid: "robot-1",
                    createdAt: new Date().toISOString(),
                })

                const updatedChat = { ...prev, messages }
                return updatedChat
            })
        }, 1000)

        e.currentTarget.reset()
    }

    const handleRenameChat = () => {
        setIsRenamingChat(true)
        setChatName(selectedChat.name)
    }

    const handleSaveRename = () => {
        if (!chatName.trim()) return
        setSelectedChat((prev) => {
            if (!prev) return prev
            const updatedChat = { ...prev, name: chatName.trim() }
            return updatedChat
        })
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
                            {messagePair.uid === "user-1" ? (
                                <UserMsg
                                    msg={messagePair.message}
                                    time={messagePair.createdAt}
                                />
                            ) : null}

                            {messagePair.uid === "robot-1" ? (
                                <RobotMsg
                                    response={messagePair.message}
                                    time={messagePair.createdAt}
                                    model={
                                        selectedChat.selectedModel ||
                                        "Deepseek-R1"
                                    }
                                />
                            ) : null}
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
