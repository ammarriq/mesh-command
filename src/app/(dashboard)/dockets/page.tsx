"use client";

import React, { useState } from "react";
import { Search, Plus, MoreHorizontal, Download, FileText } from "lucide-react";
import {
  useAppStore,
  type Docket,
  type DocketProject,
} from "@/stores/app-store";
import { StatusBadge } from "@/components/shared/status-badge";
import { CircularProgress } from "@/components/shared/circular-progress";
import { InvoiceTable } from "@/components/shared/data-table";
import { CustomTabs } from "@/components/shared/custom-tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function DocketsPage() {
  const { dockets, selectedDocketId, setSelectedDocket } = useAppStore();
  const [selectedProjectId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "Active" | "On-hold" | "Completed"
  >("Active");
  const [activeInvoiceTab, setActiveInvoiceTab] = useState<string>("Invoices");

  // Set initial docket selection if none selected
  const currentSelectedDocketId = selectedDocketId || 1;

  const selectedDocket = dockets.find((d) => d.id === currentSelectedDocketId);
  const selectedProject = selectedDocket?.projects.find(
    (p) => p.id === selectedProjectId
  );
  const filteredDockets = dockets.filter((d) => d.status === activeTab);

  if (!selectedDocket || !selectedProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Left Sidebar */}
      <DocketsSidebar
        dockets={filteredDockets}
        selectedDocketId={currentSelectedDocketId}
        onSelectDocket={setSelectedDocket}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Project Header */}
        <ProjectHeader project={selectedProject} />

        {/* Billing Section */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="bg-white h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Billing and invoicing
              </h2>

              {/* Invoice Tabs */}
              <CustomTabs
                variant="underline"
                value={activeInvoiceTab}
                onValueChange={setActiveInvoiceTab}
                items={[
                  {
                    value: "Invoices",
                    label: "Invoices",
                    content: (
                      <InvoiceTable invoices={selectedProject.invoices} />
                    ),
                  },
                  {
                    value: "Property",
                    label: "Property",
                    content: <div>Property content</div>,
                  },
                  {
                    value: "Capital Projects",
                    label: "Capital Projects",
                    content: <div>Capital Projects content</div>,
                  },
                  {
                    value: "Legal Cases",
                    label: "Legal Cases",
                    content: <div>Legal Cases content</div>,
                  },
                  {
                    value: "Plan",
                    label: "Plan",
                    content: <div>Plan content</div>,
                  },
                  {
                    value: "Media",
                    label: "Media",
                    content: <div>Media content</div>,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} // Dockets Sidebar Component
function DocketsSidebar({
  dockets,
  selectedDocketId,
  onSelectDocket,
  activeTab,
  onTabChange,
}: {
  dockets: Docket[];
  selectedDocketId: number;
  onSelectDocket: (id: number) => void;
  activeTab: "Active" | "On-hold" | "Completed";
  onTabChange: (tab: "Active" | "On-hold" | "Completed") => void;
}) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Dockets</h2>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="size-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex text-sm">
          {(["Active", "On-hold", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1 ${
                activeTab === tab
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <Input type="text" placeholder="Search" className="pl-10" />
          </div>
        </div>
      </div>

      {/* Dockets List */}
      <div className="flex-1 overflow-y-auto">
        {dockets.map((docket) => (
          <button
            key={docket.id}
            onClick={() => onSelectDocket(docket.id)}
            className={`w-full p-4 text-left border-b border-gray-100 hover:bg-white transition-colors ${
              selectedDocketId === docket.id
                ? "bg-white border-l-4 border-l-red-600"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium text-gray-900 text-sm">
                {docket.name}
              </span>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              {docket.projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between"
                >
                  <span>
                    {project.name.length > 30
                      ? project.name.substring(0, 30) + "..."
                      : project.name}
                  </span>
                  <StatusBadge status={project.status} size="sm" />
                </div>
              ))}
            </div>
          </button>
        ))}

        {/* No project available placeholder */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-medium text-gray-900 text-sm">
              Steward 3890 Poplar Dr.
            </span>
          </div>
          <div className="text-xs text-gray-500">No project available</div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-medium text-gray-900 text-sm">
              7529 E. Pecan St.
            </span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-medium text-gray-900 text-sm">
              775 Rolling Green Rd.
            </span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-medium text-gray-900 text-sm">
              3605 Parker Rd.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Project Header Component
function ProjectHeader({ project }: { project: DocketProject }) {
  return (
    <div className="border-b border-gray-200 p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            {project.name}
          </h1>
          <StatusBadge status="In-Progress" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="size-4 text-gray-500" />
            <span className="text-gray-600">
              Contractor: {project.contractor}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Deadline: {project.deadline}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Budget: {project.budget}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Progress Indicators */}
        <CircularProgress
          value={project.budgetConsumed}
          label="Budget Consumed"
          size="md"
        />

        <CircularProgress value={project.progress} label="Progress" size="md" />

        <CircularProgress
          value={project.filingCapacity}
          label="Filing Capacity"
          size="md"
        />

        {/* Team members */}
        <div className="flex -space-x-2 ml-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"
            ></div>
          ))}
          <div className="w-10 h-10 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
            <Plus className="size-5 text-white" />
          </div>
        </div>

        {/* Download all button */}
        <div className="ml-auto">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="size-4" />
            Download all
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DocketsPage;
