"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

// Monthly data for January 2024 to December 2024
const chartData: {
  date: string;
  running: number;
  swimming: number;
  cycling: number;
}[] = [
  { date: "2024-01-01", running: 410, swimming: 320, cycling: 180 },
  { date: "2024-02-01", running: 390, swimming: 410, cycling: 220 },
  { date: "2024-03-01", running: 470, swimming: 250, cycling: 200 },
  { date: "2024-04-01", running: 520, swimming: 300, cycling: 210 },
  { date: "2024-05-01", running: 430, swimming: 370, cycling: 170 },
  { date: "2024-06-01", running: 480, swimming: 420, cycling: 230 },
  { date: "2024-07-01", running: 510, swimming: 390, cycling: 190 },
  { date: "2024-08-01", running: 450, swimming: 340, cycling: 210 },
  { date: "2024-09-01", running: 490, swimming: 380, cycling: 220 },
  { date: "2024-10-01", running: 530, swimming: 410, cycling: 240 },
  { date: "2024-11-01", running: 470, swimming: 360, cycling: 200 },
  { date: "2024-12-01", running: 520, swimming: 400, cycling: 210 },
];

const chartConfig = {
  running: {
    label: "Running",
    color: "var(--primary-light)",
  },
  swimming: {
    label: "Swimming",
    color: "var(--primary)",
  },
  cycling: {
    label: "Cycling",
    color: "var(--Bg-Dark)",
  },
} satisfies ChartConfig;

export function ChartTooltipAdvanced() {
  return (
    <ChartContainer config={chartConfig} className="h-[240px]">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          ticks={chartData.map((item) => item.date)}
          interval={0}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", { month: "short" });
          }}
        />
        <Bar
          dataKey="running"
          stackId="a"
          fill="var(--color-running)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="swimming"
          stackId="a"
          fill="var(--color-swimming)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="cycling"
          stackId="a"
          fill="var(--color-cycling)"
          radius={[4, 4, 0, 0]}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              className="w-[180px]"
              formatter={(value, name, item, index) => (
                <>
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                    style={
                      {
                        "--color-bg": `var(--color-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                    {value}
                    <span className="text-muted-foreground font-normal">
                      kcal
                    </span>
                  </div>
                  {/* Add this after the last item */}
                  {index === 2 && (
                    <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                      Total
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                        {item.payload.running +
                          item.payload.swimming +
                          item.payload.cycling}
                        <span className="text-muted-foreground font-normal">
                          kcal
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            />
          }
          cursor={false}
          defaultIndex={2}
        />
      </BarChart>
    </ChartContainer>
  );
}
