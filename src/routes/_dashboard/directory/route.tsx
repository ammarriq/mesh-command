import type {
    Contractor,
    Employee,
    Equipment,
    Location,
    Team,
    Vendor,
} from "@/store"

import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { Copy, Edit, Users } from "lucide-react"

import { SearchInput } from "@/components/shared/search-input"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useDirectoryStore } from "@/store"

type DirectoryItemType =
    | Employee
    | Contractor
    | Team
    | Vendor
    | Equipment
    | Location
type UserItemType = Employee | Contractor | Team | Vendor

export const Route = createFileRoute("/_dashboard/directory/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { employees, contractors, teams, vendors, equipments, locations } =
        useDirectoryStore()
    const [activeMainTab, setActiveMainTab] = useState("People Management")
    const [activePeopleTab, setActivePeopleTab] = useState("Employees")

    const directoryTabsConfig = [
        {
            value: "Employees",
            data: employees,
            title: "Employees",
            description: "Employees are the workers of teams.",
        },
        {
            value: "Contractors",
            data: contractors,
            title: "Contractors",
            description: "Here are listings of contractors.",
        },
        {
            value: "Teams",
            data: teams,
            title: "Teams",
            description: "Here are listings of teams.",
        },
        {
            value: "Vendors",
            data: vendors,
            title: "Vendors",
            description: "Here are listings of vendors.",
        },
        {
            value: "Equipments",
            data: equipments,
            title: "Equipments",
            description: "Here are listings of equipments and tools.",
        },
        {
            value: "Locations",
            data: locations,
            title: "Locations",
            description: "Here are listings of locations and addresses.",
        },
    ]

    return (
        <main className="min-h-screen flex-1 bg-white py-4">
            <div className="p-8">
                <DirectoryHeader />

                <Tabs
                    value={activeMainTab}
                    onValueChange={setActiveMainTab}
                    className="w-full"
                >
                    <TabsContent
                        value="People Management"
                        className="space-y-6"
                    >
                        <PeopleManagement
                            activePeopleTab={activePeopleTab}
                            setActivePeopleTab={setActivePeopleTab}
                            directoryTabsConfig={directoryTabsConfig}
                        />
                    </TabsContent>

                    <PlaceholderTabContent
                        value="Asset Management"
                        title="Asset Management"
                        description="Advanced asset tracking and management features coming soon."
                    />
                    <PlaceholderTabContent
                        value="Location Management"
                        title="Location Management"
                        description="Advanced location management features coming soon."
                    />
                </Tabs>
            </div>
        </main>
    )
}

const createDirectoryColumns = (type: string) => {
    const baseColumns = [
        {
            key: "name",
            label: "Name",
            render: (_: unknown, item: DirectoryItemType) => {
                if (type === "Equipments" || type === "Locations") {
                    return String(item.name)
                }
                return <DirectoryUserAvatar user={item as UserItemType} />
            },
        },
    ]

    const specificColumns: Record<
        string,
        Array<{
            key: string
            label: string
            render?: (value: unknown) => React.ReactNode
        }>
    > = {
        Employees: [
            { key: "phone", label: "Phone Number" },
            {
                key: "status",
                label: "Status",
                render: (status: unknown) => (
                    <StatusBadge status={status as Employee["status"]} />
                ),
            },
            { key: "dateAdded", label: "Date added" },
            { key: "lastActive", label: "Last active" },
        ],
        Contractors: [
            { key: "phone", label: "Phone Number" },
            { key: "projectCount", label: "# of projects" },
            { key: "type", label: "Type" },
            {
                key: "status",
                label: "Status",
                render: (status: unknown) => (
                    <StatusBadge status={status as Contractor["status"]} />
                ),
            },
            { key: "dateAdded", label: "Date added" },
            { key: "lastActive", label: "Last active" },
        ],
        Teams: [
            { key: "memberCount", label: "# of Members" },
            { key: "department", label: "Department" },
            {
                key: "status",
                label: "Status",
                render: (status: unknown) => (
                    <StatusBadge status={status as Team["status"]} />
                ),
            },
            { key: "dateAdded", label: "Date added" },
        ],
        Vendors: [
            { key: "productType", label: "Product Type" },
            {
                key: "status",
                label: "Status",
                render: (status: unknown) => (
                    <StatusBadge status={status as Vendor["status"]} />
                ),
            },
            { key: "dateAdded", label: "Date added" },
        ],
        Equipments: [
            { key: "equipmentType", label: "Equipment Type" },
            { key: "dateSelected", label: "Date selected" },
        ],
        Locations: [
            {
                key: "address",
                label: "Address",
                render: (address: unknown) => (
                    <button
                        type="button"
                        className="text-left text-red-600 underline hover:text-red-700"
                        onClick={() => {}}
                    >
                        {String(address)}
                    </button>
                ),
            },
            { key: "phone", label: "Phone Number" },
            { key: "dateAdded", label: "Date added" },
        ],
    }

    return [
        ...baseColumns,
        ...specificColumns[type],
        { key: "id", label: "", render: () => <ActionButtons /> },
    ]
}

interface DirectoryTableProps<T extends DirectoryItemType> {
    data: Array<T>
    columns: Array<{
        key: keyof T | string
        label: string
        render?: (value: unknown, item: T) => React.ReactNode
    }>
    onAdd: () => void
    addButtonText: string
    title: string
    description?: string
}

function DirectoryTable<T extends DirectoryItemType>({
    data,
    columns,
    onAdd,
    addButtonText,
    title,
    description,
}: DirectoryTableProps<T>) {
    return (
        <section className="flex gap-8">
            <hgroup>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                {description && (
                    <p className="text-sm text-gray-600">{description}</p>
                )}
                <Button
                    onClick={onAdd}
                    className="bg-primary-light text-primary hover:bg-primary/80 mt-4 rounded-xs"
                >
                    {addButtonText}
                </Button>
            </hgroup>

            <div className="flex-1 rounded-xl border bg-white">
                <Table className="rounded-2xl">
                    <TableHeader>
                        <TableRow className="bg-light-bg border-Bg-Dark border">
                            {columns.map((column) => (
                                <TableHead
                                    key={String(column.key)}
                                    className={cn(
                                        column.key === "name"
                                            ? "w-full min-w-[180px]"
                                            : "min-w-[120px] text-right",
                                    )}
                                >
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={item.id}
                                className={cn(
                                    (index + 1) % 2 === 0 ? "bg-light-bg" : "",
                                    "border-Bg-Dark border",
                                )}
                            >
                                {columns.map((column) => (
                                    <TableCell
                                        key={String(column.key)}
                                        className={cn(
                                            column.key === "name"
                                                ? "w-full"
                                                : "text-right",
                                        )}
                                    >
                                        {column.render
                                            ? column.render(
                                                  (
                                                      item as unknown as Record<
                                                          string,
                                                          unknown
                                                      >
                                                  )[column.key as string],
                                                  item,
                                              )
                                            : String(
                                                  (
                                                      item as unknown as Record<
                                                          string,
                                                          unknown
                                                      >
                                                  )[column.key as string],
                                              )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

function DirectoryHeader() {
    return (
        <header className="flex items-start justify-between">
            <hgroup className="mb-8">
                <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                    Directory Management
                </h1>
                <p className="text-gray-600">
                    Manage all people, equipment and locations in your
                    directory.
                </p>
            </hgroup>
            <SearchInput />
        </header>
    )
}

interface PeopleManagementProps {
    activePeopleTab: string
    setActivePeopleTab: (tab: string) => void
    directoryTabsConfig: Array<{
        value: string
        data: Array<DirectoryItemType>
        title: string
        description: string
    }>
}

function PeopleManagement({
    activePeopleTab,
    setActivePeopleTab,
    directoryTabsConfig,
}: PeopleManagementProps) {
    const peopleTabStyle =
        "data-[state=active]:bg-primary-light border-r border-gray-300 py-2.5 px-4 h-full text-sm font-semibold data-[state=active]:text-primary text-gray-700"

    return (
        <Tabs
            value={activePeopleTab}
            onValueChange={setActivePeopleTab}
            className="w-full"
        >
            <TabsList className="flex h-fit w-full max-w-[780px] rounded-xl border border-gray-300 p-0">
                {directoryTabsConfig.map((tab, index) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            peopleTabStyle,
                            index === 0 && "rounded-l-lg",
                            index === directoryTabsConfig.length - 1 &&
                                "rounded-r-lg",
                        )}
                    >
                        {tab.value}
                    </TabsTrigger>
                ))}
            </TabsList>
            <Separator className="my-4" />
            {directoryTabsConfig.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="space-y-6"
                >
                    <DirectoryTable
                        data={tab.data}
                        columns={createDirectoryColumns(tab.value)}
                        onAdd={() => {}}
                        addButtonText={`Add New ${tab.value.slice(0, -1)}`}
                        title={tab.title}
                        description={tab.description}
                    />
                </TabsContent>
            ))}
        </Tabs>
    )
}

interface PlaceholderTabContentProps {
    value: string
    title: string
    description: string
}

function PlaceholderTabContent({
    value,
    title,
    description,
}: PlaceholderTabContentProps) {
    return (
        <TabsContent value={value} className="space-y-6">
            <div className="py-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                    {title}
                </h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </TabsContent>
    )
}

function DirectoryUserAvatar({ user }: { user: UserItemType }) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    return (
        <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs font-medium">
                {initials}
            </div>
            <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
            </div>
        </div>
    )
}

function ActionButtons() {
    const buttonClass = "p-1 text-gray-400 hover:text-gray-600"

    return (
        <div className="flex items-center gap-2">
            <button className={buttonClass}>
                <Copy className="h-4 w-4" />
            </button>
            <button className={buttonClass}>
                <Edit className="h-4 w-4" />
            </button>
        </div>
    )
}
