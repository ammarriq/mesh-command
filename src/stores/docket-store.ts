import { create } from "zustand";

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "Active" | "Paid";
  fileUploaded: string;
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

export interface Docket {
  id: number;
  name: string;
  status: "Active" | "On-hold" | "Completed";
  projects: DocketProject[];
}

interface DocketState {
  selectedDocketId: number | null;
  dockets: Docket[];
}

interface DocketActions {
  setSelectedDocket: (docketId: number | null) => void;
  setDockets: (dockets: Docket[]) => void;
  addDocket: (docket: Docket) => void;
  updateDocket: (docket: Docket) => void;
  deleteDocket: (docketId: number) => void;
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

export const useDocketStore = create<DocketState & DocketActions>(
  (set, get) => ({
    selectedDocketId: null,
    dockets: sampleDockets,

    setSelectedDocket: (docketId) => set({ selectedDocketId: docketId }),

    setDockets: (dockets) => set({ dockets }),

    addDocket: (docket) => {
      const { dockets } = get();
      set({ dockets: [...dockets, docket] });
    },

    updateDocket: (updatedDocket) => {
      const { dockets } = get();
      const updatedDockets = dockets.map((d) =>
        d.id === updatedDocket.id ? updatedDocket : d
      );
      set({ dockets: updatedDockets });
    },

    deleteDocket: (docketId) => {
      const { dockets } = get();
      const filteredDockets = dockets.filter((d) => d.id !== docketId);
      set({ dockets: filteredDockets });
    },
  })
);

// Selectors
export const useSelectedDocket = () =>
  useDocketStore(
    (state) =>
      state.dockets.find((d) => d.id === state.selectedDocketId) || null
  );
