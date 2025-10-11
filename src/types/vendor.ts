export interface Vendor {
    id: number
    name: string
    email: string
    productType:
        | "Electronics"
        | "Construction"
        | "Labor"
        | "Steel Work"
        | "Wood Work"
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    initials: string
}
