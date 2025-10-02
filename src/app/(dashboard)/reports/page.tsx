'use client';

import { ProjectHeader } from '@/components/layout/project-header';
import ProjectSelectorTab from '@/components/layout/project-tab';
import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive';
import { ChartPieDonut } from '@/components/ui/chart-pie-donut';
import { ChartTooltipAdvanced } from '@/components/ui/chart-tooltip-advanced';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LossIcon from '@/icons/loss';
import ProfitIcon from '@/icons/profit';
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
    <div className="bg-white flex-1 py-4  flex">
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
    <div className="flex-1">
      <ProjectHeader project={project} isDocketPage />

      <div className="flex gap-5 flex-col ">
        <h2 className="mt-6 mb-2 text-lg font-semibold px-4">Overview</h2>
        <Tabs defaultValue="badget">
          <TabsList className="grid grid-cols-4 w-full gap-4 px-4 h-fit">
            {reportTabs.map((tab) => (
              <CustomReportsTabTrigger
                key={tab.id}
                tabVal={tab.id}
                title={tab.title}
                value={tab.value}
                isLoss={tab.title === 'Burn Rate'}
                isProfit={tab.title === 'Task Completion'}
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
        <div className="flex gap-8">
          <div className="flex-1">
            <ChartTooltipAdvanced />
          </div>
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
  isLoss?: boolean;
  isProfit?: boolean;
}

function CustomReportsTabTrigger({
  tabVal,
  title,
  value,
  isLoss,
  isProfit,
}: CustomReportsTabTriggerProps) {
  console.log(isLoss ? 'text-[#D92D20]' : 'text-text-secondary ');
  return (
    <TabsTrigger
      className="bg-transparent border-b-4 data-[state=active]:border-b-primary border-b-transparent flex items-start justify-start h-full pb-6 px-0"
      value={tabVal}
    >
      <div className="flex flex-col gap-1 items-start justify-between h-full">
        <h4
          className={`${isLoss ? 'text-[#D92D20]' : isProfit ? 'text-primary' : 'text-text-secondary '} text-sm font-medium`}
        >
          {title}
        </h4>
        <p className="flex items-center gap-2">
          <span className="text-text-primary text-3xl font-semibold ">{value}</span>
          {isLoss && (
            <span className="text-[#D92D20] border border-[#D92d20] rounded-full py-0.5 px-2.5 flex items-center gap-1">
              {' '}
              <LossIcon />
              0.2%
            </span>
          )}
          {isProfit && (
            <span className="text-[#079455] border border-[#079455] rounded-full py-0.5 px-2.5 flex items-center gap-1">
              {' '}
              <ProfitIcon />
              12%
            </span>
          )}
        </p>
      </div>
    </TabsTrigger>
  );
}
