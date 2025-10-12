import { createContext, PropsWithChildren, use, useState } from "react"

interface ContextType {
    isActive: boolean
    selectedProject: string | null
    activeTabs: string[]
    onToggle: (isActive: boolean) => void
    onProjectSelect: (projectId: string | null) => void
    onTabClick: (value: string[] | ((prevState: string[]) => string[])) => void
}

const SplitScreenContext = createContext<ContextType>({
    isActive: false,
    activeTabs: [],
    selectedProject: null,
    onProjectSelect: () => {},
    onToggle: () => {},
    onTabClick: () => {},
})

export function SplitScreenProvider({ children }: PropsWithChildren) {
    const [isActive, setIsActive] = useState(false)
    const [activeTabs, setActiveTabs] = useState<string[]>([])
    const [selectedProject, setSelectedProject] = useState<string | null>(null)

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
