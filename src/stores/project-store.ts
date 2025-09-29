import { sampleCategories } from "@/lib/utils";
import { create } from "zustand";

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
  linkedDocs?: string[];
  priority: "low" | "high";
  users?: { id: number; name: string; image: string }[];
}

export interface Project {
  id: number;
  title: string;
  status: "on-hold" | "active" | "completed";
  contractor: string;
  deadline: string;
  budget: string;
  warning?: string | null;
  users?: { id: number; name: string; image: string }[];
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
