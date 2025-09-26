import { create } from "zustand";

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

interface DirectoryState {
  employees: Employee[];
  contractors: Contractor[];
  teams: Team[];
  vendors: Vendor[];
  equipments: Equipment[];
  locations: Location[];
}

interface DirectoryActions {
  setEmployees: (employees: Employee[]) => void;
  setContractors: (contractors: Contractor[]) => void;
  setTeams: (teams: Team[]) => void;
  setVendors: (vendors: Vendor[]) => void;
  setEquipments: (equipments: Equipment[]) => void;
  setLocations: (locations: Location[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (employeeId: number) => void;
  addContractor: (contractor: Contractor) => void;
  updateContractor: (contractor: Contractor) => void;
  deleteContractor: (contractorId: number) => void;
  addTeam: (team: Team) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (teamId: number) => void;
  addVendor: (vendor: Vendor) => void;
  updateVendor: (vendor: Vendor) => void;
  deleteVendor: (vendorId: number) => void;
  addEquipment: (equipment: Equipment) => void;
  updateEquipment: (equipment: Equipment) => void;
  deleteEquipment: (equipmentId: number) => void;
  addLocation: (location: Location) => void;
  updateLocation: (location: Location) => void;
  deleteLocation: (locationId: number) => void;
}

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

export const useDirectoryStore = create<DirectoryState & DirectoryActions>(
  (set, get) => ({
    employees: sampleEmployees,
    contractors: sampleContractors,
    teams: sampleTeams,
    vendors: sampleVendors,
    equipments: sampleEquipments,
    locations: sampleLocations,

    setEmployees: (employees) => set({ employees }),
    setContractors: (contractors) => set({ contractors }),
    setTeams: (teams) => set({ teams }),
    setVendors: (vendors) => set({ vendors }),
    setEquipments: (equipments) => set({ equipments }),
    setLocations: (locations) => set({ locations }),

    addEmployee: (employee) => {
      const { employees } = get();
      set({ employees: [...employees, employee] });
    },

    updateEmployee: (updatedEmployee) => {
      const { employees } = get();
      const updatedEmployees = employees.map((e) =>
        e.id === updatedEmployee.id ? updatedEmployee : e
      );
      set({ employees: updatedEmployees });
    },

    deleteEmployee: (employeeId) => {
      const { employees } = get();
      const filteredEmployees = employees.filter((e) => e.id !== employeeId);
      set({ employees: filteredEmployees });
    },

    addContractor: (contractor) => {
      const { contractors } = get();
      set({ contractors: [...contractors, contractor] });
    },

    updateContractor: (updatedContractor) => {
      const { contractors } = get();
      const updatedContractors = contractors.map((c) =>
        c.id === updatedContractor.id ? updatedContractor : c
      );
      set({ contractors: updatedContractors });
    },

    deleteContractor: (contractorId) => {
      const { contractors } = get();
      const filteredContractors = contractors.filter(
        (c) => c.id !== contractorId
      );
      set({ contractors: filteredContractors });
    },

    addTeam: (team) => {
      const { teams } = get();
      set({ teams: [...teams, team] });
    },

    updateTeam: (updatedTeam) => {
      const { teams } = get();
      const updatedTeams = teams.map((t) =>
        t.id === updatedTeam.id ? updatedTeam : t
      );
      set({ teams: updatedTeams });
    },

    deleteTeam: (teamId) => {
      const { teams } = get();
      const filteredTeams = teams.filter((t) => t.id !== teamId);
      set({ teams: filteredTeams });
    },

    addVendor: (vendor) => {
      const { vendors } = get();
      set({ vendors: [...vendors, vendor] });
    },

    updateVendor: (updatedVendor) => {
      const { vendors } = get();
      const updatedVendors = vendors.map((v) =>
        v.id === updatedVendor.id ? updatedVendor : v
      );
      set({ vendors: updatedVendors });
    },

    deleteVendor: (vendorId) => {
      const { vendors } = get();
      const filteredVendors = vendors.filter((v) => v.id !== vendorId);
      set({ vendors: filteredVendors });
    },

    addEquipment: (equipment) => {
      const { equipments } = get();
      set({ equipments: [...equipments, equipment] });
    },

    updateEquipment: (updatedEquipment) => {
      const { equipments } = get();
      const updatedEquipments = equipments.map((e) =>
        e.id === updatedEquipment.id ? updatedEquipment : e
      );
      set({ equipments: updatedEquipments });
    },

    deleteEquipment: (equipmentId) => {
      const { equipments } = get();
      const filteredEquipments = equipments.filter((e) => e.id !== equipmentId);
      set({ equipments: filteredEquipments });
    },

    addLocation: (location) => {
      const { locations } = get();
      set({ locations: [...locations, location] });
    },

    updateLocation: (updatedLocation) => {
      const { locations } = get();
      const updatedLocations = locations.map((l) =>
        l.id === updatedLocation.id ? updatedLocation : l
      );
      set({ locations: updatedLocations });
    },

    deleteLocation: (locationId) => {
      const { locations } = get();
      const filteredLocations = locations.filter((l) => l.id !== locationId);
      set({ locations: filteredLocations });
    },
  })
);
