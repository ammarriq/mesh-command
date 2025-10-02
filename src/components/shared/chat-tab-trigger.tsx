'use client';

import { cn } from '@/lib/utils';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { TabsTrigger } from '../ui/tabs';

interface CustomTabTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  value: string;
}

function CustomTabTrigger({ className, value, ...props }: CustomTabTriggerProps) {
  return (
    <TabsTrigger
      className={cn(
        'p-4 data-[state=active]:text-primary w-full border-b-2 border-b-Bg-Dark data-[state=active]:border-b-primary text-text-secondary text-sm font-semibold whitespace-nowrap',
        className,
      )}
      value={value}
      {...props}
    ></TabsTrigger>
  );
}

export { CustomTabTrigger };
