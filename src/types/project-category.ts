import type { Project } from "./project.ts"

export interface ProjectCategory {
    id: number
    name: string
    projects: Array<Project>
}
