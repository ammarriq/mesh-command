import type { Project } from "@/types/project"
import type { PropsWithChildren } from "react"

import { createContext, use, useState } from "react"

interface ContextType {
    isActive: boolean
    selectedProject: Project["id"] | null
    activeTabs: string[]
    onToggle: (isActive: boolean) => void
    onProjectSelect: (projectId: ContextType["selectedProject"]) => void
    onTabClick: (value: string[] | ((prevState: string[]) => string[])) => void
}

const SplitScreenContext = createContext<ContextType | null>(null)

export function SplitScreenProvider({ children }: PropsWithChildren) {
    const [isActive, setIsActive] = useState(false)
    const [activeTabs, setActiveTabs] = useState<ContextType["activeTabs"]>([])
    const [selectedProject, setSelectedProject] =
        useState<ContextType["selectedProject"]>(null)

    return (
        <SplitScreenContext.Provider
            value={{
                isActive,
                activeTabs,
                selectedProject,
                onProjectSelect: setSelectedProject,
                onToggle: setIsActive,
                onTabClick: setActiveTabs,
            }}
        >
            {children}
        </SplitScreenContext.Provider>
    )
}

export function useSplitScreen() {
    const context = use(SplitScreenContext)
    if (!context) {
        throw new Error(
            "useSplitScreen must be used within a SplitScreenProvider",
        )
    }

    return context
}
