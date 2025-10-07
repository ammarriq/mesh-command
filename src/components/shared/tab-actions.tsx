"use client"

import EditIcon from "@/icons/edit"

import { SearchInput } from "./search-input"

interface TabActionsProps {
    onCreateNewItem?: () => void
    type: "chat" | "project"
    showCreateButton?: boolean
}

export default function TabActions({
    onCreateNewItem,
    type,
    showCreateButton = true,
}: TabActionsProps) {
    return (
        <div className="flex w-full items-stretch justify-end gap-2 p-2">
            <SearchInput isChatTab={true} />

            {type === "chat" && (
                <button onClick={onCreateNewItem} className="bg-primary px-3">
                    <EditIcon className="size-6" />
                </button>
            )}

            {type === "project" && showCreateButton && (
                <button className="bg-primary w-fit rounded-xs px-6 text-sm leading-5 font-medium whitespace-nowrap text-white shadow-sm">
                    New Project
                </button>
            )}
        </div>
    )
}
