import type { InvoiceTableRow } from "@/components/shared/data-table"
import type { Project } from "@/store/types"

import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { InvoiceTable } from "@/components/shared/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadCloudIcon } from "@/icons/download-cloud"
import { useSelectedProject } from "@/store"

import ProjectSelectorTab from "../projects/-project-tab"
import { ProjectHeader } from "../projects/$id/-project-header"

export const Route = createFileRoute("/_dashboard/dockets/")({
    component: RouteComponent,
})

function RouteComponent() {
    const selectedProject = useSelectedProject()
    const [activeInvoiceTab, setActiveInvoiceTab] = useState<string>("Invoices")

    if (!selectedProject) {
        return <EmptyState message="No project selected." />
    }

    const projectDockets = selectedProject.dockets || []

    if (projectDockets.length === 0) {
        return <EmptyState message="No dockets available for this project." />
    }

    const invoices = getProjectInvoices(projectDockets)

    return (
        <div className="grid flex-1 grid-cols-[1fr_4fr] bg-white py-4">
            <ProjectSelectorTab showCreateButton={false} />
            <MainContent
                selectedProject={selectedProject}
                activeInvoiceTab={activeInvoiceTab}
                setActiveInvoiceTab={setActiveInvoiceTab}
                invoices={invoices}
            />
        </div>
    )
}

const getProjectInvoices = (projectDockets: Project["dockets"]) => {
    const firstDocket = projectDockets?.[0]
    return firstDocket?.projects[0]?.invoices || []
}

const getBillingTabsConfig = (invoices: Array<InvoiceTableRow>) => [
    {
        value: "Invoices",
        label: "Invoices",
        content: <InvoiceTable invoices={invoices} />,
    },
    {
        value: "Property",
        label: "Property",
        content: <PlaceholderContent title="Property" />,
    },
    {
        value: "Capital Projects",
        label: "Capital Projects",
        content: <PlaceholderContent title="Capital Projects" />,
    },
    {
        value: "Legal Cases",
        label: "Legal Cases",
        content: <PlaceholderContent title="Legal Cases" />,
    },
    {
        value: "Plan",
        label: "Plan",
        content: <PlaceholderContent title="Plan" />,
    },
    {
        value: "Media",
        label: "Media",
        content: <PlaceholderContent title="Media" />,
    },
]

interface EmptyStateProps {
    message: string
}

function EmptyState({ message }: EmptyStateProps) {
    return (
        <div className="flex h-screen items-center justify-center">
            {message}
        </div>
    )
}

interface PlaceholderContentProps {
    title: string
}

function PlaceholderContent({ title }: PlaceholderContentProps) {
    return (
        <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50">
            <p className="text-gray-500">{title} content coming soon...</p>
        </div>
    )
}

interface MainContentProps {
    selectedProject: Project
    activeInvoiceTab: string
    setActiveInvoiceTab: (tab: string) => void
    invoices: Array<InvoiceTableRow>
}

function MainContent({
    selectedProject,
    activeInvoiceTab,
    setActiveInvoiceTab,
    invoices,
}: MainContentProps) {
    const billingTabsConfig = getBillingTabsConfig(invoices)

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <ProjectHeader project={selectedProject} isDocketPage />
            <BillingSection
                activeInvoiceTab={activeInvoiceTab}
                setActiveInvoiceTab={setActiveInvoiceTab}
                billingTabsConfig={billingTabsConfig}
            />
        </div>
    )
}

interface BillingSectionProps {
    activeInvoiceTab: string
    setActiveInvoiceTab: (tab: string) => void
    billingTabsConfig: Array<{
        value: string
        label: string
        content: React.ReactNode
    }>
}

function BillingSection({
    activeInvoiceTab,
    setActiveInvoiceTab,
    billingTabsConfig,
}: BillingSectionProps) {
    return (
        <div className="mt-4 flex h-full flex-1 flex-col gap-4 overflow-hidden bg-white p-6">
            <hgroup className="flex items-center justify-between">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    Billing and invoicing
                </h2>
                <button className="border-primary text-primary flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5">
                    <DownloadCloudIcon /> Download All
                </button>
            </hgroup>
            <CustomTabs
                value={activeInvoiceTab}
                onValueChange={setActiveInvoiceTab}
                items={billingTabsConfig}
            />
        </div>
    )
}

interface TabItem {
    value: string
    label: string
    content?: React.ReactNode
}

interface CustomTabsProps {
    items: Array<TabItem>
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    className?: string
    variant?: "default" | "underline"
}

export function CustomTabs({
    items,
    defaultValue,
    value,
    onValueChange,
}: CustomTabsProps) {
    return (
        <Tabs
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            className={""}
        >
            <div className="w-full rounded-sm border border-gray-200 bg-gray-50">
                <TabsList className="flex gap-2 bg-transparent p-1">
                    {items.map((item) => (
                        <TabsTrigger
                            key={item.value}
                            value={item.value}
                            className="data-[state=active]:text-text-primary text-text-secondary w-fit rounded-lg bg-transparent px-3 py-2 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-xs"
                        >
                            {item.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
            {items.map((item) => (
                <TabsContent
                    key={item.value}
                    value={item.value}
                    className="mt-3"
                >
                    {item.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}
