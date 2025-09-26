"use client";

import React, { useState } from "react";
import { Plus, Download, FileText } from "lucide-react";
import { useDocketStore, type DocketProject } from "@/stores";
import { StatusBadge } from "@/components/shared/status-badge";
import { CircularProgress } from "@/components/shared/circular-progress";
import { InvoiceTable } from "@/components/shared/data-table";
import { CustomTabs } from "@/components/shared/custom-tabs";
import { Button } from "@/components/ui/button";
import DocketTab from "@/components/layout/docket-tab";

function DocketsPage() {
  const { dockets, selectedDocketId } = useDocketStore();
  const [selectedProjectId] = useState<number>(1);
  const [activeInvoiceTab, setActiveInvoiceTab] = useState<string>("Invoices");

  // Set initial docket selection if none selected
  const currentSelectedDocketId = selectedDocketId || 1;

  const selectedDocket = dockets.find((d) => d.id === currentSelectedDocketId);
  const selectedProject = selectedDocket?.projects.find(
    (p) => p.id === selectedProjectId
  );

  if (!selectedDocket || !selectedProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <DocketTab />

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
