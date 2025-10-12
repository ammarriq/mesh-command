import type { Invoice } from "./invoice.ts"

export interface DocketProject {
    id: number
    name: string
    status: "In-Progress" | "On-Hold" | "Active"
    contractor: string
    deadline: string
    budget: string
    budgetConsumed: number
    progress: number
    filingCapacity: number
    invoices: Invoice[]
}
