import { createContext, PropsWithChildren, use, useState } from "react"

interface ContextType {
    isActive: boolean
    selectedProject: string | null
    activeTabs: string[]
    onToggle: (isActive: boolean) => void
    onProjectSelect: (projectId: string | null) => void
    onTabOpen: (tabId: string) => void
    onTabClose: (tabId: string) => void
}

const SplitScreenContext = createContext<ContextType>({
    isActive: false,
    activeTabs: [],
    selectedProject: null,
    onProjectSelect: () => {},
    onToggle: () => {},
    onTabOpen: () => {},
    onTabClose: () => {},
})

export function SplitScreenProvider({ children }: PropsWithChildren) {
    const [isActive, setIsActive] = useState(false)
    const [activeTabs, setActiveTabs] = useState<string[]>([])
    const [selectedProject, setSelectedProject] = useState<string | null>(null)

    const onTabOpen = (tabId: string) => {
        if (!activeTabs.includes(tabId)) {
            setActiveTabs([...activeTabs, tabId])
        }
    }

    const onTabClose = (tabId: string) => {
        setActiveTabs(activeTabs.filter((id) => id !== tabId))
    }

    return (
        <SplitScreenContext.Provider
            value={{
                isActive,
                activeTabs,
                selectedProject,
                onProjectSelect: setSelectedProject,
                onToggle: setIsActive,
                onTabOpen,
                onTabClose,
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
