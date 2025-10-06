import type { Project } from "@/store"

import { useMemo } from "react"

import { categories } from "../-sample"

import Column from "./-column"
import { ProjectHeader } from "./-project-header"
import TaskCard from "./-task-card"

interface Props {
    projectId: Project["id"]
}

function Project({ projectId }: Props) {
    const selectedProject = useMemo(() => {
        return categories
            .flatMap((o) => o.projects)
            .find((project) => project.id === projectId)
    }, [])

    if (!selectedProject) return null

    const tasksByStatus = Object.groupBy(
        selectedProject.tasks,
        (task) => task.status,
    )

    return (
        <div className="@container flex flex-1 flex-col overflow-hidden bg-white p-2">
            <ProjectHeader project={selectedProject} />

            <section className="flex size-full gap-2 overflow-x-auto">
                {Object.entries(tasksByStatus).map(([status, tasks]) => (
                    <Column title={status} taskCount={tasks.length}>
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </Column>
                ))}
            </section>
        </div>
    )
}

export default Project
