export interface Employee {
    id: number
    name: string
    email: string
    phone: string
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    lastActive: string
    avatar?: string
}
