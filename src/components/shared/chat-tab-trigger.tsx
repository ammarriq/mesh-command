"use client"

import type * as TabsPrimitive from "@radix-ui/react-tabs"

import * as React from "react"

import { cn } from "@/lib/utils"

import { TabsTrigger } from "../ui/tabs"

interface CustomTabTriggerProps
    extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
    value: string
}

function CustomTabTrigger({
    className,
    value,
    ...props
}: CustomTabTriggerProps) {
    return (
        <TabsTrigger
            className={cn(
                "data-[state=active]:text-primary border-b-Bg-Dark data-[state=active]:border-b-primary text-text-secondary w-full border-b-2 p-4 text-sm font-semibold whitespace-nowrap",
                className,
            )}
            value={value}
            {...props}
        ></TabsTrigger>
    )
}

export { CustomTabTrigger }
