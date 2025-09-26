import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PaymentBadge } from "@/components/shared/payment-badge";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn("bg-white rounded-xl border", className)}>
      <Table className="rounded-2xl">
        <TableHeader>
          <TableRow className="bg-light-bg border border-Bg-Dark">
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  "font-medium text-gray-600",
                  index === 0
                    ? "w-full min-w-[180px]"
                    : "text-right min-w-[120px]",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                (rowIndex + 1) % 2 === 0 ? "bg-light-bg" : "",
                "border border-Bg-Dark hover:bg-gray-50 transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={cn(
                    "py-4",
                    colIndex === 0 ? "w-full" : "text-right",
                    column.className
                  )}
                >
                  {column.cell
                    ? column.cell(row)
                    : String((row as Record<string, unknown>)[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Specialized Invoice Table Component
export interface InvoiceTableRow {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "Active" | "Paid";
  fileUploaded: string;
}

interface InvoiceTableProps {
  invoices: InvoiceTableRow[];
  onDownload?: (invoice: InvoiceTableRow) => void;
  onPreview?: (invoice: InvoiceTableRow) => void;
}

export function InvoiceTable({
  invoices,
  onDownload,
  onPreview,
}: InvoiceTableProps) {
  const columns: Column<InvoiceTableRow>[] = [
    {
      key: "number",
      header: "Invoice",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-medium">PDF</span>
          </div>
          <span className="text-sm text-gray-900">{row.number}</span>
        </div>
      ),
    },
    {
      key: "fileUploaded",
      header: "File Uploaded On",
      className: "text-gray-600",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <PaymentBadge status={row.status} />,
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row) => (
        <span className="text-sm text-gray-900">
          USD ${row.amount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onDownload?.(row);
            }}
          >
            Download
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(row);
            }}
          >
            Preview
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable data={invoices} columns={columns} />;
}
