import type { Project as IProject } from "@/types/project"

import { categories } from "@/routes/_dashboard/projects/-sample"
import Column from "@/routes/_dashboard/projects/$id/-column"
import ProjectHeader from "@/routes/_dashboard/projects/$id/-project-header"
import TaskCard from "@/routes/_dashboard/projects/$id/-task-card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface Props {
    projectId?: IProject["id"]
}

function Project({ projectId }: Props) {
    const selectedProject = categories
        .flatMap((o) => o.projects)
        .find((project) => project.id === (projectId ? +projectId : ""))

    const o = selectedProject?.tasks || []
    const groupedTasks = {
        backlog: o.filter((task) => task.status === "backlog"),
        "in-progress": o.filter((task) => task.status === "in-progress"),
        completed: o.filter((task) => task.status === "completed"),
    }

    if (!selectedProject) {
        return (
            <div className="grid size-full place-items-center p-4">
                <p className="text-foreground/60 text-sm">
                    Select a project to view details
                </p>
            </div>
        )
    }

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white p-2">
            <ProjectHeader project={selectedProject} />

            <Tabs
                defaultValue="backlog"
                className="-mx-2 flex h-full gap-2 overflow-x-auto overflow-y-hidden pb-2"
            >
                <TabsList className="w-full">
                    {Object.keys(groupedTasks).map((column) => (
                        <TabsTrigger
                            key={column}
                            value={column}
                            className="capitalize"
                        >
                            {column.replace("-", " ")}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {Object.entries(groupedTasks).map(([columnName, tasks]) => (
                    <TabsContent
                        value={columnName}
                        key={columnName}
                        className="h-full overflow-y-auto *:max-w-full"
                    >
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
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default Project
