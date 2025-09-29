"use client";

import { Pie, PieChart, Cell, LabelList } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartPieDonutData = [
  { color: "#CB4A4A", label: "Finance", value: 275 },
  { color: "#5F0101", label: "Facilities", value: 200 },
  { color: "#F25555", label: "Human Resources", value: 187 },
  { color: "#FFA4A4", label: "Labour", value: 173 },
  { color: "#F0F1F2", label: "Other", value: 90 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartPieDonut() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const entry = payload[0].payload;
              return (
                <div className="p-2 rounded bg-white shadow text-xs">
                  <span className="font-semibold">{entry.label}</span>
                </div>
              );
            }
            return null;
          }}
        />
        <Pie
          data={chartPieDonutData}
          dataKey="value"
          nameKey="label"
          innerRadius={60}
        >
          {chartPieDonutData.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} />
          ))}
          <LabelList dataKey="label" position="center" />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
