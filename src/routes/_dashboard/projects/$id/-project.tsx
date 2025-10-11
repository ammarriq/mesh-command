import type { Project as IProject } from "@/types/project"

import { useState } from "react"

import { move } from "@dnd-kit/helpers"
import { DragDropProvider } from "@dnd-kit/react"

import { categories } from "../-sample"

import Column from "./-column"
import ProjectHeader from "./-project-header"
import TaskCard from "./-task-card"

interface Props {
    projectId: IProject["id"]
}

function Project({ projectId }: Props) {
    const selectedProject = categories
        .flatMap((o) => o.projects)
        .find((project) => project.id === projectId)

    const [groupedTasks, setGroupedTasks] = useState(() => {
        const o = selectedProject?.tasks || []
        return {
            backlog: o.filter((task) => task.status === "backlog"),
            "in-progress": o.filter((task) => task.status === "in-progress"),
            completed: o.filter((task) => task.status === "completed"),
        }
    })

    if (!selectedProject) return null

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white p-2">
            <ProjectHeader project={selectedProject} />

            <section className="flex h-full gap-2 overflow-x-auto overflow-y-hidden pb-2">
                <DragDropProvider
                    onDragOver={(event) => {
                        setGroupedTasks((prevItems) => move(prevItems, event))
                    }}
                >
                    {Object.entries(groupedTasks).map(([columnName, tasks]) => (
                        <Column
                            key={columnName}
                            title={columnName}
                            taskCount={tasks.length}
                        >
                            {tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    column={columnName}
                                />
                            ))}
                        </Column>
                    ))}
                </DragDropProvider>
            </section>
        </div>
    )
}

export default Project
