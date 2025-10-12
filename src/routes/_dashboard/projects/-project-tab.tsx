import type { Project } from "@/types/project"

import { useCallback } from "react"

import ProjectList from "@/components/project-list"
import TabActions from "@/components/tab-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { categories } from "./-sample"
import { useSplitScreen } from "@/context/split-screen"

const tabsConfig = [
    { value: "active", label: "Active", status: "active" as const },
    { value: "onhold", label: "On-hold", status: "on-hold" as const },
    { value: "completed", label: "Completed", status: "completed" as const },
]

interface Props {
    showCreateButton?: boolean
    selectedProject?: Project["id"]
    onSelectProject: (projectId: Project["id"]) => void
    onCreateProject?: () => void
}

export default function ProjectSelectorTab({
    selectedProject,
    onSelectProject,
    showCreateButton = false,
}: Props) {
    const { onProjectSelect } = useSplitScreen()

    const getCategories = useCallback(
        (status: "active" | "on-hold" | "completed") => {
            const filtered = categories.filter(({ projects }) => {
                return projects.some((project) => {
                    const isSatusMatch = project.status.toLowerCase() === status
                    return isSatusMatch
                })
            })

            return filtered
        },
        [],
    )

    return (
        <Tabs
            defaultValue="active"
            className="border-r-Bg-Dark max-h-[calc(100vh-10rem)] w-full border-r"
        >
            <TabsList className="h-14 w-full p-0">
                {tabsConfig.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabActions showCreateButton={showCreateButton} type="project" />

            {tabsConfig.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="border-r-Bg-Dark flex flex-col gap-3 p-2"
                >
                    {getCategories(tab.status).map((category) => (
                        <ProjectList
                            key={category.id}
                            title={category.name}
                            showCreateButton={showCreateButton}
                            selectedProject={selectedProject}
                            projects={category.projects.filter(({ status }) => {
                                return status.toLowerCase() === tab.status
                            })}
                            onSelectProject={(url) => {
                                onSelectProject(url)
                                onProjectSelect(`${url}`)
                            }}
                        />
                    ))}
                </TabsContent>
            ))}
        </Tabs>
    )
}
