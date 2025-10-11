import React from "react"

import { CollisionPriority } from "@dnd-kit/abstract"
import { useDroppable } from "@dnd-kit/react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props {
    title: string
    taskCount: number
    children: React.ReactNode
}

function Column({ title, taskCount, children }: Props) {
    const { ref } = useDroppable({
        id: title,
        type: "column",
        accept: ["task"],
        collisionPriority: CollisionPriority.Low,
    })

    return (
        <section className="bg-light-bg flex size-full max-w-105 min-w-92 shrink-0 flex-col overflow-hidden rounded-sm">
            <header className={cn("flex items-center justify-between px-3")}>
                <div
                    className={cn(
                        "flex w-full items-center justify-between gap-2 border-b-3 py-4",
                        title === "backlog" ? "border-indigo-600" : "",
                        title === "in-progress" ? "border-yellow-600" : "",
                        title === "completed" ? "border-green-600" : "",
                    )}
                >
                    <hgroup className="flex items-center gap-2">
                        <div
                            className={cn(
                                "size-2 rounded-full",
                                title === "backlog" ? "bg-indigo-600" : "",
                                title === "in-progress" ? "bg-yellow-600" : "",
                                title === "completed" ? "bg-green-600" : "",
                            )}
                        />

                        <h3 className="text-text-primary font-semibold capitalize">
                            {title.replace("-", " ")}
                        </h3>

                        <span className="bg-Bg-Dark text-text-secondary flex size-5 items-center justify-center rounded-full text-xs font-medium">
                            {taskCount}
                        </span>
                    </hgroup>

                    {title === "backlog" && (
                        <button className="grid size-6 place-items-center rounded-sm bg-indigo-600/10">
                            <Plus className="size-4 text-indigo-600" />
                        </button>
                    )}
                </div>
            </header>

            <div
                className="min-h-0 flex-1 space-y-3 overflow-y-auto px-2 py-4"
                ref={ref}
            >
                {children}
            </div>
        </section>
    )
}

export default Column
