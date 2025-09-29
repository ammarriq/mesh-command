import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ProjectCategory } from "@/stores";
import type { PrivateChat } from "@/types/chat";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const privateChats: PrivateChat[] = [
  {
    id: 1,
    name: "ops-maintenance",
    selectedModel: "Deepseek-R1",
    messages: [
      [
        {
          message: "How do I restart the ops service?",
          createdAt: "2025-09-19T09:15:00Z",
        },
        {
          response: "Run `systemctl restart ops-service` to restart safely.",
          createdAt: "2025-09-19T09:15:02Z",
        },
      ],
    ],
  },
  {
    id: 2,
    name: "admin-control",
    selectedModel: "OpenAI 04",
    messages: [
      [
        {
          message: "List all admin roles.",
          createdAt: "2025-09-19T09:20:00Z",
        },
        {
          response: "Admin roles: Super Admin, Project Admin, Viewer.",
          createdAt: "2025-09-19T09:20:02Z",
        },
      ],
    ],
  },
  {
    id: 3,
    name: "system-logs",
    selectedModel: "Deepseek-R1",
    messages: [
      [
        {
          message: "Show me the last 5 error logs.",
          createdAt: "2025-09-19T09:25:00Z",
        },
        {
          response: "Here are the last 5 error entries from system logs...",
          createdAt: "2025-09-19T09:25:03Z",
        },
      ],
    ],
  },
  {
    id: 4,
    name: "user-access",
    selectedModel: "OpenAI 04",
    messages: [
      [
        {
          message: "Does Ali have access to reports?",
          createdAt: "2025-09-19T09:30:00Z",
        },
        {
          response: "Yes, Ali has access to reports with read-only rights.",
          createdAt: "2025-09-19T09:30:03Z",
        },
      ],
    ],
  },
  {
    id: 5,
    name: "data-backup",
    selectedModel: "Deepseek-R1",
    messages: [
      [
        {
          message: "When was the last backup performed?",
          createdAt: "2025-09-19T09:35:00Z",
        },
        {
          response: "The last backup was completed on 2025-09-18 at 22:00 UTC.",
          createdAt: "2025-09-19T09:35:04Z",
        },
      ],
    ],
  },
];

// Sample project categories data
export const sampleCategories: ProjectCategory[] = [
  {
    id: 1,
    name: "Steward 3890 Poplar Dr.",
    projects: [
      {
        id: 1,
        title: "HVAC service agreement for HQ",
        status: "on-hold",
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
        todo: [
          {
            id: 1,
            title: "Review current contract terms",
            description:
              "Analyze existing HVAC contract terms and identify areas for improvement",
            assignedTo: "Facilities Team",
            deadline: "November 15, 2025",
            linkedDocs: ["contract-analysis.pdf", "vendor-comparison.xlsx"],
            priority: "high",
            users: [
              { id: 1, name: "John Smith", image: "/users/1.jpg" },
              { id: 2, name: "Jane Doe", image: "/users/2.jpg" },
            ],
          },
          {
            id: 2,
            title: "Collect vendor performance data",
            description: "Gather performance metrics from current HVAC vendor",
            assignedTo: "Operations Manager",
            deadline: "November 20, 2025",
            linkedDocs: ["performance-metrics.pdf"],
            priority: "low",
            users: [
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
              { id: 4, name: "Alice Green", image: "/users/4.jpg" },
            ],
          },
        ],
        inProgress: [
          {
            id: 3,
            title: "Draft negotiation strategy",
            description:
              "Develop comprehensive negotiation approach and tactics",
            assignedTo: "Contract Manager",
            deadline: "December 1, 2025",
            users: [
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
              { id: 4, name: "Alice Green", image: "/users/4.jpg" },
            ],
            linkedDocs: ["negotiation-framework.docx"],
            priority: "high",
          },
        ],
        completed: [
          {
            id: 4,
            title: "Initial vendor assessment",
            description: "Completed initial assessment of vendor capabilities",
            assignedTo: "Project Lead",
            deadline: "October 30, 2025",
            linkedDocs: ["vendor-assessment.pdf"],
            priority: "high",
            users: [
              { id: 5, name: "Bob White", image: "/users/5.jpg" },
              { id: 2, name: "Jane Doe", image: "/users/2.jpg" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Building maintenance contract renewal",
        status: "active",
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
        todo: [
          {
            id: 5,
            title: "Evaluate current service quality",
            description:
              "Assess the quality of current building maintenance services",
            assignedTo: "Building Manager",
            deadline: "December 5, 2025",
            linkedDocs: ["service-evaluation.xlsx"],
            priority: "high",
            users: [
              { id: 1, name: "John Smith", image: "/users/1.jpg" },
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
            ],
          },
        ],
        inProgress: [
          {
            id: 6,
            title: "Market research for alternatives",
            description: "Research alternative maintenance service providers",
            assignedTo: "Procurement Team",
            deadline: "December 10, 2025",
            linkedDocs: ["market-research.pdf"],
            priority: "low",
            users: [
              { id: 1, name: "John Smith", image: "/users/1.jpg" },
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
            ],
          },
        ],
        completed: [
          {
            id: 7,
            title: "Contract expiry notification",
            description:
              "Sent notification to current contractor about upcoming expiry",
            assignedTo: "Contract Administrator",
            deadline: "November 1, 2025",
            linkedDocs: ["expiry-notice.pdf"],
            priority: "high",
            users: [
              { id: 1, name: "John Smith", image: "/users/1.jpg" },
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Downtown Office Complex",
    projects: [
      {
        id: 3,
        title: "Security system upgrade",
        status: "completed",
        contractor: "Security Solutions Inc",
        deadline: "October 1, 2025",
        budget: "$95k",
        warning: null,
        users: [
          { id: 1, name: "Alice Green", image: "/users/1.jpg" },
          { id: 2, name: "Bob White", image: "/users/2.jpg" },
          { id: 3, name: "Jane Doe", image: "/users/3.jpg" },
          { id: 4, name: "Mike Brown", image: "/users/4.jpg" },
          { id: 5, name: "John Smith", image: "/users/5.jpg" },
        ],
        todo: [],
        inProgress: [],
        completed: [
          {
            id: 8,
            title: "System installation",
            description:
              "Complete installation of new security cameras and access control",
            assignedTo: "Security Team",
            deadline: "September 30, 2025",
            linkedDocs: ["installation-report.pdf"],
            priority: "high",
            users: [
              { id: 2, name: "John Smith", image: "/users/2.jpg" },
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
            ],
          },
          {
            id: 9,
            title: "Staff training",
            description: "Train staff on new security system operations",
            assignedTo: "Training Coordinator",
            deadline: "October 1, 2025",
            linkedDocs: ["training-materials.pdf"],
            priority: "low",
            users: [
              { id: 1, name: "John Smith", image: "/users/1.jpg" },
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Riverside Manufacturing Plant",
    projects: [
      {
        id: 4,
        title: "Equipment modernization project",
        status: "active",
        contractor: "TechCore Industries",
        deadline: "March 15, 2026",
        budget: "$420k",
        warning: null,
        users: [
          { id: 1, name: "Carlos Rivera", image: "/users/1.jpg" },
          { id: 2, name: "Linda Lee", image: "/users/2.jpg" },
          { id: 3, name: "Emma Watson", image: "/users/3.jpg" },
          { id: 4, name: "Noah Scott", image: "/users/4.jpg" },
          { id: 5, name: "Jane Smith", image: "/users/5.jpg" },
        ],
        todo: [
          {
            id: 10,
            title: "Equipment specifications review",
            description:
              "Review and finalize technical specifications for new equipment",
            assignedTo: "Engineering Team",
            deadline: "December 15, 2025",
            linkedDocs: ["spec-sheet.pdf", "technical-requirements.docx"],
            priority: "high",
            users: [
              { id: 1, name: "John Smith", image: "/users/1.jpg" },
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
            ],
          },
        ],
        inProgress: [
          {
            id: 11,
            title: "Vendor selection process",
            description: "Evaluate and select equipment vendors",
            assignedTo: "Procurement Manager",
            deadline: "January 10, 2026",
            linkedDocs: ["vendor-proposals.pdf"],
            priority: "high",
            users: [
              { id: 1, name: "John Smith", image: "/users/1.jpg" },
              { id: 3, name: "Mike Brown", image: "/users/3.jpg" },
            ],
          },
        ],
        completed: [
          {
            id: 12,
            title: "Project kickoff meeting",
            description:
              "Completed initial project planning and team assignment",
            assignedTo: "Project Manager",
            deadline: "November 10, 2025",
            linkedDocs: ["kickoff-notes.pdf"],
            priority: "high",
            users: [
              { id: 1, name: "Carlos Rivera", image: "/users/1.jpg" },
              { id: 5, name: "Jane Smith", image: "/users/5.jpg" },
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Waste management system overhaul",
        status: "on-hold",
        contractor: "EcoSolutions Ltd",
        deadline: "June 30, 2026",
        budget: "$150k",
        warning: "Pending environmental approval",
        users: [
          { id: 1, name: "Emma Watson", image: "/users/1.jpg" },
          { id: 2, name: "Noah Scott", image: "/users/2.jpg" },
          { id: 3, name: "Carlos Rivera", image: "/users/3.jpg" },
          { id: 4, name: "Linda Lee", image: "/users/4.jpg" },
          { id: 5, name: "Mike Brown", image: "/users/5.jpg" },
        ],
        todo: [
          {
            id: 13,
            title: "Environmental impact assessment",
            description:
              "Complete environmental impact study for new waste system",
            assignedTo: "Environmental Consultant",
            deadline: "January 30, 2026",
            linkedDocs: ["impact-study-draft.pdf"],
            priority: "high",
            users: [
              { id: 1, name: "Emma Watson", image: "/users/1.jpg" },
              { id: 2, name: "Noah Scott", image: "/users/2.jpg" },
            ],
          },
        ],
        inProgress: [],
        completed: [
          {
            id: 14,
            title: "Current system audit",
            description: "Audited existing waste management processes",
            assignedTo: "Operations Team",
            deadline: "October 15, 2025",
            linkedDocs: ["audit-report.pdf"],
            priority: "low",
            users: [
              { id: 3, name: "Carlos Rivera", image: "/users/3.jpg" },
              { id: 4, name: "Linda Lee", image: "/users/4.jpg" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "North Campus Research Center",
    projects: [
      {
        id: 6,
        title: "Lab equipment installation",
        status: "completed",
        contractor: "LabTech Solutions",
        deadline: "September 15, 2025",
        budget: "$320k",
        warning: null,
        users: [
          { id: 1, name: "Olivia Turner", image: "/users/1.jpg" },
          { id: 2, name: "Henry Adams", image: "/users/2.jpg" },
          { id: 3, name: "Sophia Clark", image: "/users/3.jpg" },
          { id: 4, name: "Jack Evans", image: "/users/4.jpg" },
          { id: 5, name: "Emma Watson", image: "/users/5.jpg" },
        ],
        todo: [],
        inProgress: [],
        completed: [
          {
            id: 15,
            title: "Equipment delivery and setup",
            description: "All laboratory equipment delivered and installed",
            assignedTo: "Installation Team",
            deadline: "September 10, 2025",
            linkedDocs: ["installation-checklist.pdf", "warranty-docs.pdf"],
            priority: "high",
          },
          {
            id: 16,
            title: "Safety compliance verification",
            description: "Verified all equipment meets safety standards",
            assignedTo: "Safety Inspector",
            deadline: "September 15, 2025",
            linkedDocs: ["safety-report.pdf"],
            priority: "high",
          },
        ],
      },
      {
        id: 7,
        title: "Network infrastructure upgrade",
        status: "active",
        contractor: "NetWork Pro",
        deadline: "February 28, 2026",
        budget: "$85k",
        warning: null,
        users: [
          { id: 1, name: "Sophia Clark", image: "/users/1.jpg" },
          { id: 2, name: "Jack Evans", image: "/users/2.jpg" },
          { id: 3, name: "Olivia Turner", image: "/users/3.jpg" },
          { id: 4, name: "Henry Adams", image: "/users/4.jpg" },
          { id: 5, name: "Linda Lee", image: "/users/5.jpg" },
        ],
        todo: [
          {
            id: 17,
            title: "Network architecture planning",
            description: "Design new network topology for research center",
            assignedTo: "Network Engineer",
            deadline: "December 20, 2025",
            linkedDocs: ["network-diagram.pdf"],
            priority: "high",
            users: [
              { id: 1, name: "Sophia Clark", image: "/users/1.jpg" },
              { id: 2, name: "Jack Evans", image: "/users/2.jpg" },
            ],
          },
        ],
        inProgress: [
          {
            id: 18,
            title: "Cable infrastructure assessment",
            description:
              "Assess existing cable infrastructure and replacement needs",
            assignedTo: "Technical Team",
            deadline: "January 5, 2026",
            linkedDocs: ["infrastructure-assessment.xlsx"],
            priority: "low",
            users: [
              { id: 3, name: "Olivia Turner", image: "/users/3.jpg" },
              { id: 4, name: "Henry Adams", image: "/users/4.jpg" },
            ],
          },
        ],
        completed: [
          {
            id: 19,
            title: "Initial site survey",
            description:
              "Completed comprehensive site survey for network upgrade",
            assignedTo: "Site Survey Team",
            deadline: "November 25, 2025",
            linkedDocs: ["site-survey.pdf"],
            priority: "high",
            users: [
              { id: 1, name: "Sophia Clark", image: "/users/1.jpg" },
              { id: 5, name: "Linda Lee", image: "/users/5.jpg" },
            ],
          },
        ],
      },
    ],
  },
];
