import type { ClassValue } from "clsx"

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: Array<ClassValue>) {
    return twMerge(clsx(inputs))
}

export const formatTime = (isoString: string): string => {
    return new Date(isoString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })
}
