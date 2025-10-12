import type { Project } from "@/types/project"

import { ChevronDown } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useSplitScreen } from "@/context/split-screen"

interface Props {
    title: string
    selectedProject?: Project["id"]

    projects: Project[]

    showCreateButton?: boolean
    isChatTab?: boolean
    onSelectProject: (id: Project["id"]) => void
}

function ProjectList({
    title,
    selectedProject,
    projects,
    showCreateButton = false,
    isChatTab = false,
    onSelectProject,
}: Props) {
    const { selectedProject: projectId, onProjectSelect } = useSplitScreen()

    const texts = {
        Active: "In-Progress",
        "On-Hold": "On-hold",
        Completed: "Completed",
    }

    const colors = {
        Active: "text-yellow-600",
        "On-Hold": "text-primary",
        Completed: "text-green-600",
    }

    return (
        <Collapsible className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2">
                <CollapsibleTrigger className="group flex items-center gap-2">
                    <div className="bg-primary grid size-6 place-items-center rounded-md text-white">
                        <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                    <span className="sr-only">Toggle</span>
                    <h4 className="text-primary font-semibold">{title}</h4>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                {projects.length === 0 ? (
                    <div className="flex flex-col gap-2 py-2">
                        <p className="text-text-secondary text-sm">
                            No project available.
                        </p>

                        {showCreateButton && (
                            <button className="bg-primary w-fit rounded-xs px-4 py-2 text-sm leading-5 font-medium text-white shadow-sm">
                                Create new project
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-0.5">
                        {projects.map((project) => (
                            <button
                                key={project.id}
                                data-selected={
                                    selectedProject === project.id ||
                                    (projectId ? +projectId : "") === project.id
                                }
                                className="text-text-primary data-[selected=true]:bg-muted flex w-full items-center gap-1 rounded-xs p-2 text-left text-sm"
                                onClick={() => {
                                    onSelectProject(project.id)
                                    onProjectSelect(project.id)
                                }}
                            >
                                <span>{project.title}</span>

                                {isChatTab ? null : (
                                    <span
                                        className={`font-semibold ${colors[project.status]}`}
                                    >
                                        {texts[project.status]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default ProjectList
