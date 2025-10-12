import type { Docket } from "./docket.ts"
import type { Task } from "./task.ts"
import type { User } from "./user.ts"

export interface Project {
    id: number
    title: string
    status: "Active" | "Completed" | "On-Hold"
    deadline?: string
    budget?: string
    contractor?: string
    warning?: string | null
    users?: User[]
    tasks: Task[]
    dockets?: Docket[]
}
