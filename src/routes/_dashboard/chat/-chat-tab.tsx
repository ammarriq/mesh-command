import type { Project } from "@/types/project"

import ProjectList from "@/components/project-list"
import TabActions from "@/components/tab-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSplitScreen } from "@/context/split-screen"
import { cn } from "@/lib/utils"

import { categories } from "../projects/-sample"

import { chats } from "./-sample"

interface Props {
    selectedChat?: (typeof chats)[number]["id"]
    selectedProject?: Project["id"]
    onSelectChat: (chatId: string) => void
    onSelectProject: (projectId: Project["id"]) => void
}

const tabConfig = [
    { value: "private", label: "Private" },
    { value: "projects", label: "Projects" },
]

function ChatTab({
    selectedChat,
    selectedProject,
    onSelectChat,
    onSelectProject,
}: Props) {
    const { isActive } = useSplitScreen()

    return (
        <Tabs
            defaultValue="private"
            className="border-r-Bg-Dark max-h-[calc(100vh-10rem)] w-full border-r"
        >
            <TabsList className="h-14 w-full p-0">
                {tabConfig.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabActions onCreateNewItem={() => {}} type="chat" />

            <TabsContent
                value="private"
                className="flex flex-col overflow-y-auto"
            >
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={cn(
                            `text-text-primary px-2 py-2 text-start`,
                            selectedChat === chat.id ? "bg-Bg-Dark" : "",
                        )}
                    >
                        {chat.name}
                    </button>
                ))}
            </TabsContent>

            <TabsContent
                value="projects"
                className="flex flex-col gap-3 overflow-y-auto"
            >
                {categories.map((category) => (
                    <ProjectList
                        isChatTab
                        key={category.id}
                        title={category.name}
                        projects={category.projects}
                        showCreateButton={false}
                        selectedProject={selectedProject}
                        onSelectProject={isActive ? () => {} : onSelectProject}
                    />
                ))}
            </TabsContent>
        </Tabs>
    )
}

export default ChatTab
