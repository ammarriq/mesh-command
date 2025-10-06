import React from "react"

import { cn } from "@/lib/utils"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string
}

function AuthButton({ name, className, type = "submit", ...props }: Props) {
    return (
        <button
            type={type}
            className={cn(
                "bg-primary flex h-12 w-full max-w-[360px] items-center justify-center rounded-2xl text-white",
                className,
            )}
            {...props}
        >
            {name}
        </button>
    )
}

export default AuthButton
