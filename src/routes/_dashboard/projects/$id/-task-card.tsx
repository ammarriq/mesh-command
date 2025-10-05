import type { Task } from "@/store"

import { CheckCircle2, MoreHorizontal, Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import OpenFolderIcon from "@/icons/open-folder"
import TimerIcon from "@/icons/timer"
import TwoUsersIcon from "@/icons/two-users"
import { cn } from "@/lib/utils"

const PRIORITY_COLORS = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-gray-100 text-gray-600",
    Low: "bg-green-100 text-green-600",
}

function TaskCard({ task }: { task: Task }) {
    return (
        <aside className="flex flex-col items-stretch rounded-2xl bg-white p-4">
            <header className="flex items-center justify-between">
                <span
                    className={cn(
                        "rounded-sm px-1 py-0.5 text-xs font-medium",
                        PRIORITY_COLORS[task.priority],
                    )}
                >
                    {task.priority}
                </span>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal className="text-text-primary size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="space-x-2">
                            <span> Mark as completed</span>
                            <CheckCircle2 className="text-green-500" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <div className="mt-2 flex flex-col items-start gap-1.5">
                <h4 className="text-text-primary text-base font-semibold">
                    {task.title}
                </h4>
                <p className="text-text-secondary line-clamp-2 text-xs">
                    {task.description} lrem ipsum dolor sit
                </p>
            </div>

            <div className="space-y-2 pt-2">
                <div className="flex items-center gap-1 text-xs font-semibold">
                    <TwoUsersIcon
                        fill="var(--primary)"
                        stroke="var(--primary)"
                        className="size-5"
                    />
                    <span className="text-primary">Assigned to:</span>
                    <p>{task.assignedTo}</p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold">
                    <TimerIcon
                        fill="var(--primary)"
                        stroke="var(--primary)"
                        className="size-5"
                    />
                    <span className="text-primary">Deadline:</span>
                    <p>{task.deadline}</p>
                </div>

                {task.linkedDocs && task.linkedDocs.length > 0 ? (
                    <div className="flex items-center gap-1 text-xs font-semibold">
                        <OpenFolderIcon
                            fill="var(--primary)"
                            stroke="var(--primary)"
                            className="size-5"
                        />
                        <span className="text-primary">Linked Docs:</span>
                        <a href="#" className="underline">
                            {task.linkedDocs.join(", ")}
                        </a>
                    </div>
                ) : null}
            </div>

            <footer className="mt-3 flex items-center">
                {task.users.map((user, index) => (
                    <Avatar
                        className={cn(
                            "size-9 rounded-sm border-2 border-white",
                            index !== 0 ? "-ml-4" : "",
                        )}
                    >
                        <AvatarImage
                            className="object-cover object-top"
                            src={user.image}
                        />
                        <AvatarFallback className="rounded-sm border-2 border-white text-sm">
                            {user.name
                                .split(" ")
                                .map((o) => o[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                ))}

                <Button
                    size="icon"
                    className="z-10 -ml-4 border-2 border-white text-white"
                >
                    <Plus />
                </Button>
            </footer>
        </aside>
    )
}

export default TaskCard
