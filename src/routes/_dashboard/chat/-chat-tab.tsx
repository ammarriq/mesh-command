import ProjectContentItem from "@/components/shared/project-content-item"
import TabActions from "@/components/shared/tab-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore, useProjectStore, useSelectedChat } from "@/store"

const tabConfig = [
    { value: "private", label: "Private" },
    { value: "projects", label: "Projects" },
]

export default function ChatTab() {
    const categories = useProjectStore((state) => state.categories)
    const {
        chat: { chats },
        setSelectedChat,
        createNewChat,
    } = useAppStore()

    const selectedChat = useSelectedChat()

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

            <TabActions onCreateNewItem={createNewChat} type="chat" />

            <TabsContent
                value="private"
                className="flex flex-col overflow-y-auto"
            >
                {chats.map((chat) => (
                    <button
                        onClick={() => setSelectedChat(chat.id)}
                        className={`text-text-primary px-2 py-2 text-start ${selectedChat?.id === chat.id ? "bg-Bg-Dark" : ""}`}
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
                    <ProjectContentItem
                        key={category.id}
                        title={category.name}
                        projects={category.projects}
                        showCreateButton={false}
                        isChatTab
                    />
                ))}
            </TabsContent>
        </Tabs>
    )
}
