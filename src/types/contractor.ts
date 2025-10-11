export interface Contractor {
    id: number
    name: string
    email: string
    phone: string
    projectCount: number
    type: "Electronics" | "Construction" | "Labor" | "Steel Work" | "Wood Work"
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    lastActive: string
    avatar?: string
}
