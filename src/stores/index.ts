// Re-export all stores
export * from "./chat-store";
export * from "./project-store";
export * from "./docket-store";
export * from "./directory-store";
export * from "./admin-store";

// Legacy exports for backward compatibility
export { useChatStore as useAppStore } from "./chat-store";
export { useSelectedChat, useSplitScreen } from "./chat-store";
export { useSelectedProject } from "./project-store";
export { useSelectedDocket } from "./docket-store";

// Types exports
export type { Task, Project } from "./project-store";
export type { Docket, DocketProject, Invoice } from "./docket-store";
export type {
  Employee,
  Contractor,
  Team,
  Vendor,
  Equipment,
  Location,
} from "./directory-store";
export type { Manager, SubManager, Auditor } from "./admin-store";
