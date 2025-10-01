import { create } from 'zustand';

import * as SampleData from './sample-data';
import * as Types from './types';

// ===========================================================
// TYPE DEFINITIONS
// ===========================================================

interface AdminState {
  managers: Types.Manager[];
  subManagers: Types.SubManager[];
  auditors: Types.Auditor[];
}

interface ChatState {
  selectedChatId: string | null;
  chats: Types.Chat[];
  isSplitScreen: boolean;
}

interface DirectoryState {
  employees: Types.Employee[];
  contractors: Types.Contractor[];
  teams: Types.Team[];
  vendors: Types.Vendor[];
  equipments: Types.Equipment[];
  locations: Types.Location[];
}

interface ProjectState {
  selectedProjectId: number | null;
  categories: Types.ProjectCategory[];
}

interface AppState {
  admin: AdminState;
  chat: ChatState;
  directory: DirectoryState;
  project: ProjectState;
}

interface ChatActions {
  setSelectedChat: (chatId: string) => void;
  setChats: (chats: Types.Chat[]) => void;
  updateChat: (chat: Types.Chat) => void;
  createNewChat: () => void;
  toggleSplitScreen: () => void;
}

interface ProjectActions {
  setSelectedProject: (projectId: number | null) => void;
}

interface AppActions extends ChatActions, ProjectActions {}

type AppStore = AppState & AppActions;

// ===========================================================
// UTILITY FUNCTIONS
// ===========================================================

const getInitialProjectId = (): number | null => {
  if (SampleData.sampleCategories.length === 0) return null;

  const firstCategory = SampleData.sampleCategories[0];
  return firstCategory.projects.length > 0 ? firstCategory.projects[0].id : null;
};

const generateNextChatId = (chats: Types.Chat[]): string => {
  const maxId = Math.max(...chats.map((c) => parseInt(c.id)), 0);
  return (maxId + 1).toString();
};

// ===========================================================
// STORE IMPLEMENTATION
// ===========================================================

export const useAppStore = create<AppStore>((set, get) => ({
  admin: {
    managers: SampleData.sampleManagers,
    subManagers: SampleData.sampleSubManagers,
    auditors: SampleData.sampleAuditors,
  },

  chat: {
    selectedChatId: SampleData.privateChats.length
      ? SampleData.privateChats[SampleData.privateChats.length - 1].id
      : null,
    chats: [...SampleData.privateChats].reverse(),
    isSplitScreen: false,
  },

  directory: {
    employees: SampleData.sampleEmployees,
    contractors: SampleData.sampleContractors,
    teams: SampleData.sampleTeams,
    vendors: SampleData.sampleVendors,
    equipments: SampleData.sampleEquipments,
    locations: SampleData.sampleLocations,
  },

  project: {
    selectedProjectId: getInitialProjectId(),
    categories: SampleData.sampleCategories,
  },

  setSelectedChat: (chatId: string) =>
    set((state) => ({
      chat: { ...state.chat, selectedChatId: chatId },
    })),

  setChats: (chats: Types.Chat[]) =>
    set((state) => ({
      chat: { ...state.chat, chats },
    })),

  updateChat: (updatedChat: Types.Chat) =>
    set((state) => ({
      chat: {
        ...state.chat,
        chats: state.chat.chats.map((c) => (c.id === updatedChat.id ? updatedChat : c)),
      },
    })),

  createNewChat: () => {
    const { chat } = get();
    const newChatId = generateNextChatId(chat.chats);

    const newChat: Types.Chat = {
      id: newChatId,
      name: 'new-chat',
      selectedModel: undefined,
      messages: [],
    };

    set((state) => ({
      chat: {
        ...state.chat,
        chats: [newChat, ...state.chat.chats],
        selectedChatId: newChatId,
      },
    }));
  },

  toggleSplitScreen: () =>
    set((state) => ({
      chat: { ...state.chat, isSplitScreen: !state.chat.isSplitScreen },
    })),

  setSelectedProject: (projectId: number | null) =>
    set((state) => ({
      project: { ...state.project, selectedProjectId: projectId },
    })),
}));

// ===========================================================
// SELECTOR HOOKS
// ===========================================================

export const useSelectedChat = () =>
  useAppStore((state) => {
    const { selectedChatId, chats } = state.chat;
    return chats.find((c) => c.id === selectedChatId) || null;
  });

export const useSplitScreen = () => useAppStore((state) => state.chat.isSplitScreen);

export const useSelectedProject = (): Types.Project | null =>
  useAppStore((state) => {
    const { selectedProjectId, categories } = state.project;

    if (!selectedProjectId) return null;

    for (const category of categories) {
      const project = category.projects.find((p) => p.id === selectedProjectId);
      if (project) return project;
    }

    return null;
  });

export const useCategories = (): Types.ProjectCategory[] =>
  useAppStore((state) => state.project.categories);

export const useAllProjects = (): Types.Project[] => {
  return useAppStore((state) => {
    // Memoize the flattened projects to prevent infinite loops
    const projects: Types.Project[] = [];
    state.project.categories.forEach((category) => {
      projects.push(...category.projects);
    });
    return projects;
  });
};
