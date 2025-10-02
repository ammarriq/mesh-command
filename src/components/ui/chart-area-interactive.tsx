'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import * as React from 'react';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

export const description = 'An interactive area chart';

// Weekly data for July 2024 to June 2025
interface ChartDataItem {
  date: string;
  desktop: number;
  mobile: number;
}

const chartData: ChartDataItem[] = [];
const months = [
  '2023-12',
  '2024-01',
  '2024-02',
  '2024-03',
  '2024-04',
  '2024-05',
  '2024-06',
  '2024-07',
  '2024-08',
  '2024-09',
  '2024-10',
  '2024-11',
  '2024-12',
];
for (const month of months) {
  for (let part = 1; part <= 8; part++) {
    // Divide month into 8 equal parts (days: 1, 5, 9, 13, 17, 21, 25, 29)
    const day = 1 + (part - 1) * 4;
    chartData.push({
      date: `${month}-${String(day).padStart(2, '0')}`,
      desktop: Math.floor(200 + Math.random() * 250),
      mobile: Math.floor(100 + Math.random() * 150),
    });
  }
}
// Ensure the first week of December 2023 is present for the x-axis tick
if (!chartData.find((item) => item.date === '2023-12-01')) {
  chartData.push({
    date: '2023-12-01',
    desktop: Math.floor(200 + Math.random() * 250),
    mobile: Math.floor(100 + Math.random() * 150),
  });
}
// Ensure the first week of January is present for the x-axis tick
if (!chartData.find((item) => item.date === '2024-01-01')) {
  chartData.push({
    date: '2024-01-01',
    desktop: Math.floor(200 + Math.random() * 210),
    mobile: Math.floor(100 + Math.random() * 100),
  });
}

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: '#D92D20',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  // Always show the latest 12 months
  const monthsSet = Array.from(new Set(chartData.map((item) => item.date.substring(0, 7))));
  const last12Months = monthsSet.slice(-12);
  const filteredData = chartData.filter((item) => last12Months.includes(item.date.substring(0, 7)));

  const monthTicks = last12Months
    .map((month) => {
      const monthData = filteredData.filter((item) => item.date.startsWith(month));
      if (monthData.length > 0) {
        const centerIdx = Math.floor(monthData.length / 2);
        return monthData[centerIdx].date;
      }
      return undefined;
    })
    .filter((d): d is string => typeof d === 'string');

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full ">
      <AreaChart data={filteredData}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="98%" stopColor="#D92D20" stopOpacity={0.1} />
            {/* <stop offset="95%" stopColor="#D92D20" stopOpacity={0.1} /> */}
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="98%" stopColor="#D92D20" stopOpacity={0.1} />
            {/* <stop offset="95%" stopColor="#D92D20" stopOpacity={0.1} /> */}
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={20}
          interval={0}
          domain={[monthTicks[0], monthTicks[monthTicks.length - 1]]}
          ticks={monthTicks}
          tickFormatter={(value) => {
            if (!value) return '';
            const [year, month] = value.split('-');
            const date = new Date(Number(year), Number(month) - 1, 1);
            return date.toLocaleDateString('en-US', { month: 'short' });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
              indicator="dot"
            />
          }
        />
        <Area dataKey="mobile" type="linear" fill="url(#fillMobile)" stroke="var(--color-mobile)" />
        <Area
          dataKey="desktop"
          type="linear"
          fill="url(#fillDesktop)"
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
