'use client';

import ProjectSelectorTab from '@/components/layout/project-selector-tab';
import { CustomTabs } from '@/components/shared/custom-tabs';
import { InvoiceTable } from '@/components/shared/data-table';
import { ProjectHeader } from '@/components/shared/project-header';
import { useSelectedProject } from '@/store';

import React, { useState } from 'react';

function DocketsPage() {
  const selectedProject = useSelectedProject();
  const [activeInvoiceTab, setActiveInvoiceTab] = useState<string>('Invoices');

  if (!selectedProject) {
    return <div className="flex h-screen items-center justify-center">No project selected.</div>;
  }

  // Use dockets from the selected project
  const projectDockets = selectedProject.dockets || [];
  // For demonstration, use the first docket's invoices if available
  const firstDocket = projectDockets[0];
  const invoices =
    firstDocket && firstDocket.projects && firstDocket.projects[0]?.invoices
      ? firstDocket.projects[0].invoices
      : [];
  if (projectDockets.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        No dockets available for this project.
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
        <ProjectHeader project={selectedProject} showTeamMembers={true} />
        {/* Billing Section */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="bg-white h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing and invoicing</h2>

              {/* Invoice Tabs */}
              <CustomTabs
                variant="underline"
                value={activeInvoiceTab}
                onValueChange={setActiveInvoiceTab}
                items={[
                  {
                    value: 'Invoices',
                    label: 'Invoices',
                    content: <InvoiceTable invoices={invoices} />,
                  },
                  {
                    value: 'Property',
                    label: 'Property',
                    content: <div>Property content</div>,
                  },
                  {
                    value: 'Capital Projects',
                    label: 'Capital Projects',
                    content: <div>Capital Projects content</div>,
                  },
                  {
                    value: 'Legal Cases',
                    label: 'Legal Cases',
                    content: <div>Legal Cases content</div>,
                  },
                  {
                    value: 'Plan',
                    label: 'Plan',
                    content: <div>Plan content</div>,
                  },
                  {
                    value: 'Media',
                    label: 'Media',
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
