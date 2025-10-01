'use client';

import ProjectSelectorTab from '@/components/layout/project-selector-tab';
import { ProjectHeader } from '@/components/shared/project-header';
import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive';
import { ChartPieDonut } from '@/components/ui/chart-pie-donut';
import { ChartTooltipAdvanced } from '@/components/ui/chart-tooltip-advanced';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store';
import type { Project, ProjectCategory } from '@/store';

export default function ReportsPage() {
  const {
    project: { categories, selectedProjectId },
  } = useAppStore();
  const allProjects = categories.flatMap((category: ProjectCategory) => category.projects);
  const selectedProject =
    allProjects.find((p: Project) => p.id === selectedProjectId) || allProjects[0];

  const reportTabs = getReportTabsConfig();

  return (
    <div className="bg-white flex-1 py-4 grid grid-cols-[1fr_2fr]">
      <ProjectSelectorTab showCreateButton={true} />
      <MainContent project={selectedProject} reportTabs={reportTabs} />
    </div>
  );
}

const getReportTabsConfig = () => [
  { id: 'badget', title: 'Badget', value: '$250k' },
  { id: 'available', title: 'Available', value: '$10.2k' },
  { id: 'burn-rate', title: 'Burn Rate', value: '46.2%' },
  { id: 'task-completion', title: 'Task Completion', value: '46.2%' },
];

const chartPieDonutData = [
  { color: 'bg-[#CB4A4A]', label: 'Finance' },
  { color: 'bg-[#5F0101]', label: 'Facilities' },
  { color: 'bg-[#F25555]', label: 'Human Resources' },
  { color: 'bg-[#FFA4A4]', label: 'Labour' },
  { color: 'bg-Bg-Dark', label: 'Other' },
];

interface MainContentProps {
  project: Project;
  reportTabs: Array<{
    id: string;
    title: string;
    value: string;
  }>;
}

function MainContent({ project, reportTabs }: MainContentProps) {
  return (
    <div className="">
      <ProjectHeader
        project={project}
        showTeamMembers={true}
        showOnlyAvatarGroup={true}
        showDownloadButton={false}
      />

      <div className="flex gap-5 flex-col">
        <h2 className="mt-6 mb-2 text-2xl font-semibold">Overview</h2>
        <Tabs defaultValue="badget">
          <TabsList className="grid grid-cols-4 w-full gap-4">
            {reportTabs.map((tab) => (
              <CustomReportsTabTrigger
                key={tab.id}
                tabVal={tab.id}
                title={tab.title}
                value={tab.value}
              />
            ))}
          </TabsList>

          {reportTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="">
              <ChartSection />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function ChartSection() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <ChartAreaInteractive />
      </div>
      <hgroup>
        <h2 className="mt-6 mb-2 text-2xl font-semibold">Departmental Budget Usage</h2>
        <div className="grid grid-cols-[1fr_auto] gap-8">
          <ChartTooltipAdvanced />
          <div className="flex">
            <ChartPieDonut />
            <LegendList />
          </div>
        </div>
      </hgroup>
    </>
  );
}

function LegendList() {
  return (
    <div>
      {chartPieDonutData.map((item) => (
        <div key={item.label} className="flex items-center gap-2 mb-2">
          <span className={`size-3 rounded-full ${item.color}`}></span>
          <span className="text-sm text-foreground whitespace-nowrap">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

interface CustomReportsTabTriggerProps {
  value: string;
  title: string;
  tabVal: string;
}

function CustomReportsTabTrigger({ tabVal, title, value }: CustomReportsTabTriggerProps) {
  return (
    <TabsTrigger
      className="bg-transparent border-b-4 data-[state=active]:border-primary"
      value={tabVal}
    >
      <hgroup className="pb-6 flex flex-col items-start">
        <h4 className="text-text-secondary text-sm font-medium">{title}</h4>
        <span className="text-text-primary text-3xl font-semibold">{value}</span>
      </hgroup>
    </TabsTrigger>
  );
}
