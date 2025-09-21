import { privateChats } from "@/lib/utils";
import { create } from "zustand";
import type { PrivateChat } from "@/types/chat";

export interface Task {
  id: number;
  title: string;
  status: "To Do" | "In-Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  assignedTo: string;
  deadline: string;
  linkedDocs?: string[];
  description: string;
}

export interface Project {
  id: number;
  name: string;
  status: "On-hold" | "In-Progress" | "Completed";
  assignedTo: string;
  deadline: string;
  budget: string;
  budgetConsumed: number; // percentage
  progress: number; // percentage
  contractor?: string;
  description: string;
  tasks: Task[];
}

// Docket-related interfaces
export interface Docket {
  id: number;
  name: string;
  status: "Active" | "On-hold" | "Completed";
  projects: DocketProject[];
}

export interface DocketProject {
  id: number;
  name: string;
  status: "In-Progress" | "On-hold" | "Completed";
  contractor: string;
  deadline: string;
  budget: string;
  budgetConsumed: number; // percentage
  progress: number; // percentage
  filingCapacity: number; // percentage
  invoices: Invoice[];
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "Active" | "Paid";
  fileUploaded: string;
}

// Directory-related interfaces
export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "In-Active" | "On-hold";
  dateAdded: string;
  lastActive: string;
  avatar?: string;
}

export interface Contractor {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectCount: number;
  type: "Electronics" | "Construction" | "Labor" | "Steel Work" | "Wood Work";
  status: "Active" | "In-Active" | "On-hold";
  dateAdded: string;
  lastActive: string;
  avatar?: string;
}

export interface Team {
  id: number;
  name: string;
  email: string;
  memberCount: number;
  department:
    | "Electronics"
    | "Construction"
    | "Labor"
    | "Steel Work"
    | "Wood Work";
  status: "Active" | "In-Active" | "On-hold";
  dateAdded: string;
  initials: string;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  productType:
    | "Electronics"
    | "Construction"
    | "Labor"
    | "Steel Work"
    | "Wood Work";
  status: "Active" | "In-Active" | "On-hold";
  dateAdded: string;
  initials: string;
}

export interface Equipment {
  id: number;
  name: string;
  equipmentType: "Construction";
  dateSelected: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  dateAdded: string;
}

// Admin-related interfaces
export interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "In-Active" | "On-hold";
  dateAdded: string;
  avatar?: string;
}

export interface SubManager {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "In-Active" | "On-hold";
  dateAdded: string;
  avatar?: string;
}

export interface Auditor {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "In-Active" | "On-hold";
  dateAdded: string;
  avatar?: string;
}

interface States {
  selectedChatId: number | null; // only store id for selected chat
  chats: PrivateChat[];
  isSplitScreen: boolean;
  selectedProjectId: number | null;
  projects: Project[];
  selectedDocketId: number | null;
  dockets: Docket[];
  // Directory states
  employees: Employee[];
  contractors: Contractor[];
  teams: Team[];
  vendors: Vendor[];
  equipments: Equipment[];
  locations: Location[];
  // Admin states
  managers: Manager[];
  subManagers: SubManager[];
  auditors: Auditor[];
}

interface Actions {
  setSelectedChat: (chatId: number) => void;
  setChats: (chats: PrivateChat[]) => void;
  updateChat: (chat: PrivateChat) => void;
  toggleSplitScreen: () => void;
  setSelectedProject: (projectId: number | null) => void;
  setProjects: (projects: Project[]) => void;
  setSelectedDocket: (docketId: number | null) => void;
  setDockets: (dockets: Docket[]) => void;
  // Directory actions
  setEmployees: (employees: Employee[]) => void;
  setContractors: (contractors: Contractor[]) => void;
  setTeams: (teams: Team[]) => void;
  setVendors: (vendors: Vendor[]) => void;
  setEquipments: (equipments: Equipment[]) => void;
  setLocations: (locations: Location[]) => void;
  // Admin actions
  setManagers: (managers: Manager[]) => void;
  setSubManagers: (subManagers: SubManager[]) => void;
  setAuditors: (auditors: Auditor[]) => void;
}

// Sample dockets data
const sampleDockets: Docket[] = [
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
        ],
      },
    ],
  },
];

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: 1,
    name: "HVAC service agreement for HQ",
    status: "On-hold",
    assignedTo: "Facilities",
    deadline: "December 20, 2026",
    budget: "$250k",
    budgetConsumed: 100,
    progress: 40,
    contractor: "John Smith",
    description:
      "Draft a plan to renegotiate our HVAC service contract at HQ. Target: 10% cost reduction. Deadline: end of this quarter.",
    tasks: [
      {
        id: 1,
        title: "Filterable table of all tasks in scope.",
        status: "To Do",
        priority: "High",
        assignedTo: "Facilities",
        deadline: "December 20, 2026",
        linkedDocs: ["renovation-vendors"],
        description: "Create comprehensive task overview",
      },
      {
        id: 2,
        title: "Review current contract",
        status: "In-Progress",
        priority: "High",
        assignedTo: "Facilities",
        deadline: "December 20, 2026",
        linkedDocs: ["renovation-vendors"],
        description: "Analyze existing HVAC contract terms",
      },
      {
        id: 3,
        title: "Draft negotiation strategy",
        status: "Completed",
        priority: "Low",
        assignedTo: "Facilities",
        deadline: "December 20, 2026",
        linkedDocs: ["renovation-vendors"],
        description: "Develop negotiation approach and tactics",
      },
      {
        id: 4,
        title: "Collect vendor performance data",
        status: "To Do",
        priority: "Low",
        assignedTo: "Facilities",
        deadline: "December 20, 2026",
        linkedDocs: ["renovation-vendors"],
        description: "Gather vendor performance metrics",
      },
      {
        id: 5,
        title: "Filterable table of all tasks in scope.",
        status: "In-Progress",
        priority: "Low",
        assignedTo: "Facilities",
        deadline: "December 20, 2026",
        linkedDocs: ["renovation-vendors"],
        description: "Additional task overview",
      },
      {
        id: 6,
        title: "Filterable table of all tasks in scope.",
        status: "Completed",
        priority: "Low",
        assignedTo: "Facilities",
        deadline: "December 20, 2026",
        linkedDocs: ["renovation-vendors"],
        description: "Final task documentation",
      },
    ],
  },
];

// Sample directory data
const sampleEmployees: Employee[] = [
  {
    id: 1,
    name: "Natali Craig",
    email: "natali@server.com",
    phone: "(270) 555-0114",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 14, 2022",
  },
  {
    id: 2,
    name: "Drew Cano",
    email: "drew@server.com",
    phone: "(225) 555-0118",
    status: "In-Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 12, 2022",
  },
  {
    id: 3,
    name: "Orlando Diggs",
    email: "orlando@server.com",
    phone: "(270) 555-0117",
    status: "On-hold",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 12, 2022",
  },
  {
    id: 4,
    name: "Andi Lane",
    email: "andi@server.com",
    phone: "(307) 555-0133",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 14, 2022",
  },
  {
    id: 5,
    name: "Kate Morrison",
    email: "kate@server.com",
    phone: "(671) 555-0110",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 13, 2022",
  },
];

const sampleContractors: Contractor[] = [
  {
    id: 1,
    name: "Natali Craig",
    email: "natali@server.com",
    phone: "(270) 555-0114",
    projectCount: 1,
    type: "Electronics",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 14, 2022",
  },
  {
    id: 2,
    name: "Drew Cano",
    email: "drew@server.com",
    phone: "(225) 555-0118",
    projectCount: 2,
    type: "Construction",
    status: "In-Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 12, 2022",
  },
  {
    id: 3,
    name: "Orlando Diggs",
    email: "orlando@server.com",
    phone: "(270) 555-0117",
    projectCount: 3,
    type: "Labor",
    status: "On-hold",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 12, 2022",
  },
  {
    id: 4,
    name: "Andi Lane",
    email: "andi@server.com",
    phone: "(307) 555-0133",
    projectCount: 5,
    type: "Steel Work",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 14, 2022",
  },
  {
    id: 5,
    name: "Kate Morrison",
    email: "kate@server.com",
    phone: "(671) 555-0110",
    projectCount: 2,
    type: "Wood Work",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    lastActive: "Mar 13, 2022",
  },
];

const sampleTeams: Team[] = [
  {
    id: 1,
    name: "Natali Craig",
    email: "natali@server.com",
    memberCount: 1,
    department: "Electronics",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    initials: "NC",
  },
  {
    id: 2,
    name: "Drew Cano",
    email: "drew@server.com",
    memberCount: 2,
    department: "Construction",
    status: "In-Active",
    dateAdded: "Feb 22, 2022",
    initials: "DC",
  },
  {
    id: 3,
    name: "Orlando Diggs",
    email: "orlando@server.com",
    memberCount: 3,
    department: "Labor",
    status: "On-hold",
    dateAdded: "Feb 22, 2022",
    initials: "OD",
  },
  {
    id: 4,
    name: "Andi Lane",
    email: "andi@server.com",
    memberCount: 5,
    department: "Steel Work",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    initials: "AL",
  },
  {
    id: 5,
    name: "Kate Morrison",
    email: "kate@server.com",
    memberCount: 2,
    department: "Wood Work",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    initials: "KM",
  },
];

const sampleVendors: Vendor[] = [
  {
    id: 1,
    name: "Natali Craig",
    email: "natali@server.com",
    productType: "Electronics",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    initials: "NC",
  },
  {
    id: 2,
    name: "Drew Cano",
    email: "drew@server.com",
    productType: "Construction",
    status: "In-Active",
    dateAdded: "Feb 22, 2022",
    initials: "DC",
  },
  {
    id: 3,
    name: "Orlando Diggs",
    email: "orlando@server.com",
    productType: "Labor",
    status: "On-hold",
    dateAdded: "Feb 22, 2022",
    initials: "OD",
  },
  {
    id: 4,
    name: "Andi Lane",
    email: "andi@server.com",
    productType: "Steel Work",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    initials: "AL",
  },
  {
    id: 5,
    name: "Kate Morrison",
    email: "kate@server.com",
    productType: "Wood Work",
    status: "Active",
    dateAdded: "Feb 22, 2022",
    initials: "KM",
  },
];

const sampleEquipments: Equipment[] = [
  {
    id: 1,
    name: "Bulldozer",
    equipmentType: "Construction",
    dateSelected: "Feb 22, 2022",
  },
  {
    id: 2,
    name: "Pavor",
    equipmentType: "Construction",
    dateSelected: "Feb 22, 2022",
  },
  {
    id: 3,
    name: "Drum Roller",
    equipmentType: "Construction",
    dateSelected: "Feb 22, 2022",
  },
  {
    id: 4,
    name: "Excavators",
    equipmentType: "Construction",
    dateSelected: "Feb 22, 2022",
  },
  {
    id: 5,
    name: "Grader",
    equipmentType: "Construction",
    dateSelected: "Feb 22, 2022",
  },
];

const sampleLocations: Location[] = [
  {
    id: 1,
    name: "Sarah's Appartment",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    phone: "(219) 555-0114",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 2,
    name: "Freshlen's Building",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    phone: "(225) 555-0118",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 3,
    name: "Joh's Flat",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    phone: "(270) 555-0117",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 4,
    name: "Gorgiano Stewards",
    address: "6391 Elgin St. Celina, Delaware 10299",
    phone: "(307) 555-0133",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 5,
    name: "Iqaaf",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
    phone: "(671) 555-0110",
    dateAdded: "Feb 22, 2022",
  },
];

// Sample admin data
const sampleManagers: Manager[] = [
  {
    id: 1,
    name: "Natali Craig",
    email: "natali@server.com",
    phone: "(270) 555-0114",
    status: "Active",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 2,
    name: "Drew Cano",
    email: "drew@server.com",
    phone: "(225) 555-0118",
    status: "In-Active",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 3,
    name: "Orlando Diggs",
    email: "orlando@server.com",
    phone: "(270) 555-0117",
    status: "On-hold",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 4,
    name: "Andi Lane",
    email: "andi@server.com",
    phone: "(307) 555-0133",
    status: "Active",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 5,
    name: "Kate Morrison",
    email: "kate@server.com",
    phone: "(671) 555-0110",
    status: "Active",
    dateAdded: "Feb 22, 2022",
  },
];

const sampleSubManagers: SubManager[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@server.com",
    phone: "(270) 555-0115",
    status: "Active",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 2,
    name: "Mike Wilson",
    email: "mike@server.com",
    phone: "(225) 555-0119",
    status: "Active",
    dateAdded: "Feb 22, 2022",
  },
];

const sampleAuditors: Auditor[] = [
  {
    id: 1,
    name: "Lisa Chen",
    email: "lisa@server.com",
    phone: "(270) 555-0120",
    status: "Active",
    dateAdded: "Feb 22, 2022",
  },
  {
    id: 2,
    name: "Robert Davis",
    email: "robert@server.com",
    phone: "(225) 555-0121",
    status: "Active",
    dateAdded: "Feb 22, 2022",
  },
];

export const useAppStore = create<States & Actions>((set, get) => ({
  selectedChatId: privateChats.length
    ? privateChats[privateChats.length - 1].id
    : null,
  chats: [...privateChats].reverse(),
  isSplitScreen: false,
  selectedProjectId: null,
  projects: sampleProjects,
  selectedDocketId: null,
  dockets: sampleDockets,
  // Directory data
  employees: sampleEmployees,
  contractors: sampleContractors,
  teams: sampleTeams,
  vendors: sampleVendors,
  equipments: sampleEquipments,
  locations: sampleLocations,
  // Admin data
  managers: sampleManagers,
  subManagers: sampleSubManagers,
  auditors: sampleAuditors,

  setSelectedChat: (chatId) => set({ selectedChatId: chatId }),

  setChats: (chats) => set({ chats }),

  updateChat: (updatedChat) => {
    const chats = get().chats.map((c) =>
      c.id === updatedChat.id ? updatedChat : c
    );
    set({ chats });
  },

  toggleSplitScreen: () =>
    set((state) => ({ isSplitScreen: !state.isSplitScreen })),

  setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),

  setProjects: (projects) => set({ projects }),

  setSelectedDocket: (docketId) => set({ selectedDocketId: docketId }),

  setDockets: (dockets) => set({ dockets }),

  // Directory actions
  setEmployees: (employees) => set({ employees }),
  setContractors: (contractors) => set({ contractors }),
  setTeams: (teams) => set({ teams }),
  setVendors: (vendors) => set({ vendors }),
  setEquipments: (equipments) => set({ equipments }),
  setLocations: (locations) => set({ locations }),
  // Admin actions
  setManagers: (managers) => set({ managers }),
  setSubManagers: (subManagers) => set({ subManagers }),
  setAuditors: (auditors) => set({ auditors }),
}));

// Selectors for always synced data
export const useSelectedChat = () =>
  useAppStore(
    (state) => state.chats.find((c) => c.id === state.selectedChatId) || null
  );

export const useSelectedProject = () =>
  useAppStore(
    (state) =>
      state.projects.find((p) => p.id === state.selectedProjectId) || null
  );

export const useSelectedDocket = () =>
  useAppStore(
    (state) =>
      state.dockets.find((d) => d.id === state.selectedDocketId) || null
  );

export const useSplitScreen = () => useAppStore((state) => state.isSplitScreen);
