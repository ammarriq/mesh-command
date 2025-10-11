import dayjs from "dayjs"

import { PaymentBadge } from "@/components/payment-badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PdfIcon } from "@/icons/pdf"

interface InvoiceTableRow {
    id: string
    number: string
    date: string
    amount: number
    status: "Active" | "Paid"
    fileUploaded: string
}

interface InvoiceTableProps {
    invoices: Array<InvoiceTableRow>
    onDownload?: (invoice: InvoiceTableRow) => void
    onPreview?: (invoice: InvoiceTableRow) => void
}

export function InvoiceTable({
    invoices,
    onDownload,
    onPreview,
}: InvoiceTableProps) {
    return (
        <div className="border-Bg-Dark overflow-hidden rounded-lg border bg-white">
            <Table>
                <TableHeader>
                    <TableRow className="bg-Bg-Dark *:text-text-secondary *:font-medium">
                        <TableHead>Invoice</TableHead>
                        <TableHead>File Uploaded On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="w-32"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            className="bg-white transition-colors hover:bg-gray-50"
                        >
                            <TableCell className="py-4">
                                <div className="flex items-center gap-3">
                                    <PdfIcon className="size-6 stroke-rose-500" />
                                    <span className="text-sm text-gray-900">
                                        {row.number}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="py-4">
                                {dayjs(row.date).format("MMM D, YYYY")}
                            </TableCell>
                            <TableCell className="py-4">
                                <PaymentBadge status={row.status} />
                            </TableCell>
                            <TableCell className="py-4">
                                <span className="text-sm text-gray-900">
                                    USD ${row.amount.toFixed(2)}
                                </span>
                            </TableCell>
                            <TableCell className="py-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:text-primary/90 hover:bg-red-50"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDownload?.(row)
                                        }}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:text-primary/90 hover:bg-red-50"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onPreview?.(row)
                                        }}
                                    >
                                        Preview
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
