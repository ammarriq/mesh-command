import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props {
    title: string
    taskCount: number
    children: React.ReactNode
}

function Column({ title, taskCount, children }: Props) {
    return (
        <section className="bg-light-bg flex w-full max-w-105 shrink-0 flex-col rounded-sm">
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

            <div className="flex-1 space-y-3 overflow-y-auto px-2 py-4">
                {children}
            </div>
        </section>
    )
}

export default Column
