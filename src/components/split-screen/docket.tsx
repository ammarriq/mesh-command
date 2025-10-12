import type { Project as IProject } from "@/types/project"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadCloudIcon } from "@/icons/download-cloud"
import { InvoiceTable } from "@/routes/_dashboard/dockets/$id/-invoice-table"
import { categories } from "@/routes/_dashboard/projects/-sample"
import ProjectHeader from "@/routes/_dashboard/projects/$id/-project-header"

interface Props {
    projectId?: IProject["id"]
}

function PlaceholderContent({ title }: { title: string }) {
    return (
        <div className="bg-Bg-Dark flex h-32 items-center justify-center rounded-lg">
            <p className="text-gray-500">{title} content coming soon...</p>
        </div>
    )
}

function Docket({ projectId }: Props) {
    const selectedProject = categories
        .flatMap((o) => o.projects)
        .find((project) => project.id === (projectId ? +projectId : ""))

    if (!selectedProject) {
        return (
            <div className="grid size-full place-items-center p-4">
                <p className="text-foreground/60 text-sm">
                    Select a project to view details
                </p>
            </div>
        )
    }

    if (selectedProject.dockets?.length === 0) {
        return (
            <div className="flex items-center justify-center">
                No dockets available for this project.
            </div>
        )
    }

    const tabsData = [
        {
            value: "invoices",
            label: "Invoices",
            content: (
                <InvoiceTable
                    invoices={
                        selectedProject.dockets?.[0].projects[0]?.invoices || []
                    }
                />
            ),
        },
        {
            value: "property",
            label: "Property",
            content: <PlaceholderContent title="Property" />,
        },
        {
            value: "capital-projects",
            label: "Capital Projects",
            content: <PlaceholderContent title="Capital Projects" />,
        },
        {
            value: "legal-cases",
            label: "Legal Cases",
            content: <PlaceholderContent title="Legal Cases" />,
        },
        {
            value: "plan",
            label: "Plan",
            content: <PlaceholderContent title="Plan" />,
        },
        {
            value: "media",
            label: "Media",
            content: <PlaceholderContent title="Media" />,
        },
    ]

    return (
        <div className="grid h-full flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] p-2">
            <ProjectHeader project={selectedProject} />

            <div className="grid grid-rows-[auto_minmax(0,1fr)] gap-y-4 bg-white">
                <hgroup className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Billing and invoicing
                    </h2>
                    <button className="border-primary text-primary flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5">
                        <DownloadCloudIcon /> Download All
                    </button>
                </hgroup>

                <Tabs
                    defaultValue="invoices"
                    className="flex grow flex-col gap-4 overflow-hidden"
                >
                    <div className="bg-Bg-Dark overflow-x-auto rounded-sm">
                        <TabsList className="bg-Bg-Dark flex h-auto w-full justify-start gap-2 rounded-md border p-1">
                            {tabsData.map((item) => (
                                <TabsTrigger
                                    key={item.value}
                                    value={item.value}
                                    className="block max-w-fit flex-0 rounded-sm border-none px-3 py-2.25 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow"
                                >
                                    {item.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {tabsData.map((item) => (
                        <TabsContent
                            key={item.value}
                            value={item.value}
                            className="overflow-hidden overflow-y-auto rounded-md border p-0"
                        >
                            {item.content}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}
export default Docket
