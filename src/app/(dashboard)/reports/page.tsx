"use client";

import { ProjectHeader } from "@/components/shared/project-header";
import { useProjectStore } from "@/stores";

import { ChartPieDonut } from "@/components/ui/chart-pie-donut";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { ChartTooltipAdvanced } from "@/components/ui/chart-tooltip-advanced";
import ProjectSelectorTab from "@/components/layout/project-selector-tab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

const chartPieDonutData = [
  { color: "bg-[#CB4A4A]", label: "Finance" },
  { color: "bg-[#5F0101]", label: "Facilities" },
  { color: "bg-[#F25555]", label: "Human Resources" },
  { color: "bg-[#FFA4A4]", label: "Labour" },
  { color: "bg-Bg-Dark", label: "Other" },
];

export default function ReportsPage() {
  const { categories, selectedProjectId } = useProjectStore();
  const allProjects = categories.flatMap((category) => category.projects);
  const selectedProject =
    allProjects.find((p) => p.id === selectedProjectId) || allProjects[0];

  return (
    <div className="bg-white flex-1 py-4 grid grid-cols-[1fr_2fr]">
      <ProjectSelectorTab showCreateButton={true} />
      <div className="">
        <ProjectHeader
          project={selectedProject}
          showTeamMembers={true}
          showOnlyAvatarGroup={true}
          showDownloadButton={false}
        />

        <div className="flex gap-5 flex-col">
          <h2 className="mt-6 mb-2 text-2xl font-semibold">Overview</h2>
          <Tabs defaultValue="badget">
            <TabsList className="grid grid-cols-4 w-full gap-4 ">
              <CustomReportsTabTrigger
                tabVal="badget"
                title="Badget"
                value="$250k"
              />
              <CustomReportsTabTrigger
                tabVal="available"
                title="Available"
                value="$10.2k"
              />
              <CustomReportsTabTrigger
                tabVal="burn-rate"
                title="Burn Rate"
                value="46.2%"
              />
              <CustomReportsTabTrigger
                tabVal="task-completion"
                title="Task Completion"
                value="46.2%"
              />
            </TabsList>

            {/* Charts Section for each tab */}
            <TabsContent value="badget" className="">
              <div style={{ position: "relative" }}>
                <ChartAreaInteractive />
              </div>
              <hgroup>
                <h2 className="mt-6 mb-2 text-2xl font-semibold">
                  Departmental Budget Usage
                </h2>
                <div className="grid grid-cols-[1fr_auto] gap-8">
                  <ChartTooltipAdvanced />
                  <div className="flex ">
                    <ChartPieDonut />
                    <div>
                      {chartPieDonutData.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 mb-2"
                        >
                          <span
                            className={`size-3 rounded-full  ${item.color}`}
                          ></span>
                          <span className="text-sm text-foreground whitespace-nowrap">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </hgroup>
            </TabsContent>
            <TabsContent value="available" className="">
              <div style={{ position: "relative" }}>
                <ChartAreaInteractive />
              </div>
              <hgroup>
                <h2 className="mt-6 mb-2 text-2xl font-semibold">
                  Departmental Budget Usage
                </h2>
                <div className="grid grid-cols-[1fr_auto] gap-8">
                  <ChartTooltipAdvanced />
                  <div className="flex ">
                    <ChartPieDonut />
                    <div>
                      {chartPieDonutData.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 mb-2"
                        >
                          <span
                            className={`size-3 rounded-full  ${item.color}`}
                          ></span>
                          <span className="text-sm text-foreground whitespace-nowrap">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </hgroup>
            </TabsContent>
            <TabsContent value="burn-rate" className="">
              <div style={{ position: "relative" }}>
                <ChartAreaInteractive />
              </div>
              <hgroup>
                <h2 className="mt-6 mb-2 text-2xl font-semibold">
                  Departmental Budget Usage
                </h2>
                <div className="grid grid-cols-[1fr_auto] gap-8">
                  <ChartTooltipAdvanced />
                  <div className="flex ">
                    <ChartPieDonut />
                    <div>
                      {chartPieDonutData.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 mb-2"
                        >
                          <span
                            className={`size-3 rounded-full  ${item.color}`}
                          ></span>
                          <span className="text-sm text-foreground whitespace-nowrap">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </hgroup>
            </TabsContent>
            <TabsContent value="task-completion" className="">
              <div style={{ position: "relative" }}>
                <ChartAreaInteractive />
              </div>
              <hgroup>
                <h2 className="mt-6 mb-2 text-2xl font-semibold">
                  Departmental Budget Usage
                </h2>
                <div className="grid grid-cols-[1fr_auto] gap-8">
                  <ChartTooltipAdvanced />
                  <div className="flex ">
                    <ChartPieDonut />
                    <div>
                      {chartPieDonutData.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 mb-2"
                        >
                          <span
                            className={`size-3 rounded-full  ${item.color}`}
                          ></span>
                          <span className="text-sm text-foreground whitespace-nowrap">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </hgroup>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface CustomReportsTabTriggerI {
  value: string;
  title: string;
  tabVal: string;
}

function CustomReportsTabTrigger({
  tabVal,
  title,
  value,
}: CustomReportsTabTriggerI) {
  return (
    <TabsTrigger
      className="bg-transparent border-b-4 data-[state=active]:border-primary"
      value={tabVal}
    >
      <hgroup className="pb-6 flex flex-col items-start ">
        <h4 className="text-text-secondary text-sm font-medium">{title}</h4>
        <span className="text-text-primary text-3xl font-semibold">
          {value}
        </span>
      </hgroup>
    </TabsTrigger>
  );
}
