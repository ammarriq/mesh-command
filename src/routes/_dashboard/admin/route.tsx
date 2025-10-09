import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

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
import CallIcon from "@/icons/call"
import EmailIcon from "@/icons/email"
import UserIcon from "@/icons/user"

import Input from "../directory/-input"

import { managers } from "./-sample-data"

export const Route = createFileRoute("/_dashboard/admin/")({
    component: RouteComponent,
})

function RouteComponent() {
    const [addFormOpen, setAddFormOpen] = useState(false)

    return (
        <main
            data-add-form={addFormOpen}
            className="col-span-2 grid h-full grid-rows-[auto_minmax(0,1fr)] bg-white has-[.form-dialog]:grid data-[add-form=true]:grid-cols-[minmax(0,1fr)_auto]"
        >
            <div className="grid w-full grid-rows-[auto_auto_minmax(0,1fr)] p-6">
                <header className="mb-6 flex items-start justify-between">
                    <hgroup>
                        <h1 className="mb-1 text-3xl font-semibold text-gray-900">
                            Admin Management
                        </h1>
                        <p className="text-sm text-slate-400">
                            Manage your team members and their account
                            permissions here.
                        </p>
                    </hgroup>
                    <SearchInput />
                </header>

                <Tabs defaultValue="people" className="w-full">
                    <TabsList className="w-full py-6 *:py-6">
                        <TabsTrigger value="people">
                            People Management
                        </TabsTrigger>
                        <TabsTrigger value="dockets" disabled>
                            Dockets Management
                        </TabsTrigger>
                        <TabsTrigger value="integrations" disabled>
                            Integrations
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="people" className="space-y-6">
                        <Tabs
                            defaultValue="manager"
                            className="grid w-full grid-rows-[auto_auto_minmax(0,1fr)] px-6 pt-4 pb-6"
                        >
                            <div className="border-y-Bg-Dark border-b pb-8">
                                <TabsList className="border-Bg-Dark *:border-Bg-Dark *:text-foreground flex h-10 max-w-fit overflow-hidden rounded-lg border p-0 *:h-full *:border-y-0 *:px-4 *:py-0 *:text-sm *:whitespace-nowrap *:not-last-of-type:border-r *:data-[state=active]:border-y-0 *:data-[state=active]:font-medium">
                                    <TabsTrigger
                                        value="manager"
                                        className="data-[state=active]:bg-primary-light data-[state=active]:text-primary"
                                    >
                                        Manager
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="sub-manager"
                                        className="data-[state=active]:bg-primary-light data-[state=active]:text-primary"
                                        disabled
                                    >
                                        Sub-Manager
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="employee"
                                        className="data-[state=active]:bg-primary-light data-[state=active]:text-primary"
                                        disabled
                                    >
                                        Employee
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="contractor"
                                        className="data-[state=active]:bg-primary-light data-[state=active]:text-primary"
                                        disabled
                                    >
                                        Contractor
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="auditor"
                                        className="data-[state=active]:bg-primary-light data-[state=active]:text-primary"
                                        disabled
                                    >
                                        Auditor
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent
                                value="manager"
                                className="border-y-Bg-Dark mt-8 flex gap-8 border-y py-8"
                            >
                                <hgroup className="w-full max-w-60 flex-shrink-0">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Add New Manager
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Here are list of managers who are also
                                        admins.
                                    </p>

                                    <Button
                                        className="bg-primary-light text-primary hover:bg-primary-light/80 mt-4 rounded-xs"
                                        onClick={() => setAddFormOpen(true)}
                                    >
                                        Add New Manager
                                    </Button>
                                </hgroup>

                                <div className="border-Bg-Dark w-full overflow-hidden rounded-lg border bg-white">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-Bg-Dark *:text-text-secondary *:font-medium *:last-of-type:w-24">
                                                <TableHead>Name</TableHead>
                                                <TableHead>
                                                    Phone number
                                                </TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>
                                                    Date added
                                                </TableHead>
                                                <TableHead className="w-32"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {managers.map((manager) => (
                                                <TableRow key={manager.id}>
                                                    <TableCell className="text-foreground/50">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs font-medium">
                                                                {manager.name
                                                                    .split(" ")
                                                                    .map(
                                                                        (n) =>
                                                                            n[0],
                                                                    )
                                                                    .join("")
                                                                    .toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="text-foreground font-medium">
                                                                    {
                                                                        manager.name
                                                                    }
                                                                </div>
                                                                <div className="text-sm">
                                                                    {
                                                                        manager.email
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-foreground/50">
                                                        {manager.phone}
                                                    </TableCell>
                                                    <TableCell className="text-foreground/50">
                                                        <StatusBadge
                                                            status={
                                                                manager.status
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-foreground/50">
                                                        {manager.dateAdded}
                                                    </TableCell>
                                                    <TableCell className="text-foreground/50">
                                                        <div className="flex items-center gap-2 *:p-1 *:text-gray-400 *:hover:text-gray-600">
                                                            <button>
                                                                <Copy className="size-4" />
                                                            </button>
                                                            <button>
                                                                <Edit className="size-4" />
                                                            </button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>

            {addFormOpen ? (
                <form
                    action=""
                    className="border-Bg-Dark h-full w-88 border-l px-4"
                >
                    <h3 className="border-Bg-Dark border-b py-3 text-lg font-semibold">
                        Add New Manager
                    </h3>

                    <fieldset className="mt-4 space-y-4">
                        <Input
                            label="Full name"
                            name="name"
                            placeholder="Enter full name"
                            icon={UserIcon}
                        />
                        <Input
                            label="Email"
                            name="name"
                            placeholder="Enter email"
                            icon={EmailIcon}
                        />
                        <Input
                            label="Phone #"
                            name="phone"
                            placeholder="Enter phone number"
                            icon={CallIcon}
                        />
                    </fieldset>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                        <button
                            className="bg-primary-light text-primary py-2.5 text-sm"
                            onClick={() => setAddFormOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-primary py-2.5 text-sm text-white"
                            onClick={() => setAddFormOpen(false)}
                        >
                            Add
                        </button>
                    </div>
                </form>
            ) : null}
        </main>
    )
}
