import type { DocketProject } from "./docket-project.ts"

export interface Docket {
    id: number
    name: string
    status: "Active" | "On-hold" | "Completed" | "active" | "completed"
    projects: DocketProject[]
}
