"use client"

import React from "react"

import {
    Select as SelectElement,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props
    extends Omit<React.ComponentProps<typeof SelectElement>, "children"> {
    label: string
    icon?: React.ElementType
    placeholder?: string
}

function Select({ label, placeholder, icon: Icon }: Props) {
    return (
        <div>
            <p className="block text-sm">{label}</p>

            <SelectElement>
                <SelectTrigger className="bg-Bg-Dark flex !h-auto w-full items-center justify-start gap-2 rounded border-none px-2 py-2.5 shadow-none *:last:ml-auto">
                    {Icon ? (
                        <Icon
                            className="text-text-secondary size-5 sm:size-6"
                            aria-hidden
                        />
                    ) : null}

                    <SelectValue
                        placeholder={placeholder}
                        className="placeholder:text-foreground/50 flex-1 border-none bg-transparent p-0 text-left text-sm shadow-none ring-0 outline-none"
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="item1">Item 1</SelectItem>
                    <SelectItem value="item2">Item 2</SelectItem>
                    <SelectItem value="item3">Item 3</SelectItem>
                </SelectContent>
            </SelectElement>
        </div>
    )
}

export default Select
