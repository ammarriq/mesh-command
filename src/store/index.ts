import { useAppStore } from './stores';
import type { ProjectCategory } from './types';

export * from './stores';

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
