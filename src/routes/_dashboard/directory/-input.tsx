"use client"

import React from "react"

import { Input as InputElement } from "@/components/ui/input"

interface Props
    extends Omit<React.ComponentProps<typeof InputElement>, "children"> {
    label: string
    icon?: React.ElementType
    name: string
    placeholder?: string
    required?: boolean
}

function Input({
    label,
    name,
    placeholder,
    icon: Icon,
    required = false,
    className,
    id,
    type = "text",
    ...inputProps
}: Props) {
    return (
        <div>
            <label htmlFor={label} className="block text-sm">
                {label}
            </label>

            <label className="bg-Bg-Dark flex items-center gap-1 rounded px-2 py-0.75">
                {Icon ? (
                    <Icon
                        className="text-text-secondary size-5 sm:size-6"
                        aria-hidden
                    />
                ) : null}

                <InputElement
                    id={id || name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={
                        "placeholder:text-foreground/50 flex-1 border-none bg-transparent px-2 py-0 text-sm shadow-none ring-0 outline-none" +
                        (className ?? "")
                    }
                    required={required}
                    {...inputProps}
                />
            </label>
        </div>
    )
}

export default Input
