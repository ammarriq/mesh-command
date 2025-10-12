import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { Copy, Edit } from "lucide-react"

import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CallIcon from "@/icons/call"
import EmailIcon from "@/icons/email"
import UserIcon from "@/icons/user"

import Header from "../-header"
import Input from "../-input"

import { employees } from "./-sample"

export const Route = createFileRoute("/_dashboard/directory/employees/")({
    component: RouteComponent,
})

function RouteComponent() {
    const [addFormOpen, setAddFormOpen] = useState(false)

    return (
        <main
            data-add-form={addFormOpen}
            className="col-span-2 grid h-full grid-cols-1 bg-white data-[add-form=true]:grid-cols-[minmax(0,1fr)_auto]"
        >
            <div className="grid w-full grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden p-6">
                <Header />

                <section className="border-y-Bg-Dark mt-8 grid w-full grid-rows-[auto_minmax(0,1fr)] items-center gap-8 border-y py-8 @5xl:grid-cols-[auto_minmax(0,1fr)] @5xl:items-stretch">
                    <hgroup className="flex w-full flex-shrink-0 flex-col gap-4 @2xl:flex-row @5xl:max-w-60 @5xl:flex-col">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Employees
                            </h3>
                            <p className="text-sm text-gray-600">
                                Employees are the workers of teams.
                            </p>
                        </div>
                        <Button
                            className="bg-primary-light text-primary hover:bg-primary-light/80 max-w-fit rounded-xs @2xl:ml-auto @5xl:ml-0"
                            onClick={() => setAddFormOpen(true)}
                        >
                            Add New Employee
                        </Button>
                    </hgroup>

                    <div className="border-Bg-Dark overflow-hidden rounded-lg border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-Bg-Dark *:text-text-secondary *:font-medium *:last-of-type:w-24">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Phone number</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date added</TableHead>
                                    <TableHead>Last active</TableHead>
                                    <TableHead className="w-32"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell className="text-foreground/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs font-medium">
                                                    {employee.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-foreground font-medium">
                                                        {employee.name}
                                                    </div>
                                                    <div className="text-sm">
                                                        {employee.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            {employee.phone}
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            <StatusBadge
                                                status={employee.status}
                                            />
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            {employee.dateAdded}
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            {employee.lastActive}
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
                </section>
            </div>

            {addFormOpen ? (
                <form
                    action=""
                    className="border-Bg-Dark h-full w-88 border-l px-4"
                >
                    <h3 className="border-Bg-Dark border-b py-3 text-lg font-semibold">
                        Add New Employee
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
