"use client"

import React from "react"

import EmailIcon from "../../icons/email"
import EyeSlashIcon from "../../icons/eye-slash"
import LockIcon from "../../icons/lock"
import { Input } from "../ui/input"

interface Props extends Omit<React.ComponentProps<typeof Input>, "children"> {
    label: string
    icon: "email" | "eye-slash" | "lock"
    name: string
    placeHolder?: string
    required?: boolean
    endAdornment?: React.ReactNode
}

function AuthInput({
    label,
    name,
    placeHolder,
    icon,
    required = false,
    className,
    id,
    type = "text",
    endAdornment,
    ...inputProps
}: Props) {
    // Select the icon component based on the icon prop
    let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> | null = null
    if (icon === "email") {
        IconComponent = EmailIcon
    } else if (icon === "eye-slash") {
        IconComponent = EyeSlashIcon
    } else {
        IconComponent = LockIcon
    }

    return (
        <label className="bg-Bg-Dark flex items-center gap-2 rounded-[12px] p-3 shadow-xs">
            <span className="sr-only">{label}</span>
            <IconComponent
                className="text-text-secondary size-5 sm:size-6"
                aria-hidden
            />

            <Input
                id={id || name}
                name={name}
                type={type}
                placeholder={placeHolder}
                className={
                    "flex-1 border-none bg-transparent p-0 text-base shadow-none ring-0 outline-none placeholder:text-base " +
                    (className ?? "")
                }
                required={required}
                {...inputProps}
            />
            {endAdornment}
        </label>
    )
}

export default AuthInput
