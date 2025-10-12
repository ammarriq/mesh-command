import type { Project } from "@/types/project"

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"
import { ChartPieDonut } from "@/components/ui/chart-pie-donut"
import { ChartTooltipAdvanced } from "@/components/ui/chart-tooltip-advanced"
import { categories } from "@/routes/_dashboard/projects/-sample"
import ProjectHeader from "@/routes/_dashboard/projects/$id/-project-header"

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

    const selectedProject = categories
        .flatMap((o) => o.projects)
        .find((project) => project.id === projectId)

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
        <div className="grid h-full grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden px-2">
            <ProjectHeader project={selectedProject} />

            <h2 className="border-b pb-6 text-xl font-semibold">Overview</h2>

            <section className="h-full overflow-y-auto">
                <div className="mb-4 grid @4xl:grid-cols-2 @7xl:grid-cols-4">
                    <div className="border-primary space-y-2 border-b-4 py-6">
                        <span className="text-foreground/50 block text-base font-medium">
                            Total budget
                        </span>
                        <h3 className="text-4xl font-semibold">$250K</h3>
                    </div>
                    <div className="space-y-2 py-6">
                        <span className="text-foreground/50 block text-base font-medium">
                            Available
                        </span>
                        <h3 className="text-4xl font-semibold">$10.2K</h3>
                    </div>
                    <div className="space-y-2 py-6">
                        <span className="block text-base font-medium text-red-500">
                            Burn rate
                        </span>

                        <hgroup className="flex items-center gap-3">
                            <h3 className="text-4xl font-semibold">46.2%</h3>
                            <div className="flex max-w-fit items-center gap-1 rounded-full border border-red-600 px-1.5 py-0.5 text-sm font-semibold select-none">
                                <TrendingDownIcon className="size-4 text-red-600" />
                                <span className="text-red-600">0.2%</span>
                            </div>
                        </hgroup>
                    </div>
                    <div className="space-y-2 py-6">
                        <span className="block text-base font-medium text-amber-900">
                            Task completion
                        </span>

                        <hgroup className="flex items-center gap-3">
                            <h3 className="text-4xl font-semibold">46.2%</h3>
                            <div className="flex max-w-fit items-center gap-1 rounded-full border border-green-600 px-1.5 py-0.5 text-sm font-semibold select-none">
                                <TrendingUpIcon className="size-4 text-green-600" />
                                <span className="text-green-600">12%</span>
                            </div>
                        </hgroup>
                    </div>
                </div>

                <ChartAreaInteractive />

                <h2 className="mt-8 mb-4 border-b pb-3 text-lg font-semibold">
                    Departmental Budget Usage
                </h2>

                <div className="flex flex-col-reverse gap-8 @7xl:flex-row">
                    <aside className="flex-1">
                        <ChartTooltipAdvanced />
                    </aside>

                    <aside className="flex w-full">
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
            </section>
        </div>
    )
}

export default Reports
