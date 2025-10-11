import type { Chat } from "@/store"

export const chats: Array<Chat> = [
    {
        id: "1",
        name: "ops-maintenance",
        selectedModel: "Deepseek-R1",
        messages: [
            {
                message: "How do I restart the ops service?",
                uid: "user-1",
                createdAt: "2025-09-19T09:15:00Z",
            },
            {
                message:
                    "Run `systemctl restart ops-service` to restart safely.",
                uid: "robot-1",
                createdAt: "2025-09-19T09:15:02Z",
            },
        ],
    },
    {
        id: "2",
        name: "admin-control",
        selectedModel: "OpenAI 04",
        messages: [
            {
                message: "List all admin roles.",
                uid: "user-1",
                createdAt: "2025-09-19T09:20:00Z",
            },
            {
                message: "Admin roles: Super Admin, Project Admin, Viewer.",
                uid: "robot-1",
                createdAt: "2025-09-19T09:20:02Z",
            },
        ],
    },
]
