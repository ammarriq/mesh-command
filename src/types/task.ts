import type { User } from "./user.ts"

export interface Task {
    id: number
    title: string
    description: string
    status: "backlog" | "in-progress" | "completed"
    priority: "High" | "Medium" | "Low"
    assignedTo: string
    deadline: string
    linkedDocs?: string[]
    users: User[]
}
