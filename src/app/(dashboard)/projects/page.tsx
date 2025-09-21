"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  FileText,
  Calendar,
  DollarSign,
  User,
  Users,
} from "lucide-react";
import {
  useAppStore,
  useSelectedProject,
  Project,
  Task,
} from "@/stores/app-store";
import { StatusBadge } from "@/components/shared/status-badge";
import { CircularProgress } from "@/components/shared/circular-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ProjectsPage() {
  const { projects, setSelectedProject, selectedProjectId } = useAppStore();
  const selectedProject = useSelectedProject();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTasksByStatus = (tasks: Task[], status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  if (!selectedProject) {
    return (
      <section className="flex-1 flex">
        {/* Left Sidebar - Project List */}
        <ProjectSidebar
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProject}
        />

        {/* Main Content - No Project Selected */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a project to view details</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 flex relative">
      {/* Left Sidebar - Project List */}
      <ProjectSidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProject}
      />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Project Header */}
        <ProjectHeader project={selectedProject} />

        {/* Task Board */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-3 gap-4 h-full">
            {/* To Do Column */}
            <TaskColumn
              title="To Do"
              count={getTasksByStatus(selectedProject.tasks, "To Do").length}
              tasks={getTasksByStatus(selectedProject.tasks, "To Do")}
              getPriorityColor={getPriorityColor}
            />

            {/* In-Progress Column */}
            <TaskColumn
              title="In-Progress"
              count={
                getTasksByStatus(selectedProject.tasks, "In-Progress").length
              }
              tasks={getTasksByStatus(selectedProject.tasks, "In-Progress")}
              getPriorityColor={getPriorityColor}
            />

            {/* Completed Column */}
            <TaskColumn
              title="Completed"
              count={
                getTasksByStatus(selectedProject.tasks, "Completed").length
              }
              tasks={getTasksByStatus(selectedProject.tasks, "Completed")}
              getPriorityColor={getPriorityColor}
            />
          </div>
        </div>
      </div>
      {/* Right Sidebar */}
      <RightSidebar onShowBottomSheet={() => setShowBottomSheet(true)} />{" "}
      {/* Bottom Sheet */}
      {showBottomSheet && (
        <BottomSheet onClose={() => setShowBottomSheet(false)} />
      )}
    </section>
  );
}

// Project Sidebar Component
function ProjectSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
}: {
  projects: Project[];
  selectedProjectId: number | null;
  onSelectProject: (id: number | null) => void;
}) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="size-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex text-sm">
          <button className="px-3 py-1 text-red-600 border-b-2 border-red-600">
            Active
          </button>
          <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
            On-hold
          </button>
          <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
            Completed
          </button>
        </div>

        {/* Search and New Project */}
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <Input type="text" placeholder="Search" className="pl-10" />
          </div>
          <Button className="w-full bg-red-700 hover:bg-red-800">
            New Project
          </Button>
        </div>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className={`w-full p-4 text-left border-b border-gray-100 hover:bg-white transition-colors ${
              selectedProjectId === project.id
                ? "bg-white border-l-4 border-l-red-600"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium text-gray-900 text-sm">
                {project.name}
              </span>
              <StatusBadge status={project.status} size="sm" />
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              {project.tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>
                    {task.title.length > 30
                      ? task.title.substring(0, 30) + "..."
                      : task.title}
                  </span>
                  <StatusBadge status={task.status} size="sm" />
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Project Header Component
function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="size-4 text-gray-500" />
              <span className="text-gray-600">
                Deadline: {project.deadline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="size-4 text-gray-500" />
            <span className="text-gray-600">Budget: {project.budget}</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <User className="size-4 text-gray-500" />
            <span className="text-gray-600">
              Contractor: {project.contractor}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <CircularProgress
          value={project.budgetConsumed}
          label="Budget Consumed"
          size="md"
        />

        <CircularProgress value={project.progress} label="Progress" size="md" />

        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"
            ></div>
          ))}
          <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
            <Plus className="size-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Task Column Component
function TaskColumn({
  title,
  count,
  tasks,
  getPriorityColor,
}: {
  title: string;
  count: number;
  tasks: Task[];
  getPriorityColor: (priority: string) => string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              title === "To Do"
                ? "bg-blue-500"
                : title === "In-Progress"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          ></div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        </div>
        <Plus className="size-4 text-gray-400" />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>
    </div>
  );
}

// Task Card Component
function TaskCard({
  task,
  getPriorityColor,
}: {
  task: Task;
  getPriorityColor: (priority: string) => string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <MoreHorizontal className="size-4 text-gray-400" />
      </div>

      <h4 className="font-medium text-gray-900 mb-2 text-sm">{task.title}</h4>
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Users className="size-3" />
          <span>Assigned to: {task.assignedTo}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="size-3" />
          <span>Deadline: {task.deadline}</span>
        </div>
        {task.linkedDocs && task.linkedDocs.length > 0 && (
          <div className="flex items-center gap-1">
            <FileText className="size-3" />
            <span>Linked Docs: {task.linkedDocs.join(", ")}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex -space-x-1">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gray-300 rounded-full border border-white"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Right Sidebar Component
function RightSidebar({
  onShowBottomSheet,
}: {
  onShowBottomSheet: () => void;
}) {
  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Linked Dockets</h3>
          <button
            onClick={onShowBottomSheet}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <FileText className="size-4" />
            <span>renovation-vendors</span>
          </button>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Edit Project</h3>
            <Edit className="size-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Bottom Sheet Component
function BottomSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Project Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600">
            Project details and additional information
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
