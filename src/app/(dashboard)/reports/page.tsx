"use client";

import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/shared/circular-progress";
import { StatusBadge } from "@/components/shared/status-badge";
import { useProjectStore } from "@/stores";
import ReportTab from "@/components/layout/report-tab";

// Chart component (we'll create a simple one for now)
function LineChart() {
  return (
    <div className="h-64 bg-white rounded-lg border p-4">
      <div className="text-sm text-gray-600 mb-4">Performance over time</div>
      <svg viewBox="0 0 800 200" className="w-full h-full">
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width="80"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="800" height="200" fill="url(#grid)" />

        {/* Sample line chart data */}
        <polyline
          points="50,150 130,140 210,160 290,130 370,120 450,140 530,110 610,130 690,100 770,120"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2"
        />
        <polyline
          points="50,170 130,160 210,180 290,150 370,140 450,160 530,130 610,150 690,120 770,140"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="2"
        />

        {/* X-axis labels */}
        <text x="50" y="195" className="fill-gray-500 text-xs">
          Jan
        </text>
        <text x="210" y="195" className="fill-gray-500 text-xs">
          Mar
        </text>
        <text x="370" y="195" className="fill-gray-500 text-xs">
          May
        </text>
        <text x="530" y="195" className="fill-gray-500 text-xs">
          Jul
        </text>
        <text x="690" y="195" className="fill-gray-500 text-xs">
          Sep
        </text>
      </svg>
    </div>
  );
}

function BarChart() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = [70, 85, 65, 80, 75, 90, 95, 88, 92, 85, 78, 82];

  return (
    <div className="h-64 bg-white rounded-lg border p-4">
      <div className="text-sm text-gray-600 mb-4">
        Departmental Budget Usage
      </div>
      <div className="flex items-end justify-between h-48 px-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="bg-red-600 rounded-t w-6"
              style={{ height: `${(value / 100) * 150}px` }}
            />
            <span className="text-xs text-gray-500 transform rotate-0">
              {months[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart() {
  const data = [
    { label: "Finance", value: 25, color: "#dc2626" },
    { label: "Facilities", value: 20, color: "#b91c1c" },
    { label: "Human Resources", value: 15, color: "#991b1b" },
    { label: "Labour", value: 30, color: "#7f1d1d" },
    { label: "Other", value: 10, color: "#fca5a5" },
  ];

  return (
    <div className="h-64 bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between h-full">
        <div className="w-32 h-32">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#dc2626"
              strokeWidth="20"
              strokeDasharray="75 25"
            />
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>
        <div className="flex-1 ml-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const { categories, selectedProjectId } = useProjectStore();

  // Get all projects from all categories
  const allProjects = categories.flatMap((category) => category.projects);

  const selectedProject =
    allProjects.find((p) => p.id === selectedProjectId) || allProjects[0];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <ReportTab />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Project Header */}
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedProject?.title}
                </h1>
                <StatusBadge
                  status={selectedProject?.status || "In-Progress"}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Overview
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {selectedProject?.deadline}</span>
                <span className="mx-2">•</span>
                <Users className="w-4 h-4" />
                <span>Budget: {selectedProject?.budget}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Budget</div>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedProject?.budget}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Available</div>
                <div className="text-2xl font-bold text-gray-900">$10.2k</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Burn rate</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-gray-900">46.2%</div>
                  <Badge variant="outline" className="text-xs">
                    -0.2%
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  Task Completion
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-gray-900">46.2%</div>
                  <Badge variant="outline" className="text-xs">
                    +12%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Progress Circles */}
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <CircularProgress value={40} size="lg" strokeColor="#dc2626" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Budget Consumed
                  </div>
                  <div className="text-xs text-gray-500">40%</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CircularProgress value={40} size="lg" strokeColor="#dc2626" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Progress
                  </div>
                  <div className="text-xs text-gray-500">40%</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CircularProgress value={40} size="lg" strokeColor="#dc2626" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Filing Capacity
                  </div>
                  <div className="text-xs text-gray-500">40%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Line Chart */}
            <LineChart />

            {/* Right Side Charts */}
            <div className="space-y-8">
              <BarChart />
              <DonutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
