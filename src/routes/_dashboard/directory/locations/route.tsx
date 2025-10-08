import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { Copy, Edit } from "lucide-react"

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

import Header from "../-header"
import Input from "../-input"

import { locations } from "./-sample"

export const Route = createFileRoute("/_dashboard/directory/locations/")({
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
                            Here are listings of locations and addresses.
                        </p>

                        <Button
                            className="bg-primary-light text-primary hover:bg-primary-light/80 mt-4 rounded-xs"
                            onClick={() => setAddFormOpen(true)}
                        >
                            Add New Location
                        </Button>
                    </hgroup>

                    <div className="border-Bg-Dark w-full overflow-hidden rounded-lg border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-Bg-Dark *:text-text-secondary *:font-medium *:last-of-type:w-24">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Phone number</TableHead>
                                    <TableHead>Date added</TableHead>
                                    <TableHead className="w-32"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {locations.map((location) => (
                                    <TableRow key={location.id}>
                                        <TableCell className="text-foreground">
                                            {location.name}
                                        </TableCell>
                                        <TableCell className="text-primary underline">
                                            {location.address}
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            {location.phone}
                                        </TableCell>
                                        <TableCell className="text-foreground/50">
                                            {location.dateAdded}
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
                            label="Location title"
                            name="locationTitle"
                            placeholder="Enter location title"
                        />
                        <Input
                            label="Phone #"
                            name="phone"
                            placeholder="Enter phone number"
                            icon={CallIcon}
                        />
                        <Input
                            label="Address"
                            name="address"
                            placeholder="Enter location address"
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
