import { ActionButton } from "@/components/shared/action-button"
import { AvatarGroup } from "@/components/shared/avatar-group"
import PeopleIcon from "@/icons/people"
import { RobotIcon } from "@/icons/robot"

interface ChatHeaderProps {
    selectedProject: {
        title: string
        users?: Array<{ name: string; image?: string }>
    } | null
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
    selectedProject,
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
                {selectedProject ? (
                    <div className="flex flex-col items-start justify-start gap-2 2xl:flex-row">
                        <div className="flex items-center justify-start gap-1 text-sm font-semibold 2xl:items-start">
                            <PeopleIcon />
                            {selectedProject.title}
                        </div>
                        <div className="flex items-center gap-2 2xl:self-end">
                            <AvatarGroup users={selectedProject.users} />
                            <ActionButton type="3-dots" size={8} />
                        </div>
                    </div>
                ) : isRenamingChat ? (
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

            {!isRenamingChat && !selectedProject && (
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
