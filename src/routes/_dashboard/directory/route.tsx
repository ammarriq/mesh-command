import type {
    Contractor,
    Employee,
    Equipment,
    Location,
    Team,
    Vendor,
} from "@/store"

import { createFileRoute, redirect } from "@tanstack/react-router"

import { Copy, Edit } from "lucide-react"

import { SearchInput } from "@/components/shared/search-input"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    beforeLoad: () => {
        throw redirect({ to: "/directory/employees" })
    },
})

function RouteComponent() {
    const { employees, contractors, teams, vendors, equipments, locations } =
        useDirectoryStore()

    return (
        <main className="col-span-2 min-h-screen bg-white p-6">
            <header className="flex items-start justify-between">
                <hgroup className="mb-8">
                    <h1 className="mb-1 text-3xl font-semibold text-gray-900">
                        MeshCommand Directory
                    </h1>
                    <p className="text-sm text-slate-400">
                        Manage and view all people, equipment and locations.
                    </p>
                </hgroup>
                <SearchInput />
            </header>

            <Tabs defaultValue="employees" className="w-full">
                <div className="border-y-Bg-Dark border-y py-8">
                    <TabsList className="border-Bg-Dark *:data-[state=active]:bg-primary-light *:data-[state=active]:text-primary *:border-Bg-Dark *:text-foreground h-10 max-w-fit overflow-hidden rounded-lg border p-0 *:h-full *:border-y-0 *:px-4 *:not-last-of-type:border-r *:data-[state=active]:border-y-0 *:data-[state=active]:font-medium">
                        <TabsTrigger value="employees">Employees</TabsTrigger>
                        <TabsTrigger value="contractors">
                            Contractors
                        </TabsTrigger>
                        <TabsTrigger value="teams">Teams</TabsTrigger>
                        <TabsTrigger value="vendors">Vendors</TabsTrigger>
                        <TabsTrigger value="equipments">Equipments</TabsTrigger>
                        <TabsTrigger value="locations">Locations</TabsTrigger>
                    </TabsList>
                </div>

                <div className="border-y-Bg-Dark mt-8 border-y py-8">
                    <TabsContent value="employees" className="space-y-6">
                        <DirectoryTable
                            data={employees}
                            columns={createDirectoryColumns("Employees")}
                            onAdd={() => {}}
                            addButtonText="Add New Employee"
                            title="Employees"
                            description="Employees are the workers of teams."
                        />
                    </TabsContent>
                    <TabsContent value="contractors" className="space-y-6">
                        <DirectoryTable
                            data={contractors}
                            columns={createDirectoryColumns("Contractors")}
                            onAdd={() => {}}
                            addButtonText="Add New Contractor"
                            title="Contractora"
                            description="Here are listings of contractors."
                        />
                    </TabsContent>
                    <TabsContent value="teams" className="space-y-6">
                        <DirectoryTable
                            data={teams}
                            columns={createDirectoryColumns("Teams")}
                            onAdd={() => {}}
                            addButtonText="Add New Team"
                            title="Teams"
                            description="Here are listings of teams."
                        />
                    </TabsContent>
                    <TabsContent value="vendors" className="space-y-6">
                        <DirectoryTable
                            data={vendors}
                            columns={createDirectoryColumns("Vendors")}
                            onAdd={() => {}}
                            addButtonText="Add New Vendor"
                            title="Vendors"
                            description="Vendors are the workers of teams."
                        />
                    </TabsContent>
                    <TabsContent value="equipments" className="space-y-6">
                        <DirectoryTable
                            data={equipments}
                            columns={createDirectoryColumns("Equipments")}
                            onAdd={() => {}}
                            addButtonText="Add New Equipment"
                            title="Equipments"
                            description="Here are listings of equipments and tools."
                        />
                    </TabsContent>
                    <TabsContent value="locations" className="space-y-6">
                        <DirectoryTable
                            data={locations}
                            columns={createDirectoryColumns("Locations")}
                            onAdd={() => {}}
                            addButtonText="Add New Location"
                            title="Locations"
                            description="Here are listings of locations and addresses."
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </main>
    )
}

type DirectoryType =
    | "Employees"
    | "Contractors"
    | "Teams"
    | "Vendors"
    | "Equipments"
    | "Locations"

type ColumnConfig = {
    key: string
    label: string
    render?: (value: unknown, item: DirectoryItemType) => React.ReactNode
}

const createDirectoryColumns = (type: DirectoryType): Array<ColumnConfig> => {
    const baseColumns: Array<ColumnConfig> = [
        {
            key: "name",
            label: "Name",
            render: (_: unknown, item: DirectoryItemType) => {
                if (type === "Equipments" || type === "Locations") {
                    return String(item.name)
                }

                return (
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs font-medium">
                            {(item as UserItemType).name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </div>
                        <div>
                            <div className="text-foreground font-medium">
                                {(item as UserItemType).name}
                            </div>
                            <div className="text-sm">
                                {(item as UserItemType).email}
                            </div>
                        </div>
                    </div>
                )
            },
        },
    ]

    const statusColumn = (
        statusType: "employee" | "contractor" | "team" | "vendor",
    ): ColumnConfig => ({
        key: "status",
        label: "Status",
        render: (status: unknown, _item: DirectoryItemType) => {
            const statusMap = {
                employee: status as Employee["status"],
                contractor: status as Contractor["status"],
                team: status as Team["status"],
                vendor: status as Vendor["status"],
            }
            return <StatusBadge status={statusMap[statusType]} />
        },
    })

    const specificColumns: Record<DirectoryType, Array<ColumnConfig>> = {
        Employees: [
            { key: "phone", label: "Phone Number" },
            statusColumn("employee"),
            { key: "dateAdded", label: "Date added" },
            { key: "lastActive", label: "Last active" },
        ],
        Contractors: [
            { key: "phone", label: "Phone Number" },
            { key: "projectCount", label: "# of projects" },
            { key: "type", label: "Type" },
            statusColumn("contractor"),
            { key: "dateAdded", label: "Date added" },
            { key: "lastActive", label: "Last active" },
        ],
        Teams: [
            { key: "memberCount", label: "# of Members" },
            { key: "department", label: "Department" },
            statusColumn("team"),
            { key: "dateAdded", label: "Date added" },
        ],
        Vendors: [
            { key: "productType", label: "Product Type" },
            statusColumn("vendor"),
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
                render: (address: unknown, _item: DirectoryItemType) => (
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

    const actionColumn: ColumnConfig = {
        key: "id",
        label: "",
        render: (_: unknown, _item: DirectoryItemType) => (
            <div className="flex items-center gap-2 *:p-1 *:text-gray-400 *:hover:text-gray-600">
                <button>
                    <Copy className="h-4 w-4" />
                </button>
                <button>
                    <Edit className="h-4 w-4" />
                </button>
            </div>
        ),
    }

    return [...baseColumns, ...specificColumns[type], actionColumn]
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
            <hgroup className="w-full max-w-60 flex-shrink-0">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                {description && (
                    <p className="text-sm text-gray-600">{description}</p>
                )}
                <Button
                    onClick={onAdd}
                    className="bg-primary-light text-primary hover:bg-primary-light/80 mt-4 rounded-xs"
                >
                    {addButtonText}
                </Button>
            </hgroup>

            <div className="border-Bg-Dark w-full overflow-hidden rounded-lg border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-Bg-Dark *:text-text-secondary *:font-medium *:last-of-type:w-24">
                            {columns.map((column) => (
                                <TableHead key={String(column.key)}>
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={String(column.key)}
                                        className="text-foreground/50"
                                    >
                                        {column.render
                                            ? column.render(
                                                  item[column.key as keyof T],
                                                  item,
                                              )
                                            : `${item[column.key as keyof T]}`}
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
