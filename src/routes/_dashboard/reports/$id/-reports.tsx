import type { Project } from "@/store"

import { useMemo } from "react"

import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"
import { ChartPieDonut } from "@/components/ui/chart-pie-donut"
import { ChartTooltipAdvanced } from "@/components/ui/chart-tooltip-advanced"

import { categories } from "../../projects/-sample"
import { ProjectHeader } from "../../projects/$id/-project-header"

interface Props {
    projectId?: Project["id"]
}

function Reports({ projectId }: Props) {
    const chartPieDonutData = [
        { color: "#CB4A4A", label: "Finance" },
        { color: "#5F0101", label: "Facilities" },
        { color: "#F25555", label: "Human Resources" },
        { color: "#FFA4A4", label: "Labour" },
        { color: "var(--Bg-Dark)", label: "Other" },
    ]

    const selectedProject = useMemo(() => {
        return categories
            .flatMap((o) => o.projects)
            .find((project) => project.id === projectId)
    }, [])

    if (!selectedProject) return null

    return (
        <div className="px-2">
            <ProjectHeader project={selectedProject} />

            <ChartAreaInteractive />

            <h2 className="mt-8 mb-4 border-b pb-3 text-lg font-semibold">
                Departmental Budget Usage
            </h2>

            <div className="flex gap-8">
                <aside className="flex-1">
                    <ChartTooltipAdvanced />
                </aside>

                <aside className="flex">
                    <ChartPieDonut />

                    <ul className="pt-8 pr-8">
                        {chartPieDonutData.map((item) => (
                            <li
                                key={item.label}
                                className="mb-2 flex items-center gap-2"
                            >
                                <span
                                    className="size-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-foreground text-sm whitespace-nowrap">
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    )
}

export default Reports
