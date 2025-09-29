"use client";

import React, { useState } from "react";
import { useDocketStore } from "@/stores";
import type { Project } from "@/stores";
import { CustomTabs } from "@/components/shared/custom-tabs";
import { ProjectHeader } from "@/components/shared/project-header";
import { InvoiceTable } from "@/components/shared/data-table";
import ProjectSelectorTab from "@/components/layout/project-selector-tab";

function DocketsPage() {
  const { dockets, selectedDocketId } = useDocketStore();
  const [selectedProjectId] = useState<number>(1);
  const [activeInvoiceTab, setActiveInvoiceTab] = useState<string>("Invoices");

  // Handle empty dockets array
  if (!dockets || dockets.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        No dockets available.
      </div>
    );
  }

  // Set initial docket selection if none selected
  const currentSelectedDocketId = selectedDocketId || dockets[0]?.id;

  const selectedDocket = dockets.find((d) => d.id === currentSelectedDocketId);
  // Map DocketProject to Project type for ProjectHeader
  const rawProject = selectedDocket?.projects?.find(
    (p) => p.id === selectedProjectId
  );
  // Convert DocketProject to Project type
  const selectedProject = rawProject
    ? ({
        id: rawProject.id,
        title: rawProject.name || "Untitled Project",
        status:
          rawProject.status === "In-Progress"
            ? "active"
            : rawProject.status === "On-hold"
            ? "on-hold"
            : "completed",
        contractor: rawProject.contractor,
        deadline: rawProject.deadline,
        budget: rawProject.budget,
        warning: null,
        todo: [],
        inProgress: [],
        completed: [],
        // Add invoices for InvoiceTable usage (not part of Project type)
        invoices: rawProject.invoices || [],
      } as Project & { invoices: typeof rawProject.invoices }) // type assertion for extra property
    : undefined;

  if (!selectedDocket || !selectedProject) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr]">
      {/* Left Sidebar */}
      <ProjectSelectorTab showCreateButton={false} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Project Header */}
        <ProjectHeader
          project={selectedProject}
          showTeamMembers={true}
          showDownloadButton={true}
          onDownloadAll={() => console.log("Download all dockets")}
        />
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
                      <InvoiceTable invoices={selectedProject.invoices || []} />
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

export default DocketsPage;
