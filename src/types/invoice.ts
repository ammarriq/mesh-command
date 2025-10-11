export interface Invoice {
    id: string
    number: string
    date: string
    amount: number
    status: "Active" | "Paid"
    fileUploaded: string
}
