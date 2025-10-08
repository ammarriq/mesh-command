import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { Copy, Edit } from "lucide-react"

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
import CallIcon from "@/icons/call"
import EmailIcon from "@/icons/email"
import UserIcon from "@/icons/user"
import WorkflowIcon from "@/icons/workflow"

import Header from "../-header"
import Input from "../-input"
import Select from "../-select"

import { vendors } from "./-sample"

export const Route = createFileRoute("/_dashboard/directory/vendors/")({
    component: RouteComponent,
})

function RouteComponent() {
    const [addFormOpen, setAddFormOpen] = useState(false)

    return (
        <main
            data-add-form={addFormOpen}
            className="col-span-2 grid h-full bg-white has-[.form-dialog]:grid data-[add-form=true]:grid-cols-[minmax(0,1fr)_auto]"
        >
            <div className="grid w-full grid-rows-[auto_auto_minmax(0,1fr)] p-6">
                <Header />
                <section className="border-y-Bg-Dark mt-8 flex gap-8 border-y py-8">
                    <hgroup className="w-full max-w-60 flex-shrink-0">
                        <h3 className="text-lg font-medium text-gray-900">
                            Locations
                        </h3>
                        <p className="text-sm text-gray-600">
                            Vendors are the workers of teams.
                        </p>

                        <Button
                            className="bg-primary-light text-primary hover:bg-primary-light/80 mt-4 rounded-xs"
                            onClick={() => setAddFormOpen(true)}
                        >
                            Add New Vendor
                        </Button>
                    </hgroup>

                    <div className="border-Bg-Dark w-full overflow-hidden rounded-lg border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-Bg-Dark *:text-text-secondary *:font-medium *:last-of-type:w-24">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Phone number</TableHead>
                                    <TableHead>Product type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date added</TableHead>
                                    <TableHead className="w-32"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vendors.map((vendor) => (
                                    <TableRow key={vendor.id}>
                                        <TableCell className="text-foreground/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xs font-medium">
                                                    {vendor.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-foreground font-medium">
                                                        {vendor.name}
                                                    </div>
                                                    <div className="text-sm">
                                                        {vendor.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            (219) 555-0114
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            {vendor.productType}
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            <StatusBadge
                                                status={vendor.status}
                                            />
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            {vendor.dateAdded}
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
                </section>{" "}
            </div>

            {addFormOpen ? (
                <form
                    action=""
                    className="border-Bg-Dark h-full w-88 border-l px-4"
                >
                    <h3 className="border-Bg-Dark border-b py-3 text-lg font-semibold">
                        Add New Vendor
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
                            label="Phone number"
                            name="phone"
                            placeholder="Enter phone number"
                            icon={CallIcon}
                        />
                        <Select
                            label="Product type"
                            name="productType"
                            placeholder="Select product type"
                            icon={WorkflowIcon}
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
