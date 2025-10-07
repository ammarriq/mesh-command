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

import Header from "../-header"

import { equipments } from "./-sample"

export const Route = createFileRoute("/_dashboard/directory/equipments/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className="col-span-2 grid h-full grid-rows-[auto_auto_minmax(0,1fr)] bg-white p-6 has-[.form-dialog]:grid">
            <Header />

            <section className="border-y-Bg-Dark mt-8 flex gap-8 border-y py-8">
                <hgroup className="w-full max-w-60 flex-shrink-0">
                    <h3 className="text-lg font-medium text-gray-900">
                        Equipments
                    </h3>
                    <p className="text-sm text-gray-600">
                        Here are listings of equipments and tools.
                    </p>

                    <Button className="bg-primary-light text-primary hover:bg-primary-light/80 mt-4 rounded-xs">
                        Add New Equipment
                    </Button>
                </hgroup>

                <div className="border-Bg-Dark w-full overflow-hidden rounded-lg border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-Bg-Dark *:text-text-secondary *:font-medium *:last-of-type:w-24">
                                <TableHead>Name</TableHead>
                                <TableHead>Equipment type</TableHead>
                                <TableHead>Date added</TableHead>
                                <TableHead className="w-32"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {equipments.map((equipment) => (
                                <TableRow key={equipment.id}>
                                    <TableCell className="text-foreground">
                                        {equipment.name}
                                    </TableCell>

                                    <TableCell className="text-foreground/50">
                                        {equipment.equipmentType}
                                    </TableCell>

                                    <TableCell className="text-foreground/50">
                                        {equipment.dateSelected}
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
        </main>
    )
}
