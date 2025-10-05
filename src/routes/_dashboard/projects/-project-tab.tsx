import { useCallback } from "react"
import { useNavigate } from "@tanstack/react-router"

import ProjectContentItem from "@/components/shared/project-content-item"
import TabActions from "@/components/shared/tab-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { categories } from "./-sample"

const tabsConfig = [
    { value: "active", label: "Active", status: "active" as const },
    { value: "onhold", label: "On-hold", status: "on-hold" as const },
    { value: "completed", label: "Completed", status: "completed" as const },
]

interface Props {
    showCreateButton?: boolean
    onCreateProject?: () => void
}

export default function ProjectSelectorTab({
    showCreateButton = false,
}: Props) {
    const navigate = useNavigate()

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
                    className="border-r-Bg-Dark flex flex-col gap-3 border-r p-2"
                >
                    {getCategories(tab.status).map((category) => (
                        <ProjectContentItem
                            key={category.id}
                            title={category.name}
                            showCreateButton={showCreateButton}
                            projects={category.projects.filter(({ status }) => {
                                return status.toLowerCase() === tab.status
                            })}
                            onSelectProject={(id) => {
                                navigate({
                                    to: "/projects/$id",
                                    params: { id },
                                })
                            }}
                        />
                    ))}
                </TabsContent>
            ))}
        </Tabs>
    )
}
