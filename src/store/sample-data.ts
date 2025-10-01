import type {
  Auditor,
  Chat,
  Contractor,
  Docket,
  Employee,
  Equipment,
  Location,
  Manager,
  ProjectCategory,
  SubManager,
  Team,
  Vendor,
} from './types';

// DIRECTORY DATA
export const sampleEmployees: Employee[] = [
  {
    id: 1,
    name: 'Natali Craig',
    email: 'natali@server.com',
    phone: '(270) 555-0114',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 14, 2022',
  },
  {
    id: 2,
    name: 'Drew Cano',
    email: 'drew@server.com',
    phone: '(225) 555-0118',
    status: 'In-Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 12, 2022',
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    email: 'orlando@server.com',
    phone: '(270) 555-0117',
    status: 'On-hold',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 12, 2022',
  },
  {
    id: 4,
    name: 'Andi Lane',
    email: 'andi@server.com',
    phone: '(307) 555-0133',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 14, 2022',
  },
  {
    id: 5,
    name: 'Kate Morrison',
    email: 'kate@server.com',
    phone: '(671) 555-0110',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 13, 2022',
  },
];

export const sampleContractors: Contractor[] = [
  {
    id: 1,
    name: 'Natali Craig',
    email: 'natali@server.com',
    phone: '(270) 555-0114',
    projectCount: 1,
    type: 'Electronics',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 14, 2022',
  },
  {
    id: 2,
    name: 'Drew Cano',
    email: 'drew@server.com',
    phone: '(225) 555-0118',
    projectCount: 2,
    type: 'Construction',
    status: 'In-Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 12, 2022',
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    email: 'orlando@server.com',
    phone: '(270) 555-0117',
    projectCount: 3,
    type: 'Labor',
    status: 'On-hold',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 12, 2022',
  },
  {
    id: 4,
    name: 'Andi Lane',
    email: 'andi@server.com',
    phone: '(307) 555-0133',
    projectCount: 5,
    type: 'Steel Work',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 14, 2022',
  },
  {
    id: 5,
    name: 'Kate Morrison',
    email: 'kate@server.com',
    phone: '(671) 555-0110',
    projectCount: 2,
    type: 'Wood Work',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    lastActive: 'Mar 13, 2022',
  },
];

export const sampleTeams: Team[] = [
  {
    id: 1,
    name: 'Natali Craig',
    email: 'natali@server.com',
    memberCount: 1,
    department: 'Electronics',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'NC',
  },
  {
    id: 2,
    name: 'Drew Cano',
    email: 'drew@server.com',
    memberCount: 2,
    department: 'Construction',
    status: 'In-Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'DC',
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    email: 'orlando@server.com',
    memberCount: 3,
    department: 'Labor',
    status: 'On-hold',
    dateAdded: 'Feb 22, 2022',
    initials: 'OD',
  },
  {
    id: 4,
    name: 'Andi Lane',
    email: 'andi@server.com',
    memberCount: 5,
    department: 'Steel Work',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'AL',
  },
  {
    id: 5,
    name: 'Kate Morrison',
    email: 'kate@server.com',
    memberCount: 2,
    department: 'Wood Work',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'KM',
  },
];

export const sampleVendors: Vendor[] = [
  {
    id: 1,
    name: 'Natali Craig',
    email: 'natali@server.com',
    productType: 'Electronics',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'NC',
  },
  {
    id: 2,
    name: 'Drew Cano',
    email: 'drew@server.com',
    productType: 'Construction',
    status: 'In-Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'DC',
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    email: 'orlando@server.com',
    productType: 'Labor',
    status: 'On-hold',
    dateAdded: 'Feb 22, 2022',
    initials: 'OD',
  },
  {
    id: 4,
    name: 'Andi Lane',
    email: 'andi@server.com',
    productType: 'Steel Work',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'AL',
  },
  {
    id: 5,
    name: 'Kate Morrison',
    email: 'kate@server.com',
    productType: 'Wood Work',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
    initials: 'KM',
  },
];

export const sampleEquipments: Equipment[] = [
  {
    id: 1,
    name: 'Bulldozer',
    equipmentType: 'Construction',
    dateSelected: 'Feb 22, 2022',
  },
  {
    id: 2,
    name: 'Pavor',
    equipmentType: 'Construction',
    dateSelected: 'Feb 22, 2022',
  },
  {
    id: 3,
    name: 'Drum Roller',
    equipmentType: 'Construction',
    dateSelected: 'Feb 22, 2022',
  },
  {
    id: 4,
    name: 'Excavators',
    equipmentType: 'Construction',
    dateSelected: 'Feb 22, 2022',
  },
  {
    id: 5,
    name: 'Grader',
    equipmentType: 'Construction',
    dateSelected: 'Feb 22, 2022',
  },
];

// ============================================================================
// ADMIN DATA
// ============================================================================

export const sampleLocations: Location[] = [
  {
    id: 1,
    name: "Sarah's Appartment",
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    phone: '(219) 555-0114',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 2,
    name: "Freshlen's Building",
    address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    phone: '(225) 555-0118',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 3,
    name: "Joh's Flat",
    address: '8502 Preston Rd. Inglewood, Maine 98380',
    phone: '(270) 555-0117',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 4,
    name: 'Gorgiano Stewards',
    address: '6391 Elgin St. Celina, Delaware 10299',
    phone: '(307) 555-0133',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 5,
    name: 'Iqaaf',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    phone: '(671) 555-0110',
    dateAdded: 'Feb 22, 2022',
  },
];

// ADMIN DATA
export const sampleManagers: Manager[] = [
  {
    id: 1,
    name: 'Natali Craig',
    email: 'natali@server.com',
    phone: '(270) 555-0114',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 2,
    name: 'Drew Cano',
    email: 'drew@server.com',
    phone: '(225) 555-0118',
    status: 'In-Active',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    email: 'orlando@server.com',
    phone: '(270) 555-0117',
    status: 'On-hold',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 4,
    name: 'Andi Lane',
    email: 'andi@server.com',
    phone: '(307) 555-0133',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 5,
    name: 'Kate Morrison',
    email: 'kate@server.com',
    phone: '(671) 555-0110',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
  },
];

export const sampleSubManagers: SubManager[] = [
  {
    id: 1,
    name: 'Natali Craig',
    email: 'natali@server.com',
    phone: '(270) 555-0114',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
  },
  {
    id: 2,
    name: 'Drew Cano',
    email: 'drew@server.com',
    phone: '(225) 555-0118',
    status: 'In-Active',
    dateAdded: 'Feb 22, 2022',
  },
];

export const sampleAuditors: Auditor[] = [
  {
    id: 1,
    name: 'Natali Craig',
    email: 'natali@server.com',
    phone: '(270) 555-0114',
    status: 'Active',
    dateAdded: 'Feb 22, 2022',
  },
];

// DOCKET DATA
export const sampleDockets: Docket[] = [
  {
    id: 1,
    name: 'Steward 3890 Poplar Dr.',
    status: 'Active',
    projects: [
      {
        id: 1,
        name: 'HVAC service agreement for HQ',
        status: 'In-Progress',
        contractor: 'John Smith',
        deadline: 'December 20, 2026',
        budget: '$250k',
        budgetConsumed: 40,
        progress: 40,
        filingCapacity: 40,
        invoices: [
          {
            id: '1',
            number: 'Invoice #007 - Dec 2022',
            date: 'Dec 1, 2022',
            amount: 10.0,
            status: 'Active',
            fileUploaded: 'Dec 1, 2022',
          },
          {
            id: '2',
            number: 'Invoice #006 - Nov 2022',
            date: 'Nov 1, 2022',
            amount: 10.0,
            status: 'Paid',
            fileUploaded: 'Nov 1, 2022',
          },
          {
            id: '3',
            number: 'Invoice #005 - Oct 2022',
            date: 'Oct 1, 2022',
            amount: 10.0,
            status: 'Paid',
            fileUploaded: 'Oct 1, 2022',
          },
          {
            id: '4',
            number: 'Invoice #004 - Sep 2022',
            date: 'Sep 1, 2022',
            amount: 10.0,
            status: 'Paid',
            fileUploaded: 'Sep 1, 2022',
          },
          {
            id: '5',
            number: 'Invoice #003 - Aug 2022',
            date: 'Aug 1, 2022',
            amount: 10.0,
            status: 'Paid',
            fileUploaded: 'Aug 1, 2022',
          },
          {
            id: '6',
            number: 'Invoice #002 - Jul 2022',
            date: 'Jul 1, 2022',
            amount: 10.0,
            status: 'Paid',
            fileUploaded: 'Jul 1, 2022',
          },
          {
            id: '7',
            number: 'Invoice #001 - Jun 2022',
            date: 'Jun 1, 2022',
            amount: 10.0,
            status: 'Paid',
            fileUploaded: 'Jun 1, 2022',
          },
        ],
      },
    ],
  },
];

// CHAT DATA
export const privateChats: Chat[] = [
  {
    id: '1',
    name: 'ops-maintenance',
    selectedModel: 'Deepseek-R1',
    messages: [
      [
        {
          message: 'How do I restart the ops service?',
          createdAt: '2025-09-19T09:15:00Z',
        },
        {
          response: 'Run `systemctl restart ops-service` to restart safely.',
          createdAt: '2025-09-19T09:15:02Z',
        },
      ],
    ],
  },
  {
    id: '2',
    name: 'admin-control',
    selectedModel: 'OpenAI 04',
    messages: [
      [
        {
          message: 'List all admin roles.',
          createdAt: '2025-09-19T09:20:00Z',
        },
        {
          response: 'Admin roles: Super Admin, Project Admin, Viewer.',
          createdAt: '2025-09-19T09:20:02Z',
        },
      ],
    ],
  },
  {
    id: '3',
    name: 'system-logs',
    selectedModel: 'Deepseek-R1',
    messages: [
      [
        {
          message: 'Show me the last 5 error logs.',
          createdAt: '2025-09-19T09:25:00Z',
        },
        {
          response: 'Here are the last 5 error entries from system logs...',
          createdAt: '2025-09-19T09:25:03Z',
        },
      ],
    ],
  },
  {
    id: '4',
    name: 'user-access',
    selectedModel: 'OpenAI 04',
    messages: [
      [
        {
          message: 'Does Ali have access to reports?',
          createdAt: '2025-09-19T09:30:00Z',
        },
        {
          response: 'Yes, Ali has access to reports with read-only rights.',
          createdAt: '2025-09-19T09:30:03Z',
        },
      ],
    ],
  },
  {
    id: '5',
    name: 'data-backup',
    selectedModel: 'Deepseek-R1',
    messages: [
      [
        {
          message: 'When was the last backup performed?',
          createdAt: '2025-09-19T09:35:00Z',
        },
        {
          response: 'The last backup was completed on 2025-09-18 at 22:00 UTC.',
          createdAt: '2025-09-19T09:35:04Z',
        },
      ],
    ],
  },
];

// PROJECT DATA - ADDITIONAL TYPES
export const libPrivateChats: Array<{
  id: number;
  name: string;
  selectedModel: 'Deepseek-R1' | 'OpenAI 04';
  messages: Array<
    [{ message: string; createdAt: string }, { response: string; createdAt: string }]
  >;
}> = [
  {
    id: 1,
    name: 'ops-maintenance',
    selectedModel: 'Deepseek-R1',
    messages: [
      [
        {
          message: 'How do I restart the ops service?',
          createdAt: '2025-09-19T09:15:00Z',
        },
        {
          response: 'Run `systemctl restart ops-service` to restart safely.',
          createdAt: '2025-09-19T09:15:02Z',
        },
      ],
    ],
  },
  {
    id: 2,
    name: 'admin-control',
    selectedModel: 'OpenAI 04',
    messages: [
      [
        {
          message: 'List all admin roles.',
          createdAt: '2025-09-19T09:20:00Z',
        },
        {
          response: 'Admin roles: Super Admin, Project Admin, Viewer.',
          createdAt: '2025-09-19T09:20:02Z',
        },
      ],
    ],
  },
  {
    id: 3,
    name: 'system-logs',
    selectedModel: 'Deepseek-R1',
    messages: [
      [
        {
          message: 'Show me the last 5 error logs.',
          createdAt: '2025-09-19T09:25:00Z',
        },
        {
          response: 'Here are the last 5 error entries from system logs...',
          createdAt: '2025-09-19T09:25:03Z',
        },
      ],
    ],
  },
  {
    id: 4,
    name: 'user-access',
    selectedModel: 'OpenAI 04',
    messages: [
      [
        {
          message: 'Does Ali have access to reports?',
          createdAt: '2025-09-19T09:30:00Z',
        },
        {
          response: 'Yes, Ali has access to reports with read-only rights.',
          createdAt: '2025-09-19T09:30:03Z',
        },
      ],
    ],
  },
  {
    id: 5,
    name: 'data-backup',
    selectedModel: 'Deepseek-R1',
    messages: [
      [
        {
          message: 'When was the last backup performed?',
          createdAt: '2025-09-19T09:35:00Z',
        },
        {
          response: 'The last backup was completed on 2025-09-18 at 22:00 UTC.',
          createdAt: '2025-09-19T09:35:04Z',
        },
      ],
    ],
  },
];

export const sampleCategories: ProjectCategory[] = [
  {
    id: 1,
    name: 'Steward 3890 Poplar Dr.',
    projects: [
      {
        id: 1,
        title: 'HVAC service agreement for HQ',
        status: 'On-Hold',
        contractor: 'John Doe',
        deadline: 'December 20, 2026',
        budget: '$250k',
        warning: 'Budget exceeding limit',
        users: [
          { id: 1, name: 'John Smith', image: '/users/1.jpg' },
          { id: 2, name: 'Jane Doe', image: '/users/2.jpg' },
          { id: 3, name: 'Mike Brown', image: '/users/3.jpg' },
          { id: 4, name: 'Alice Green', image: '/users/4.jpg' },
          { id: 5, name: 'Bob White', image: '/users/5.jpg' },
        ],
        todo: [
          {
            id: 1,
            title: 'Review current contract terms',
            description: 'Analyze existing HVAC contract terms and identify areas for improvement',
            assignedTo: 'Facilities Team',
            deadline: 'November 15, 2025',
            linkedDocs: ['contract-analysis.pdf', 'vendor-comparison.xlsx'],
            priority: 'High',
            users: [
              { id: 1, name: 'John Smith', image: '/users/1.jpg' },
              { id: 2, name: 'Jane Doe', image: '/users/2.jpg' },
            ],
          },
          {
            id: 2,
            title: 'Collect vendor performance data',
            description: 'Gather performance metrics from current HVAC vendor',
            assignedTo: 'Operations Manager',
            deadline: 'November 20, 2025',
            linkedDocs: ['performance-metrics.pdf'],
            priority: 'Low',
            users: [
              { id: 3, name: 'Mike Brown', image: '/users/3.jpg' },
              { id: 4, name: 'Alice Green', image: '/users/4.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 3,
            title: 'Draft negotiation strategy',
            description: 'Develop comprehensive negotiation approach and tactics',
            assignedTo: 'Contract Manager',
            deadline: 'December 1, 2025',
            users: [
              { id: 3, name: 'Mike Brown', image: '/users/3.jpg' },
              { id: 4, name: 'Alice Green', image: '/users/4.jpg' },
            ],
            linkedDocs: ['negotiation-framework.docx'],
            priority: 'High',
          },
        ],
        completed: [
          {
            id: 4,
            title: 'Initial vendor assessment',
            description: 'Completed initial assessment of vendor capabilities',
            assignedTo: 'Project Lead',
            deadline: 'October 30, 2025',
            linkedDocs: ['vendor-assessment.pdf'],
            priority: 'High',
            users: [
              { id: 5, name: 'Bob White', image: '/users/5.jpg' },
              { id: 2, name: 'Jane Doe', image: '/users/2.jpg' },
            ],
          },
        ],
        dockets: [
          {
            id: 1,
            name: 'Steward 3890 Poplar Dr.',
            status: 'Active',
            projects: [
              {
                id: 1,
                name: 'HVAC service agreement for HQ',
                status: 'In-Progress',
                contractor: 'John Smith',
                deadline: 'December 20, 2026',
                budget: '$250k',
                budgetConsumed: 40,
                progress: 40,
                filingCapacity: 40,
                invoices: [
                  {
                    id: '1',
                    number: 'Invoice #007 - Dec 2022',
                    date: 'Dec 1, 2022',
                    amount: 10.0,
                    status: 'Active',
                    fileUploaded: 'Dec 1, 2022',
                  },
                  {
                    id: '2',
                    number: 'Invoice #006 - Nov 2022',
                    date: 'Nov 1, 2022',
                    amount: 10.0,
                    status: 'Paid',
                    fileUploaded: 'Nov 1, 2022',
                  },
                  {
                    id: '3',
                    number: 'Invoice #005 - Oct 2022',
                    date: 'Oct 1, 2022',
                    amount: 10.0,
                    status: 'Paid',
                    fileUploaded: 'Oct 1, 2022',
                  },
                  {
                    id: '4',
                    number: 'Invoice #004 - Sep 2022',
                    date: 'Sep 1, 2022',
                    amount: 10.0,
                    status: 'Paid',
                    fileUploaded: 'Sep 1, 2022',
                  },
                  {
                    id: '5',
                    number: 'Invoice #003 - Aug 2022',
                    date: 'Aug 1, 2022',
                    amount: 10.0,
                    status: 'Paid',
                    fileUploaded: 'Aug 1, 2022',
                  },
                  {
                    id: '6',
                    number: 'Invoice #002 - Jul 2022',
                    date: 'Jul 1, 2022',
                    amount: 10.0,
                    status: 'Paid',
                    fileUploaded: 'Jul 1, 2022',
                  },
                  {
                    id: '7',
                    number: 'Invoice #001 - Jun 2022',
                    date: 'Jun 1, 2022',
                    amount: 10.0,
                    status: 'Paid',
                    fileUploaded: 'Jun 1, 2022',
                  },
                ],
              },
              {
                id: 2,
                name: 'Building maintenance contract renewal',
                status: 'In-Progress',
                contractor: 'Jane Smith',
                deadline: 'January 15, 2026',
                budget: '$180k',
                budgetConsumed: 30,
                progress: 50,
                filingCapacity: 60,
                invoices: [
                  {
                    id: '1',
                    number: 'Invoice #001 - Jan 2025',
                    date: 'Jan 5, 2025',
                    amount: 20.0,
                    status: 'Active',
                    fileUploaded: 'Jan 5, 2025',
                  },
                  {
                    id: '2',
                    number: 'Invoice #002 - Feb 2025',
                    date: 'Feb 5, 2025',
                    amount: 18.0,
                    status: 'Paid',
                    fileUploaded: 'Feb 5, 2025',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Building maintenance contract renewal',
        status: 'Active',
        contractor: 'Jane Smith',
        deadline: 'January 15, 2026',
        budget: '$180k',
        warning: null,
        users: [
          { id: 1, name: 'Jane Smith', image: '/users/1.jpg' },
          { id: 2, name: 'Mike Brown', image: '/users/2.jpg' },
          { id: 3, name: 'Linda Lee', image: '/users/3.jpg' },
          { id: 4, name: 'Carlos Rivera', image: '/users/4.jpg' },
          { id: 5, name: 'Emma Watson', image: '/users/5.jpg' },
        ],
        todo: [
          {
            id: 5,
            title: 'Evaluate current service quality',
            description: 'Assess the quality of current building maintenance services',
            assignedTo: 'Building Manager',
            deadline: 'December 5, 2025',
            linkedDocs: ['service-evaluation.xlsx'],
            priority: 'High',
            users: [
              { id: 1, name: 'John Smith', image: '/users/1.jpg' },
              { id: 3, name: 'Mike Brown', image: '/users/3.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 6,
            title: 'Market research for alternatives',
            description: 'Research alternative maintenance service providers',
            assignedTo: 'Procurement Team',
            deadline: 'December 10, 2025',
            linkedDocs: ['market-research.pdf'],
            priority: 'Low',
            users: [
              { id: 1, name: 'John Smith', image: '/users/1.jpg' },
              { id: 3, name: 'Mike Brown', image: '/users/3.jpg' },
            ],
          },
        ],
        completed: [
          {
            id: 7,
            title: 'Contract expiry notification',
            description: 'Sent notification to current contractor about upcoming expiry',
            assignedTo: 'Contract Administrator',
            deadline: 'November 1, 2025',
            linkedDocs: ['expiry-notice.pdf'],
            priority: 'High',
            users: [
              { id: 1, name: 'John Smith', image: '/users/1.jpg' },
              { id: 3, name: 'Mike Brown', image: '/users/3.jpg' },
            ],
          },
        ],
        dockets: [
          {
            id: 2,
            name: 'Building maintenance contract renewal',
            status: 'Active',
            projects: [
              {
                id: 2,
                name: 'Building maintenance contract renewal',
                status: 'In-Progress',
                contractor: 'Jane Smith',
                deadline: 'January 15, 2026',
                budget: '$180k',
                budgetConsumed: 30,
                progress: 50,
                filingCapacity: 60,
                invoices: [
                  {
                    id: '1',
                    number: 'Invoice #001 - Jan 2025',
                    date: 'Jan 5, 2025',
                    amount: 20.0,
                    status: 'Active',
                    fileUploaded: 'Jan 5, 2025',
                  },
                  {
                    id: '2',
                    number: 'Invoice #002 - Feb 2025',
                    date: 'Feb 5, 2025',
                    amount: 18.0,
                    status: 'Paid',
                    fileUploaded: 'Feb 5, 2025',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
