"use client";

import { Project, useSelectedProject } from "@/stores";
import ProjectMainContent from "../../../components/layout/ProjectMainContent";
import ProjectSelectorTab from "@/components/layout/project-selector-tab";

function ProjectsPage() {
  const selectedProject = useSelectedProject();

  function createNewProject() {}

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-primary/10 text-primary";
      case "medium":
        return "bg-yellow-100 text-[#D58D49]";
      case "low":
        return "bg-green-100 text-[#68B266]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTasksByStatus = (project: Project, status: string) => {
    switch (status) {
      case "To Do":
        return project.todo;
      case "In-Progress":
        return project.inProgress;
      case "Completed":
        return project.completed;
      default:
        return [];
    }
  };

  if (!selectedProject) {
    return (
      <section className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr]">
        {/* Left Sidebar - Project List */}
        <ProjectSelectorTab
          showCreateButton={true}
          onCreateProject={createNewProject}
        />

        {/* Main Content - No Project Selected */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a project to view details</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white flex-1 grid grid-cols-[1fr_4fr] w-full">
      <ProjectSelectorTab
        showCreateButton={true}
        onCreateProject={createNewProject}
      />
      <ProjectMainContent
        selectedProject={selectedProject}
        getTasksByStatus={getTasksByStatus}
        getPriorityColor={getPriorityColor}
      />
    </section>
  );
}

// Right Sidebar Component
// function RightSidebar({
//   onShowBottomSheet,
// }: {
//   onShowBottomSheet: () => void;
// }) {
//   return (
//     <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
//       <div className="space-y-4">
//         <div className="bg-white rounded-lg p-4">
//           <h3 className="font-semibold text-gray-900 mb-2">Linked Dockets</h3>
//           <button
//             onClick={onShowBottomSheet}
//             className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
//           >
//             <FileText className="size-4" />
//             <span>renovation-vendors</span>
//           </button>
//         </div>

//         <div className="bg-white rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold text-gray-900">Edit Project</h3>
//             <Edit className="size-4 text-gray-400" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Bottom Sheet Component
// function BottomSheet({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
//       <div className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">Project Details</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//         <div className="p-4">
//           <p className="text-gray-600">
//             Project details and additional information
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default ProjectsPage;
