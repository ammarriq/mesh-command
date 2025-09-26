import { create } from "zustand";

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

interface AdminState {
  managers: Manager[];
  subManagers: SubManager[];
  auditors: Auditor[];
}

interface AdminActions {
  setManagers: (managers: Manager[]) => void;
  setSubManagers: (subManagers: SubManager[]) => void;
  setAuditors: (auditors: Auditor[]) => void;
  addManager: (manager: Manager) => void;
  updateManager: (manager: Manager) => void;
  deleteManager: (managerId: number) => void;
  addSubManager: (subManager: SubManager) => void;
  updateSubManager: (subManager: SubManager) => void;
  deleteSubManager: (subManagerId: number) => void;
  addAuditor: (auditor: Auditor) => void;
  updateAuditor: (auditor: Auditor) => void;
  deleteAuditor: (auditorId: number) => void;
}

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

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  managers: sampleManagers,
  subManagers: sampleSubManagers,
  auditors: sampleAuditors,

  setManagers: (managers) => set({ managers }),
  setSubManagers: (subManagers) => set({ subManagers }),
  setAuditors: (auditors) => set({ auditors }),

  addManager: (manager) => {
    const { managers } = get();
    set({ managers: [...managers, manager] });
  },

  updateManager: (updatedManager) => {
    const { managers } = get();
    const updatedManagers = managers.map((m) =>
      m.id === updatedManager.id ? updatedManager : m
    );
    set({ managers: updatedManagers });
  },

  deleteManager: (managerId) => {
    const { managers } = get();
    const filteredManagers = managers.filter((m) => m.id !== managerId);
    set({ managers: filteredManagers });
  },

  addSubManager: (subManager) => {
    const { subManagers } = get();
    set({ subManagers: [...subManagers, subManager] });
  },

  updateSubManager: (updatedSubManager) => {
    const { subManagers } = get();
    const updatedSubManagers = subManagers.map((sm) =>
      sm.id === updatedSubManager.id ? updatedSubManager : sm
    );
    set({ subManagers: updatedSubManagers });
  },

  deleteSubManager: (subManagerId) => {
    const { subManagers } = get();
    const filteredSubManagers = subManagers.filter(
      (sm) => sm.id !== subManagerId
    );
    set({ subManagers: filteredSubManagers });
  },

  addAuditor: (auditor) => {
    const { auditors } = get();
    set({ auditors: [...auditors, auditor] });
  },

  updateAuditor: (updatedAuditor) => {
    const { auditors } = get();
    const updatedAuditors = auditors.map((a) =>
      a.id === updatedAuditor.id ? updatedAuditor : a
    );
    set({ auditors: updatedAuditors });
  },

  deleteAuditor: (auditorId) => {
    const { auditors } = get();
    const filteredAuditors = auditors.filter((a) => a.id !== auditorId);
    set({ auditors: filteredAuditors });
  },
}));
