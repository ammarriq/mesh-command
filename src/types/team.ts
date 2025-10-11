export interface Team {
    id: number
    name: string
    email: string
    memberCount: number
    department:
        | "Electronics"
        | "Construction"
        | "Labor"
        | "Steel Work"
        | "Wood Work"
    status: "Active" | "In-Active" | "On-hold"
    dateAdded: string
    initials: string
}
