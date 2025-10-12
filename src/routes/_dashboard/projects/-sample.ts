import type { ProjectCategory } from "@/types/project-category"

export const categories: ProjectCategory[] = [
    {
        id: 1,
        name: "Steward 3890 Poplar Dr.",
        projects: [
            {
                id: 1,
                title: "HVAC service agreement for HQ",
                status: "On-Hold",
                contractor: "John Doe",
                deadline: "December 20, 2026",
                budget: "$250k",
                warning: "Budget exceeding limit",
                users: [
                    { id: 1, name: "John Smith", image: "/users/1.jpg" },
                    { id: 2, name: "Jane Doe", image: "/users/2.jpg" },
                    { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
                    { id: 4, name: "Alice Green", image: "/users/4.jpg" },
                    { id: 5, name: "Bob White", image: "/users/5.jpg" },
                ],
                tasks: [
                    {
                        id: 1,
                        title: "Review current contract terms",
                        description:
                            "Analyze existing HVAC contract terms and identify areas for improvement",
                        assignedTo: "Facilities Team",
                        deadline: "November 15, 2025",
                        status: "backlog",
                        linkedDocs: [
                            "contract-analysis.pdf",
                            "vendor-comparison.xlsx",
                        ],
                        priority: "High",
                        users: [
                            {
                                id: 1,
                                name: "John Smith",
                                image: "/users/1.jpg",
                            },
                            { id: 2, name: "Jane Doe", image: "/users/2.jpg" },
                        ],
                    },
                    {
                        id: 2,
                        title: "Collect vendor performance data",
                        description:
                            "Gather performance metrics from current HVAC vendor",
                        assignedTo: "Operations Manager",
                        deadline: "November 20, 2025",
                        status: "backlog",
                        linkedDocs: ["performance-metrics.pdf"],
                        priority: "Low",
                        users: [
                            {
                                id: 3,
                                name: "Mike Brown",
                                image: "/users/3.jpg",
                            },
                            {
                                id: 4,
                                name: "Alice Green",
                                image: "/users/4.jpg",
                            },
                        ],
                    },
                    {
                        id: 3,
                        title: "Draft negotiation strategy",
                        description:
                            "Develop comprehensive negotiation approach and tactics",
                        assignedTo: "Contract Manager",
                        status: "backlog",
                        deadline: "December 1, 2025",
                        users: [
                            {
                                id: 3,
                                name: "Mike Brown",
                                image: "/users/3.jpg",
                            },
                            {
                                id: 4,
                                name: "Alice Green",
                                image: "/users/4.jpg",
                            },
                        ],
                        linkedDocs: ["negotiation-framework.docx"],
                        priority: "High",
                    },
                    {
                        id: 4,
                        title: "Initial vendor assessment",
                        description:
                            "Completed initial assessment of vendor capabilities",
                        assignedTo: "Project Lead",
                        status: "backlog",
                        deadline: "October 30, 2025",
                        linkedDocs: ["vendor-assessment.pdf"],
                        priority: "High",
                        users: [
                            { id: 5, name: "Bob White", image: "/users/5.jpg" },
                            { id: 2, name: "Jane Doe", image: "/users/2.jpg" },
                        ],
                    },
                ],
                dockets: [
                    {
                        id: 1,
                        name: "Steward 3890 Poplar Dr.",
                        status: "Active",
                        projects: [
                            {
                                id: 1,
                                name: "HVAC service agreement for HQ",
                                status: "In-Progress",
                                contractor: "John Smith",
                                deadline: "December 20, 2026",
                                budget: "$250k",
                                budgetConsumed: 40,
                                progress: 40,
                                filingCapacity: 40,
                                invoices: [
                                    {
                                        id: "1",
                                        number: "Invoice #007 - Dec 2022",
                                        date: "Dec 1, 2022",
                                        amount: 10.0,
                                        status: "Active",
                                        fileUploaded: "Dec 1, 2022",
                                    },
                                    {
                                        id: "2",
                                        number: "Invoice #006 - Nov 2022",
                                        date: "Nov 1, 2022",
                                        amount: 10.0,
                                        status: "Paid",
                                        fileUploaded: "Nov 1, 2022",
                                    },
                                    {
                                        id: "3",
                                        number: "Invoice #005 - Oct 2022",
                                        date: "Oct 1, 2022",
                                        amount: 10.0,
                                        status: "Paid",
                                        fileUploaded: "Oct 1, 2022",
                                    },
                                    {
                                        id: "4",
                                        number: "Invoice #004 - Sep 2022",
                                        date: "Sep 1, 2022",
                                        amount: 10.0,
                                        status: "Paid",
                                        fileUploaded: "Sep 1, 2022",
                                    },
                                    {
                                        id: "5",
                                        number: "Invoice #003 - Aug 2022",
                                        date: "Aug 1, 2022",
                                        amount: 10.0,
                                        status: "Paid",
                                        fileUploaded: "Aug 1, 2022",
                                    },
                                    {
                                        id: "6",
                                        number: "Invoice #002 - Jul 2022",
                                        date: "Jul 1, 2022",
                                        amount: 10.0,
                                        status: "Paid",
                                        fileUploaded: "Jul 1, 2022",
                                    },
                                    {
                                        id: "7",
                                        number: "Invoice #001 - Jun 2022",
                                        date: "Jun 1, 2022",
                                        amount: 10.0,
                                        status: "Paid",
                                        fileUploaded: "Jun 1, 2022",
                                    },
                                    {
                                        id: "8",
                                        number: "Invoice #001 - Sep 2022",
                                        date: "Jun 1, 2022",
                                        amount: 10.0,
                                        status: "Paid",
                                        fileUploaded: "Jun 1, 2022",
                                    },
                                ],
                            },
                            {
                                id: 2,
                                name: "Building maintenance contract renewal",
                                status: "In-Progress",
                                contractor: "Jane Smith",
                                deadline: "January 15, 2026",
                                budget: "$180k",
                                budgetConsumed: 30,
                                progress: 50,
                                filingCapacity: 60,
                                invoices: [
                                    {
                                        id: "1",
                                        number: "Invoice #001 - Jan 2025",
                                        date: "Jan 5, 2025",
                                        amount: 20.0,
                                        status: "Active",
                                        fileUploaded: "Jan 5, 2025",
                                    },
                                    {
                                        id: "2",
                                        number: "Invoice #002 - Feb 2025",
                                        date: "Feb 5, 2025",
                                        amount: 18.0,
                                        status: "Paid",
                                        fileUploaded: "Feb 5, 2025",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                title: "Building maintenance contract renewal",
                status: "Active",
                contractor: "Jane Smith",
                deadline: "January 15, 2026",
                budget: "$180k",
                warning: null,
                users: [
                    { id: 1, name: "Jane Smith", image: "/users/1.jpg" },
                    { id: 2, name: "Mike Brown", image: "/users/2.jpg" },
                    { id: 3, name: "Linda Lee", image: "/users/3.jpg" },
                    { id: 4, name: "Carlos Rivera", image: "/users/4.jpg" },
                    { id: 5, name: "Emma Watson", image: "/users/5.jpg" },
                ],
                tasks: [
                    {
                        id: 5,
                        title: "Evaluate current service quality",
                        description:
                            "Assess the quality of current building maintenance services",
                        assignedTo: "Building Manager",
                        status: "backlog",
                        deadline: "December 5, 2025",
                        linkedDocs: ["service-evaluation.xlsx"],
                        priority: "High",
                        users: [
                            {
                                id: 1,
                                name: "John Smith",
                                image: "/users/1.jpg",
                            },
                            {
                                id: 3,
                                name: "Mike Brown",
                                image: "/users/3.jpg",
                            },
                        ],
                    },
                    {
                        id: 6,
                        title: "Market research for alternatives",
                        description:
                            "Research alternative maintenance service providers",
                        assignedTo: "Procurement Team",
                        deadline: "December 10, 2025",
                        linkedDocs: ["market-research.pdf"],
                        status: "in-progress",
                        priority: "Low",
                        users: [
                            {
                                id: 1,
                                name: "John Smith",
                                image: "/users/1.jpg",
                            },
                            {
                                id: 3,
                                name: "Mike Brown",
                                image: "/users/3.jpg",
                            },
                        ],
                    },
                    {
                        id: 7,
                        title: "Contract expiry notification",
                        description:
                            "Sent notification to current contractor about upcoming expiry",
                        assignedTo: "Contract Administrator",
                        deadline: "November 1, 2025",
                        status: "completed",
                        linkedDocs: ["expiry-notice.pdf"],
                        priority: "High",
                        users: [
                            {
                                id: 1,
                                name: "John Smith",
                                image: "/users/1.jpg",
                            },
                            {
                                id: 3,
                                name: "Mike Brown",
                                image: "/users/3.jpg",
                            },
                        ],
                    },
                ],

                dockets: [
                    {
                        id: 2,
                        name: "Building maintenance contract renewal",
                        status: "Active",
                        projects: [
                            {
                                id: 2,
                                name: "Building maintenance contract renewal",
                                status: "In-Progress",
                                contractor: "Jane Smith",
                                deadline: "January 15, 2026",
                                budget: "$180k",
                                budgetConsumed: 30,
                                progress: 50,
                                filingCapacity: 60,
                                invoices: [
                                    {
                                        id: "1",
                                        number: "Invoice #001 - Jan 2025",
                                        date: "Jan 5, 2025",
                                        amount: 20.0,
                                        status: "Active",
                                        fileUploaded: "Jan 5, 2025",
                                    },
                                    {
                                        id: "2",
                                        number: "Invoice #002 - Feb 2025",
                                        date: "Feb 5, 2025",
                                        amount: 18.0,
                                        status: "Paid",
                                        fileUploaded: "Feb 5, 2025",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
