import {
  useAllProjects,
  useAppStore,
  useCategories,
  useSelectedChat,
  useSelectedProject,
  useSplitScreen,
} from './stores';
import type { ProjectCategory } from './types';

// Export the main store and all hooks
export {
  useAppStore,
  useSelectedChat,
  useSplitScreen,
  useSelectedProject,
  useCategories,
  useAllProjects,
};

export type {
  User,
  Task,
  Project,
  Docket,
  ProjectCategory,
  DocketProject,
  Invoice,
  Employee,
  Contractor,
  Team,
  Vendor,
  Equipment,
  Location,
  Manager,
  SubManager,
  Auditor,
  Chat,
  ChatMessage,
  ChatResponse,
  MessagePair,
  SelectedModel,
} from './types';

export const useAdminStore = () => useAppStore((state) => state.admin);
export const useChatStore = useAppStore;
export const useDirectoryStore = () => useAppStore((state) => state.directory);
export const useProjectStore = <T>(
  selector: (state: { selectedProjectId: number | null; categories: ProjectCategory[] }) => T,
) => useAppStore((state) => selector(state.project));
