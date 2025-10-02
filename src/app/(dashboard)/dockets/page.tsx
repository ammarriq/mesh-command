'use client';

import { ProjectHeader } from '@/components/layout/project-header';
import ProjectSelectorTab from '@/components/layout/project-tab';
import { InvoiceTable, InvoiceTableRow } from '@/components/shared/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DownloadCloudIcon } from '@/icons/download-cloud';
import { useSelectedProject } from '@/store';
import type { Project } from '@/store/types';

import { useState } from 'react';

export default function DocketsPage() {
  const selectedProject = useSelectedProject();
  const [activeInvoiceTab, setActiveInvoiceTab] = useState<string>('Invoices');

  if (!selectedProject) {
    return <EmptyState message="No project selected." />;
  }

  const projectDockets = selectedProject.dockets || [];

  if (projectDockets.length === 0) {
    return <EmptyState message="No dockets available for this project." />;
  }

  const invoices = getProjectInvoices(projectDockets);

  return (
    <div className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr]">
      <ProjectSelectorTab showCreateButton={false} />
      <MainContent
        selectedProject={selectedProject}
        activeInvoiceTab={activeInvoiceTab}
        setActiveInvoiceTab={setActiveInvoiceTab}
        invoices={invoices}
      />
    </div>
  );
}

const getProjectInvoices = (projectDockets: Project['dockets']) => {
  const firstDocket = projectDockets?.[0];
  return firstDocket?.projects?.[0]?.invoices || [];
};

const getBillingTabsConfig = (invoices: InvoiceTableRow[]) => [
  {
    value: 'Invoices',
    label: 'Invoices',
    content: <InvoiceTable invoices={invoices} />,
  },
  {
    value: 'Property',
    label: 'Property',
    content: <PlaceholderContent title="Property" />,
  },
  {
    value: 'Capital Projects',
    label: 'Capital Projects',
    content: <PlaceholderContent title="Capital Projects" />,
  },
  {
    value: 'Legal Cases',
    label: 'Legal Cases',
    content: <PlaceholderContent title="Legal Cases" />,
  },
  {
    value: 'Plan',
    label: 'Plan',
    content: <PlaceholderContent title="Plan" />,
  },
  {
    value: 'Media',
    label: 'Media',
    content: <PlaceholderContent title="Media" />,
  },
];

interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  return <div className="flex h-screen items-center justify-center">{message}</div>;
}

interface PlaceholderContentProps {
  title: string;
}

function PlaceholderContent({ title }: PlaceholderContentProps) {
  return (
    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
      <p className="text-gray-500">{title} content coming soon...</p>
    </div>
  );
}

interface MainContentProps {
  selectedProject: Project;
  activeInvoiceTab: string;
  setActiveInvoiceTab: (tab: string) => void;
  invoices: InvoiceTableRow[];
}

function MainContent({
  selectedProject,
  activeInvoiceTab,
  setActiveInvoiceTab,
  invoices,
}: MainContentProps) {
  const billingTabsConfig = getBillingTabsConfig(invoices);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ProjectHeader project={selectedProject} isDocketPage />
      <BillingSection
        activeInvoiceTab={activeInvoiceTab}
        setActiveInvoiceTab={setActiveInvoiceTab}
        billingTabsConfig={billingTabsConfig}
      />
    </div>
  );
}

interface BillingSectionProps {
  activeInvoiceTab: string;
  setActiveInvoiceTab: (tab: string) => void;
  billingTabsConfig: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
  }>;
}

function BillingSection({
  activeInvoiceTab,
  setActiveInvoiceTab,
  billingTabsConfig,
}: BillingSectionProps) {
  return (
    <div className="flex-1 p-6 overflow-hidden bg-white h-full flex flex-col mt-4 gap-4">
      <hgroup className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing and invoicing</h2>
        <button className="border border-primary text-primary flex justify-center rounded-xl py-2.5 px-4 items-center gap-2">
          <DownloadCloudIcon /> Download All
        </button>
      </hgroup>
      <CustomTabs
        value={activeInvoiceTab}
        onValueChange={setActiveInvoiceTab}
        items={billingTabsConfig}
      />
    </div>
  );
}

interface TabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface CustomTabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  variant?: 'default' | 'underline';
}

export function CustomTabs({ items, defaultValue, value, onValueChange }: CustomTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} value={value} onValueChange={onValueChange} className={''}>
      <div className="bg-gray-50 border w-full border-gray-200 rounded-sm">
        <TabsList className=" flex gap-2 bg-transparent p-1">
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="bg-transparent rounded-lg w-fit whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-text-primary text-text-secondary  px-3 py-2 data-[state=active]:shadow-xs "
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} className="mt-3">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
