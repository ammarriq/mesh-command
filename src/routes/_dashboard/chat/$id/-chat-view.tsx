import type { MessagePair, SelectedModel } from "@/types/chat"

import React, { useState } from "react"

import { RobotMsg } from "@/components/shared/robot-msg"
import { UserMsg } from "@/components/shared/user-msg"
import DeepseekIcon from "@/icons/deep-seek"
import LinkSquareIcon from "@/icons/link-square"
import { OpenaiIcon } from "@/icons/open-ai"
import Send2Icon from "@/icons/send-2"
import TwoUsersIcon from "@/icons/two-users"
import {
    useChatStore,
    useSelectedChat,
    useSelectedProject,
    useSplitScreen,
} from "@/store"

import { ChatHeader } from "./-chat-header"

export default function ChatView() {
    const [attachedFiles, setAttachedFiles] = useState<Array<File>>([])
    const [isRenamingChat, setIsRenamingChat] = useState(false)
    const [chatName, setChatName] = useState("")
    const [pendingMessageIndex, setPendingMessageIndex] = useState<
        number | null
    >(null)

    const selectedChat = useSelectedChat()
    const updateChat = useChatStore((state) => state.updateChat)
    const isSplitScreen = useSplitScreen()
    const selectedProject = useSelectedProject()

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
        const newMessageIndex = currentMessages.length

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
        setPendingMessageIndex(newMessageIndex)

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
            setPendingMessageIndex(null)
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

    const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setAttachedFiles((prev) => [...prev, ...Array.from(files)])
        }
    }

    const removeAttachedFile = (index: number) => {
        setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <section className="flex w-full flex-col">
            <ChatHeader
                isSplitScreen={isSplitScreen}
                selectedProject={selectedProject}
                isRenamingChat={isRenamingChat}
                chatName={chatName}
                selectedChat={selectedChat}
                onChatNameChange={setChatName}
                onSaveRename={handleSaveRename}
                onCancelRename={handleCancelRename}
                onRenameChat={handleRenameChat}
            />

            <section className="flex h-full max-h-[calc(100vh-13.5rem)] flex-col overflow-y-auto">
                <MessagesContainer>
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
                </MessagesContainer>

                <FileAttachment
                    files={attachedFiles}
                    onRemove={removeAttachedFile}
                />

                <MessageInputForm
                    onSubmit={handleSendMessage}
                    onFileAttach={handleFileAttach}
                    selectedModel={selectedChat.selectedModel || "Deepseek-R1"}
                />
            </section>
        </section>
    )
}

interface MessagesContainerProps {
    children: React.ReactNode
}

function MessagesContainer({ children }: MessagesContainerProps) {
    return <div className="flex-1 space-y-1 py-4 pl-4">{children}</div>
}

const getModelDisplay = (
    model: SelectedModel,
): {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    color: string
    strokeColor: string
} => {
    if (model === "OpenAI 04") {
        return {
            icon: OpenaiIcon,
            color: "text-text-primary",
            strokeColor: "fill-text-primary",
        }
    }
    return {
        icon: DeepseekIcon,
        color: "text-[#4D6BFE]",
        strokeColor: "stroke-[#4D6BFE]",
    }
}

interface MessageInputFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onFileAttach: (event: React.ChangeEvent<HTMLInputElement>) => void
    selectedModel: SelectedModel
}

function MessageInputForm({
    onSubmit,
    onFileAttach,
    selectedModel,
}: MessageInputFormProps) {
    const modelInfo = getModelDisplay(selectedModel)
    const IconComponent = modelInfo.icon

    return (
        <form
            onSubmit={onSubmit}
            className="sticky bottom-0 bg-white pt-4 pl-4"
        >
            <textarea
                className="border-Bg-Dark bg-light-bg placeholder:text-text-secondary max-h-24 w-full resize-none rounded-xs border px-[11px] py-3 shadow-[0_0_0_1px_rgba(29,201,160,0.05)] outline-none"
                rows={4}
                placeholder="Write message here....."
                name="userMessage"
            />
            <div className="flex items-center justify-between bg-white">
                <label className="text-primary hover:text-primary/90 inline-flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium">
                    <LinkSquareIcon className="text-primary size-6" /> Attach
                    files
                    <input
                        type="file"
                        multiple
                        onChange={onFileAttach}
                        className="hidden"
                        accept="*/*"
                    />
                </label>
                <div className="flex items-center justify-end gap-4">
                    <div
                        className={`flex h-12 items-center justify-center gap-2 ${modelInfo.color}`}
                    >
                        <IconComponent
                            className={`${modelInfo.strokeColor} h-auto w-6`}
                        />
                        <span className="font-medium">{selectedModel}</span>
                    </div>
                    <button
                        className="bg-primary inline-flex items-center gap-2 rounded-xs px-3 py-[11px] text-sm font-medium text-white disabled:opacity-50"
                        type="submit"
                    >
                        <Send2Icon className="size-6" />
                        Send
                    </button>
                </div>
            </div>
        </form>
    )
}

function AddedNewUserMsg() {
    return (
        <div className="flex items-start gap-1">
            <TwoUsersIcon fill="#5f0101" className="size-5" />
            <p className="text-text-secondary text-sm">
                John Smith Was added to the channel by{" "}
                <span className="text-text-primary font-semibold">
                    Deepseek
                </span>{" "}
                agent.
            </p>
        </div>
    )
}

interface AttachedFileProps {
    file: File
    onRemove: () => void
}

interface FileAttachmentProps {
    files: Array<File>
    onRemove: (index: number) => void
}

function AttachedFile({ file, onRemove }: AttachedFileProps) {
    return (
        <div className="flex items-center gap-2 rounded bg-white px-2 py-1 text-xs">
            <span className="text-text-primary">{file.name}</span>
            <button
                onClick={onRemove}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove ${file.name}`}
            >
                ×
            </button>
        </div>
    )
}

function FileAttachment({ files, onRemove }: FileAttachmentProps) {
    if (files.length === 0) return null

    return (
        <div className="bg-light-bg border-b border-gray-200 p-3">
            <p className="text-text-secondary mb-2 text-xs">Attached Files:</p>
            <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                    <AttachedFile
                        key={index}
                        file={file}
                        onRemove={() => onRemove(index)}
                    />
                ))}
            </div>
        </div>
    )
}
