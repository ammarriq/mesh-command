"use client";

import React, { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Edit,
  FileText,
  Calendar,
  Users,
} from "lucide-react";
import { Project, Task, useSelectedProject } from "@/stores";
import { ProjectHeader } from "@/components/shared/project-header";
import { InfoItem } from "@/components/shared/info-item";
import ProjectTab from "@/components/layout/project-tab";

function ProjectsPage() {
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
        <ProjectTab />

        {/* Main Content - No Project Selected */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a project to view details</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr]">
      {/* Left Sidebar - Project List */}
      <ProjectTab />
      <div className="flex-1 flex flex-col bg-white">
        <ProjectHeader project={selectedProject} />

        <section className="grid grid-cols-3 gap-2 h-full ">
          <TaskColumn
            title="To Do"
            count={getTasksByStatus(selectedProject, "To Do").length}
            tasks={getTasksByStatus(selectedProject, "To Do")}
            getPriorityColor={getPriorityColor}
          />

          <TaskColumn
            title="In-Progress"
            count={getTasksByStatus(selectedProject, "In-Progress").length}
            tasks={getTasksByStatus(selectedProject, "In-Progress")}
            getPriorityColor={getPriorityColor}
          />

          <TaskColumn
            title="Completed"
            count={getTasksByStatus(selectedProject, "Completed").length}
            tasks={getTasksByStatus(selectedProject, "Completed")}
            getPriorityColor={getPriorityColor}
          />
        </section>
      </div>
      <RightSidebar onShowBottomSheet={() => setShowBottomSheet(true)} />
      {showBottomSheet && (
        <BottomSheet onClose={() => setShowBottomSheet(false)} />
      )}
    </section>
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
  const getBorderColor = () => {
    switch (title) {
      case "To Do":
        return "#5030E5";
      case "In-Progress":
        return "#FFA500";
      case "Completed":
        return "#68B266";
      default:
        return "#E5E7EB";
    }
  };

  return (
    <section className="flex flex-col bg-light-bg">
      <header
        className="flex items-center justify-between px-2 py-4 border-b-2"
        style={{ borderBottomColor: getBorderColor() }}
      >
        <div className="flex items-center gap-2 justify-between w-full">
          <hgroup className="flex items-center gap-2">
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
            <span className="bg-Bg-Dark text-gray-600 text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          </hgroup>

          {title === "To Do" && <Plus className="ml-auto size-4 " />}
        </div>
      </header>

      <div className="space-y-3 flex-1 overflow-y-auto px-2 py-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>
    </section>
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

      <div className="space-y-2">
        <InfoItem icon={Users} label="Assigned to" value={task.assignedTo} />
        <InfoItem icon={Calendar} label="Deadline" value={task.deadline} />
        {task.linkedDocs && task.linkedDocs.length > 0 && (
          <InfoItem
            icon={FileText}
            label="Linked Docs"
            value={task.linkedDocs.join(", ")}
          />
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
