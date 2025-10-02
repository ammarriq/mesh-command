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
  {
    id: 2,
    name: 'Downtown Office Complex',
    projects: [
      {
        id: 3,
        title: 'Security system upgrade',
        status: 'Active',
        contractor: 'SecureMax Solutions',
        deadline: 'March 15, 2026',
        budget: '$180k',
        warning: null,
        users: [
          { id: 1, name: 'David Wilson', image: '/users/1.jpg' },
          { id: 2, name: 'Sarah Johnson', image: '/users/2.jpg' },
          { id: 3, name: 'Mark Thompson', image: '/users/3.jpg' },
          { id: 4, name: 'Lisa Rodriguez', image: '/users/4.jpg' },
          { id: 5, name: 'Tom Anderson', image: '/users/5.jpg' },
        ],
        todo: [
          {
            id: 8,
            title: 'Assess current security vulnerabilities',
            description: 'Conduct comprehensive security audit of existing systems',
            assignedTo: 'Security Team',
            deadline: 'December 10, 2025',
            linkedDocs: ['security-audit.pdf'],
            priority: 'High',
            users: [
              { id: 1, name: 'David Wilson', image: '/users/1.jpg' },
              { id: 2, name: 'Sarah Johnson', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 9,
            title: 'Design new access control system',
            description: 'Create blueprints for updated access control infrastructure',
            assignedTo: 'Design Team',
            deadline: 'January 20, 2026',
            linkedDocs: ['access-control-design.dwg'],
            priority: 'Medium',
            users: [
              { id: 3, name: 'Mark Thompson', image: '/users/3.jpg' },
              { id: 4, name: 'Lisa Rodriguez', image: '/users/4.jpg' },
            ],
          },
        ],
        completed: [
          {
            id: 10,
            title: 'Vendor selection completed',
            description: 'Selected SecureMax Solutions as primary contractor',
            assignedTo: 'Procurement Manager',
            deadline: 'November 30, 2025',
            linkedDocs: ['vendor-selection.pdf'],
            priority: 'High',
            users: [
              { id: 5, name: 'Tom Anderson', image: '/users/5.jpg' },
              { id: 1, name: 'David Wilson', image: '/users/1.jpg' },
            ],
          },
        ],
        dockets: [],
      },
      {
        id: 4,
        title: 'Elevator modernization project',
        status: 'On-Hold',
        contractor: 'Otis Elevator Co.',
        deadline: 'June 30, 2026',
        budget: '$320k',
        warning: 'Pending building permit approval',
        users: [
          { id: 1, name: 'Michael Chen', image: '/users/1.jpg' },
          { id: 2, name: 'Jennifer Lee', image: '/users/2.jpg' },
          { id: 3, name: 'Robert Kim', image: '/users/3.jpg' },
        ],
        todo: [
          {
            id: 11,
            title: 'Obtain building permits',
            description: 'Submit and follow up on elevator modernization permits',
            assignedTo: 'Legal Team',
            deadline: 'December 15, 2025',
            linkedDocs: ['permit-application.pdf'],
            priority: 'High',
            users: [{ id: 1, name: 'Michael Chen', image: '/users/1.jpg' }],
          },
        ],
        inProgress: [],
        completed: [
          {
            id: 12,
            title: 'Technical specifications review',
            description: 'Reviewed and approved technical specifications for new elevators',
            assignedTo: 'Engineering Team',
            deadline: 'November 5, 2025',
            linkedDocs: ['tech-specs.pdf'],
            priority: 'Medium',
            users: [
              { id: 2, name: 'Jennifer Lee', image: '/users/2.jpg' },
              { id: 3, name: 'Robert Kim', image: '/users/3.jpg' },
            ],
          },
        ],
        dockets: [],
      },
      {
        id: 5,
        title: 'Parking garage renovation',
        status: 'Active',
        contractor: 'Urban Construction Ltd.',
        deadline: 'April 10, 2026',
        budget: '$450k',
        warning: null,
        users: [
          { id: 1, name: 'Amanda Foster', image: '/users/1.jpg' },
          { id: 2, name: 'Chris Martinez', image: '/users/2.jpg' },
          { id: 3, name: 'Diana Park', image: '/users/3.jpg' },
          { id: 4, name: 'Ethan Cooper', image: '/users/4.jpg' },
        ],
        todo: [
          {
            id: 13,
            title: 'Install new LED lighting system',
            description: 'Replace old fluorescent lights with energy-efficient LEDs',
            assignedTo: 'Electrical Team',
            deadline: 'January 25, 2026',
            linkedDocs: ['lighting-plan.pdf'],
            priority: 'Medium',
            users: [
              { id: 1, name: 'Amanda Foster', image: '/users/1.jpg' },
              { id: 2, name: 'Chris Martinez', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 14,
            title: 'Concrete surface repair',
            description: 'Repair damaged concrete surfaces and apply protective coating',
            assignedTo: 'Construction Team',
            deadline: 'February 15, 2026',
            linkedDocs: ['concrete-assessment.pdf'],
            priority: 'High',
            users: [
              { id: 3, name: 'Diana Park', image: '/users/3.jpg' },
              { id: 4, name: 'Ethan Cooper', image: '/users/4.jpg' },
            ],
          },
        ],
        completed: [],
        dockets: [],
      },
      {
        id: 6,
        title: 'Fire safety system enhancement',
        status: 'Completed',
        contractor: 'FireGuard Systems',
        deadline: 'October 15, 2025',
        budget: '$95k',
        warning: null,
        users: [
          { id: 1, name: 'Kevin Walsh', image: '/users/1.jpg' },
          { id: 2, name: 'Nicole Adams', image: '/users/2.jpg' },
        ],
        todo: [],
        inProgress: [],
        completed: [
          {
            id: 15,
            title: 'Install new fire detection sensors',
            description: 'Completed installation of advanced fire detection system',
            assignedTo: 'Fire Safety Team',
            deadline: 'October 10, 2025',
            linkedDocs: ['installation-report.pdf'],
            priority: 'High',
            users: [
              { id: 1, name: 'Kevin Walsh', image: '/users/1.jpg' },
              { id: 2, name: 'Nicole Adams', image: '/users/2.jpg' },
            ],
          },
        ],
        dockets: [],
      },
      {
        id: 7,
        title: 'Rooftop garden installation',
        status: 'Active',
        contractor: 'GreenScape Solutions',
        deadline: 'May 20, 2026',
        budget: '$125k',
        warning: null,
        users: [
          { id: 1, name: 'Oliver Barnes', image: '/users/1.jpg' },
          { id: 2, name: 'Sophia Turner', image: '/users/2.jpg' },
          { id: 3, name: 'Lucas Mitchell', image: '/users/3.jpg' },
        ],
        todo: [
          {
            id: 16,
            title: 'Design irrigation system',
            description: 'Create comprehensive irrigation plan for rooftop garden',
            assignedTo: 'Landscape Team',
            deadline: 'January 30, 2026',
            linkedDocs: ['irrigation-design.pdf'],
            priority: 'Medium',
            users: [{ id: 1, name: 'Oliver Barnes', image: '/users/1.jpg' }],
          },
        ],
        inProgress: [
          {
            id: 17,
            title: 'Soil preparation and planting',
            description: 'Prepare soil beds and begin initial planting phase',
            assignedTo: 'Horticulture Team',
            deadline: 'March 15, 2026',
            linkedDocs: ['planting-schedule.xlsx'],
            priority: 'High',
            users: [
              { id: 2, name: 'Sophia Turner', image: '/users/2.jpg' },
              { id: 3, name: 'Lucas Mitchell', image: '/users/3.jpg' },
            ],
          },
        ],
        completed: [
          {
            id: 18,
            title: 'Structural assessment completed',
            description: 'Confirmed rooftop can support garden infrastructure',
            assignedTo: 'Structural Engineer',
            deadline: 'November 20, 2025',
            linkedDocs: ['structural-report.pdf'],
            priority: 'High',
            users: [{ id: 1, name: 'Oliver Barnes', image: '/users/1.jpg' }],
          },
        ],
        dockets: [],
      },
      {
        id: 8,
        title: 'WiFi infrastructure upgrade',
        status: 'Active',
        contractor: 'TechConnect Networks',
        deadline: 'February 28, 2026',
        budget: '$75k',
        warning: null,
        users: [
          { id: 1, name: 'Rachel Green', image: '/users/1.jpg' },
          { id: 2, name: 'Daniel Brown', image: '/users/2.jpg' },
          { id: 3, name: 'Maya Patel', image: '/users/3.jpg' },
          { id: 4, name: 'Alex Johnson', image: '/users/4.jpg' },
        ],
        todo: [
          {
            id: 19,
            title: 'Network capacity analysis',
            description: 'Analyze current network usage and future requirements',
            assignedTo: 'IT Team',
            deadline: 'December 20, 2025',
            linkedDocs: ['network-analysis.pdf'],
            priority: 'High',
            users: [
              { id: 1, name: 'Rachel Green', image: '/users/1.jpg' },
              { id: 2, name: 'Daniel Brown', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 20,
            title: 'Access point installation',
            description: 'Install new high-performance wireless access points',
            assignedTo: 'Network Team',
            deadline: 'January 15, 2026',
            linkedDocs: ['installation-guide.pdf'],
            priority: 'Medium',
            users: [
              { id: 3, name: 'Maya Patel', image: '/users/3.jpg' },
              { id: 4, name: 'Alex Johnson', image: '/users/4.jpg' },
            ],
          },
        ],
        completed: [],
        dockets: [],
      },
    ],
  },
  {
    id: 3,
    name: 'Riverside Manufacturing Facility',
    projects: [
      {
        id: 9,
        title: 'Production line automation',
        status: 'Active',
        contractor: 'AutoTech Industries',
        deadline: 'August 15, 2026',
        budget: '$750k',
        warning: 'Critical path dependency on equipment delivery',
        users: [
          { id: 1, name: 'Frank Miller', image: '/users/1.jpg' },
          { id: 2, name: 'Grace Chen', image: '/users/2.jpg' },
          { id: 3, name: 'Henry Davis', image: '/users/3.jpg' },
          { id: 4, name: 'Iris Wang', image: '/users/4.jpg' },
          { id: 5, name: 'Jack Wilson', image: '/users/5.jpg' },
        ],
        todo: [
          {
            id: 21,
            title: 'Equipment procurement planning',
            description: 'Finalize procurement strategy for automation equipment',
            assignedTo: 'Procurement Manager',
            deadline: 'January 10, 2026',
            linkedDocs: ['procurement-plan.xlsx'],
            priority: 'High',
            users: [
              { id: 1, name: 'Frank Miller', image: '/users/1.jpg' },
              { id: 2, name: 'Grace Chen', image: '/users/2.jpg' },
            ],
          },
          {
            id: 22,
            title: 'Staff training program development',
            description: 'Develop comprehensive training for automated systems',
            assignedTo: 'Training Coordinator',
            deadline: 'March 1, 2026',
            linkedDocs: ['training-curriculum.docx'],
            priority: 'Medium',
            users: [
              { id: 3, name: 'Henry Davis', image: '/users/3.jpg' },
              { id: 4, name: 'Iris Wang', image: '/users/4.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 23,
            title: 'System integration planning',
            description: 'Plan integration of new automation with existing systems',
            assignedTo: 'Systems Integration Team',
            deadline: 'February 20, 2026',
            linkedDocs: ['integration-plan.pdf'],
            priority: 'High',
            users: [
              { id: 5, name: 'Jack Wilson', image: '/users/5.jpg' },
              { id: 1, name: 'Frank Miller', image: '/users/1.jpg' },
            ],
          },
        ],
        completed: [
          {
            id: 24,
            title: 'Feasibility study completed',
            description: 'Completed comprehensive feasibility analysis for automation project',
            assignedTo: 'Engineering Team',
            deadline: 'November 25, 2025',
            linkedDocs: ['feasibility-study.pdf'],
            priority: 'High',
            users: [
              { id: 2, name: 'Grace Chen', image: '/users/2.jpg' },
              { id: 3, name: 'Henry Davis', image: '/users/3.jpg' },
            ],
          },
        ],
        dockets: [],
      },
      {
        id: 10,
        title: 'Warehouse expansion project',
        status: 'On-Hold',
        contractor: 'BuildRight Construction',
        deadline: 'September 30, 2026',
        budget: '$920k',
        warning: 'Zoning approval pending',
        users: [
          { id: 1, name: 'Karen Liu', image: '/users/1.jpg' },
          { id: 2, name: 'Larry Thompson', image: '/users/2.jpg' },
          { id: 3, name: 'Monica Garcia', image: '/users/3.jpg' },
        ],
        todo: [
          {
            id: 25,
            title: 'Obtain zoning permits',
            description: 'Submit and track zoning variance applications',
            assignedTo: 'Legal Affairs',
            deadline: 'December 30, 2025',
            linkedDocs: ['zoning-application.pdf'],
            priority: 'High',
            users: [{ id: 1, name: 'Karen Liu', image: '/users/1.jpg' }],
          },
        ],
        inProgress: [],
        completed: [
          {
            id: 26,
            title: 'Site survey and analysis',
            description: 'Completed detailed site survey for expansion area',
            assignedTo: 'Survey Team',
            deadline: 'October 20, 2025',
            linkedDocs: ['site-survey.pdf'],
            priority: 'Medium',
            users: [
              { id: 2, name: 'Larry Thompson', image: '/users/2.jpg' },
              { id: 3, name: 'Monica Garcia', image: '/users/3.jpg' },
            ],
          },
        ],
        dockets: [],
      },
    ],
  },
  {
    id: 4,
    name: 'Metro Transit Hub',
    projects: [
      {
        id: 11,
        title: 'Platform accessibility improvements',
        status: 'Active',
        contractor: 'Access Solutions Inc.',
        deadline: 'July 4, 2026',
        budget: '$340k',
        warning: null,
        users: [
          { id: 1, name: 'Nathan Brooks', image: '/users/1.jpg' },
          { id: 2, name: 'Olivia Scott', image: '/users/2.jpg' },
          { id: 3, name: 'Peter Chang', image: '/users/3.jpg' },
          { id: 4, name: 'Quinn Roberts', image: '/users/4.jpg' },
        ],
        todo: [
          {
            id: 27,
            title: 'Install elevator systems',
            description: 'Install new elevator systems for platform access',
            assignedTo: 'Installation Team',
            deadline: 'March 30, 2026',
            linkedDocs: ['elevator-specs.pdf'],
            priority: 'High',
            users: [
              { id: 1, name: 'Nathan Brooks', image: '/users/1.jpg' },
              { id: 2, name: 'Olivia Scott', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 28,
            title: 'Tactile paving installation',
            description: 'Install tactile paving for visually impaired passengers',
            assignedTo: 'Accessibility Team',
            deadline: 'February 28, 2026',
            linkedDocs: ['tactile-design.pdf'],
            priority: 'Medium',
            users: [
              { id: 3, name: 'Peter Chang', image: '/users/3.jpg' },
              { id: 4, name: 'Quinn Roberts', image: '/users/4.jpg' },
            ],
          },
        ],
        completed: [
          {
            id: 29,
            title: 'ADA compliance assessment',
            description: 'Completed comprehensive ADA compliance evaluation',
            assignedTo: 'Compliance Officer',
            deadline: 'November 10, 2025',
            linkedDocs: ['ada-assessment.pdf'],
            priority: 'High',
            users: [{ id: 1, name: 'Nathan Brooks', image: '/users/1.jpg' }],
          },
        ],
        dockets: [],
      },
      {
        id: 12,
        title: 'Digital signage system upgrade',
        status: 'Completed',
        contractor: 'Digital Display Pro',
        deadline: 'November 30, 2025',
        budget: '$85k',
        warning: null,
        users: [
          { id: 1, name: 'Rita Martinez', image: '/users/1.jpg' },
          { id: 2, name: 'Sam Wilson', image: '/users/2.jpg' },
        ],
        todo: [],
        inProgress: [],
        completed: [
          {
            id: 30,
            title: 'System installation and testing',
            description: 'Successfully installed and tested new digital signage system',
            assignedTo: 'Technical Team',
            deadline: 'November 25, 2025',
            linkedDocs: ['installation-report.pdf'],
            priority: 'Medium',
            users: [
              { id: 1, name: 'Rita Martinez', image: '/users/1.jpg' },
              { id: 2, name: 'Sam Wilson', image: '/users/2.jpg' },
            ],
          },
        ],
        dockets: [],
      },
      {
        id: 13,
        title: 'Security camera network expansion',
        status: 'Active',
        contractor: 'SecureVision Systems',
        deadline: 'April 15, 2026',
        budget: '$150k',
        warning: null,
        users: [
          { id: 1, name: 'Tyler Adams', image: '/users/1.jpg' },
          { id: 2, name: 'Uma Sharma', image: '/users/2.jpg' },
          { id: 3, name: 'Victor Lopez', image: '/users/3.jpg' },
          { id: 4, name: 'Wendy Kim', image: '/users/4.jpg' },
          { id: 5, name: 'Xavier Chen', image: '/users/5.jpg' },
        ],
        todo: [
          {
            id: 31,
            title: 'Camera placement optimization',
            description: 'Analyze and optimize camera placement for maximum coverage',
            assignedTo: 'Security Analyst',
            deadline: 'January 20, 2026',
            linkedDocs: ['coverage-analysis.pdf'],
            priority: 'High',
            users: [
              { id: 1, name: 'Tyler Adams', image: '/users/1.jpg' },
              { id: 2, name: 'Uma Sharma', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 32,
            title: 'Network infrastructure setup',
            description: 'Install network infrastructure for camera system',
            assignedTo: 'Network Team',
            deadline: 'February 10, 2026',
            linkedDocs: ['network-diagram.pdf'],
            priority: 'High',
            users: [
              { id: 3, name: 'Victor Lopez', image: '/users/3.jpg' },
              { id: 4, name: 'Wendy Kim', image: '/users/4.jpg' },
            ],
          },
        ],
        completed: [
          {
            id: 33,
            title: 'Security requirements analysis',
            description: 'Completed analysis of security requirements and threat assessment',
            assignedTo: 'Security Consultant',
            deadline: 'December 1, 2025',
            linkedDocs: ['threat-assessment.pdf'],
            priority: 'High',
            users: [
              { id: 5, name: 'Xavier Chen', image: '/users/5.jpg' },
              { id: 1, name: 'Tyler Adams', image: '/users/1.jpg' },
            ],
          },
        ],
        dockets: [],
      },
      {
        id: 14,
        title: 'Energy efficient lighting conversion',
        status: 'Active',
        contractor: 'EcoLight Solutions',
        deadline: 'March 20, 2026',
        budget: '$120k',
        warning: null,
        users: [
          { id: 1, name: 'Yuki Tanaka', image: '/users/1.jpg' },
          { id: 2, name: 'Zoe Miller', image: '/users/2.jpg' },
          { id: 3, name: 'Aaron Foster', image: '/users/3.jpg' },
        ],
        todo: [
          {
            id: 34,
            title: 'LED fixture installation',
            description: 'Replace existing fixtures with energy-efficient LED systems',
            assignedTo: 'Electrical Contractors',
            deadline: 'February 15, 2026',
            linkedDocs: ['lighting-plan.pdf'],
            priority: 'Medium',
            users: [
              { id: 1, name: 'Yuki Tanaka', image: '/users/1.jpg' },
              { id: 2, name: 'Zoe Miller', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 35,
            title: 'Smart control system integration',
            description: 'Integrate smart lighting controls with building management system',
            assignedTo: 'Automation Team',
            deadline: 'March 1, 2026',
            linkedDocs: ['control-system-specs.pdf'],
            priority: 'Low',
            users: [{ id: 3, name: 'Aaron Foster', image: '/users/3.jpg' }],
          },
        ],
        completed: [
          {
            id: 36,
            title: 'Energy audit completed',
            description: 'Completed comprehensive energy usage audit',
            assignedTo: 'Energy Consultant',
            deadline: 'November 15, 2025',
            linkedDocs: ['energy-audit.pdf'],
            priority: 'Medium',
            users: [{ id: 1, name: 'Yuki Tanaka', image: '/users/1.jpg' }],
          },
        ],
        dockets: [],
      },
      {
        id: 15,
        title: 'Passenger information system modernization',
        status: 'On-Hold',
        contractor: 'InfoTech Transit',
        deadline: 'June 10, 2026',
        budget: '$200k',
        warning: 'Software compatibility issues under review',
        users: [
          { id: 1, name: 'Blake Cooper', image: '/users/1.jpg' },
          { id: 2, name: 'Chloe Davis', image: '/users/2.jpg' },
          { id: 3, name: 'Derek Evans', image: '/users/3.jpg' },
          { id: 4, name: 'Emma Harris', image: '/users/4.jpg' },
        ],
        todo: [
          {
            id: 37,
            title: 'Resolve software compatibility',
            description: 'Address compatibility issues between new and legacy systems',
            assignedTo: 'Software Development Team',
            deadline: 'January 15, 2026',
            linkedDocs: ['compatibility-report.pdf'],
            priority: 'High',
            users: [
              { id: 1, name: 'Blake Cooper', image: '/users/1.jpg' },
              { id: 2, name: 'Chloe Davis', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [],
        completed: [
          {
            id: 38,
            title: 'System requirements analysis',
            description: 'Completed detailed analysis of passenger information system requirements',
            assignedTo: 'Business Analyst',
            deadline: 'October 30, 2025',
            linkedDocs: ['requirements-doc.pdf'],
            priority: 'High',
            users: [
              { id: 3, name: 'Derek Evans', image: '/users/3.jpg' },
              { id: 4, name: 'Emma Harris', image: '/users/4.jpg' },
            ],
          },
        ],
        dockets: [],
      },
      {
        id: 16,
        title: 'Climate control system optimization',
        status: 'Active',
        contractor: 'Climate Tech Pro',
        deadline: 'May 5, 2026',
        budget: '$180k',
        warning: null,
        users: [
          { id: 1, name: 'Finn Wright', image: '/users/1.jpg' },
          { id: 2, name: 'Gina Torres', image: '/users/2.jpg' },
          { id: 3, name: 'Hugo Martinez', image: '/users/3.jpg' },
          { id: 4, name: 'Ivy Chen', image: '/users/4.jpg' },
          { id: 5, name: 'Jake Morrison', image: '/users/5.jpg' },
        ],
        todo: [
          {
            id: 39,
            title: 'Install smart thermostats',
            description: 'Deploy intelligent temperature control systems',
            assignedTo: 'HVAC Team',
            deadline: 'February 20, 2026',
            linkedDocs: ['thermostat-specs.pdf'],
            priority: 'Medium',
            users: [
              { id: 1, name: 'Finn Wright', image: '/users/1.jpg' },
              { id: 2, name: 'Gina Torres', image: '/users/2.jpg' },
            ],
          },
        ],
        inProgress: [
          {
            id: 40,
            title: 'Ductwork inspection and repair',
            description: 'Comprehensive inspection and repair of HVAC ductwork',
            assignedTo: 'Maintenance Team',
            deadline: 'March 10, 2026',
            linkedDocs: ['ductwork-assessment.pdf'],
            priority: 'High',
            users: [
              { id: 3, name: 'Hugo Martinez', image: '/users/3.jpg' },
              { id: 4, name: 'Ivy Chen', image: '/users/4.jpg' },
            ],
          },
        ],
        completed: [
          {
            id: 41,
            title: 'System performance baseline',
            description: 'Established baseline performance metrics for current system',
            assignedTo: 'Performance Analyst',
            deadline: 'December 5, 2025',
            linkedDocs: ['performance-baseline.pdf'],
            priority: 'Medium',
            users: [
              { id: 5, name: 'Jake Morrison', image: '/users/5.jpg' },
              { id: 1, name: 'Finn Wright', image: '/users/1.jpg' },
            ],
          },
        ],
        dockets: [],
      },
    ],
  },
];
