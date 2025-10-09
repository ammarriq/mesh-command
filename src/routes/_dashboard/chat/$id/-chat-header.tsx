import { RobotIcon } from "@/icons/robot"

interface ChatHeaderProps {
    isRenamingChat: boolean
    chatName: string
    selectedChat: {
        name: string
    }
    onChatNameChange: (name: string) => void
    onSaveRename: () => void
    onCancelRename: () => void
    onRenameChat: () => void
}

export function ChatHeader({
    isRenamingChat,
    chatName,
    selectedChat,
    onChatNameChange,
    onSaveRename,
    onCancelRename,
    onRenameChat,
}: ChatHeaderProps) {
    return (
        <header className="border-b-Bg-Dark flex h-14 items-center justify-between border-b p-4">
            <div className="text-text-primary flex flex-col items-center gap-2 gap-y-3 2xl:flex-row 2xl:items-start">
                {isRenamingChat ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={chatName}
                            onChange={(e) => onChatNameChange(e.target.value)}
                            className="border-primary rounded border bg-transparent px-2 py-1 text-sm outline-none"
                            autoFocus
                        />
                        <button
                            onClick={onSaveRename}
                            className="text-xs font-semibold text-green-600 hover:text-green-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancelRename}
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
                    onClick={onRenameChat}
                    className="text-primary hover:text-primary/90 text-xs font-semibold"
                >
                    Rename Chat
                </button>
            )}
        </header>
    )
}
