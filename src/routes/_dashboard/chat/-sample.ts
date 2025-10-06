import type { Chat } from "@/store"

export const chats: Array<Chat> = [
    {
        id: "1",
        name: "ops-maintenance",
        selectedModel: "Deepseek-R1",
        messages: [
            [
                {
                    message: "How do I restart the ops service?",
                    createdAt: "2025-09-19T09:15:00Z",
                },
                {
                    response:
                        "Run `systemctl restart ops-service` to restart safely.",
                    createdAt: "2025-09-19T09:15:02Z",
                },
            ],
        ],
    },
    {
        id: "2",
        name: "admin-control",
        selectedModel: "OpenAI 04",
        messages: [
            [
                {
                    message: "List all admin roles.",
                    createdAt: "2025-09-19T09:20:00Z",
                },
                {
                    response:
                        "Admin roles: Super Admin, Project Admin, Viewer.",
                    createdAt: "2025-09-19T09:20:02Z",
                },
            ],
        ],
    },
    {
        id: "3",
        name: "system-logs",
        selectedModel: "Deepseek-R1",
        messages: [
            [
                {
                    message: "Show me the last 5 error logs.",
                    createdAt: "2025-09-19T09:25:00Z",
                },
                {
                    response:
                        "Here are the last 5 error entries from system logs...",
                    createdAt: "2025-09-19T09:25:03Z",
                },
            ],
        ],
    },
    {
        id: "4",
        name: "user-access",
        selectedModel: "OpenAI 04",
        messages: [
            [
                {
                    message: "Does Ali have access to reports?",
                    createdAt: "2025-09-19T09:30:00Z",
                },
                {
                    response:
                        "Yes, Ali has access to reports with read-only rights.",
                    createdAt: "2025-09-19T09:30:03Z",
                },
            ],
        ],
    },
    {
        id: "5",
        name: "data-backup",
        selectedModel: "Deepseek-R1",
        messages: [
            [
                {
                    message: "When was the last backup performed?",
                    createdAt: "2025-09-19T09:35:00Z",
                },
                {
                    response:
                        "The last backup was completed on 2025-09-18 at 22:00 UTC.",
                    createdAt: "2025-09-19T09:35:04Z",
                },
            ],
        ],
    },
]
