import { create } from "zustand";

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
  linkedDocs?: string[];
  priority: "low" | "high";
}

export interface Project {
  id: number;
  title: string;
  status: "on-hold" | "active" | "completed";
  contractor: string;
  deadline: string;
  budget: string;
  warning?: string | null;
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
}

export interface ProjectCategory {
  id: number;
  name: string;
  projects: Project[];
}

interface ProjectState {
  selectedProjectId: number | null;
  selectedCategoryId: number | null;
  categories: ProjectCategory[];
}

interface ProjectActions {
  setSelectedProject: (projectId: number | null) => void;
  setSelectedCategory: (categoryId: number | null) => void;
  setCategories: (categories: ProjectCategory[]) => void;
  addCategory: (category: ProjectCategory) => void;
  updateCategory: (category: ProjectCategory) => void;
  deleteCategory: (categoryId: number) => void;
  addProject: (categoryId: number, project: Project) => void;
  updateProject: (categoryId: number, project: Project) => void;
  deleteProject: (categoryId: number, projectId: number) => void;
}

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
          },
          {
            id: 2,
            title: "Collect vendor performance data",
            description: "Gather performance metrics from current HVAC vendor",
            assignedTo: "Operations Manager",
            deadline: "November 20, 2025",
            linkedDocs: ["performance-metrics.pdf"],
            priority: "low",
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
          },
          {
            id: 9,
            title: "Staff training",
            description: "Train staff on new security system operations",
            assignedTo: "Training Coordinator",
            deadline: "October 1, 2025",
            linkedDocs: ["training-materials.pdf"],
            priority: "low",
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
        todo: [
          {
            id: 17,
            title: "Network architecture planning",
            description: "Design new network topology for research center",
            assignedTo: "Network Engineer",
            deadline: "December 20, 2025",
            linkedDocs: ["network-diagram.pdf"],
            priority: "high",
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
          },
        ],
      },
    ],
  },
];

export const useProjectStore = create<ProjectState & ProjectActions>(
  (set, get) => ({
    selectedProjectId: null,
    selectedCategoryId: null,
    categories: sampleCategories,

    setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),

    setSelectedCategory: (categoryId) =>
      set({ selectedCategoryId: categoryId }),

    setCategories: (categories) => set({ categories }),

    addCategory: (category) => {
      const { categories } = get();
      set({ categories: [...categories, category] });
    },

    updateCategory: (updatedCategory) => {
      const { categories } = get();
      const updatedCategories = categories.map((c) =>
        c.id === updatedCategory.id ? updatedCategory : c
      );
      set({ categories: updatedCategories });
    },

    deleteCategory: (categoryId) => {
      const { categories } = get();
      const filteredCategories = categories.filter((c) => c.id !== categoryId);
      set({ categories: filteredCategories });
    },

    addProject: (categoryId, project) => {
      const { categories } = get();
      const updatedCategories = categories.map((category) =>
        category.id === categoryId
          ? { ...category, projects: [...category.projects, project] }
          : category
      );
      set({ categories: updatedCategories });
    },

    updateProject: (categoryId, updatedProject) => {
      const { categories } = get();
      const updatedCategories = categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              projects: category.projects.map((p) =>
                p.id === updatedProject.id ? updatedProject : p
              ),
            }
          : category
      );
      set({ categories: updatedCategories });
    },

    deleteProject: (categoryId, projectId) => {
      const { categories } = get();
      const updatedCategories = categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              projects: category.projects.filter((p) => p.id !== projectId),
            }
          : category
      );
      set({ categories: updatedCategories });
    },
  })
);

// Selectors
export const useSelectedProject = () =>
  useProjectStore((state) => {
    if (!state.selectedProjectId) return null;

    for (const category of state.categories) {
      const project = category.projects.find(
        (p) => p.id === state.selectedProjectId
      );
      if (project) return project;
    }

    return null;
  });

export const useSelectedCategory = () =>
  useProjectStore(
    (state) =>
      state.categories.find((c) => c.id === state.selectedCategoryId) || null
  );

// Helper selector to get all projects across categories (for backward compatibility)
let cachedAllProjects: Project[] = [];
let lastCategoriesRef: ProjectCategory[] | null = null;

export const useAllProjects = () =>
  useProjectStore((state) => {
    // Only recalculate if categories reference has changed
    if (state.categories !== lastCategoriesRef) {
      cachedAllProjects = state.categories.flatMap(
        (category) => category.projects
      );
      lastCategoriesRef = state.categories;
    }
    return cachedAllProjects;
  });
