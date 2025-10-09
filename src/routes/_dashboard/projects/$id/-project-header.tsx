import type { Project } from "@/store"

import { Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import DollarSquareIcon from "@/icons/dollar-square"
import MessageIcon from "@/icons/message"
import ThreeDotsIcon from "@/icons/three-dots"
import TimerIcon from "@/icons/timer"
import TwoUsersIcon from "@/icons/two-users"
import { cn } from "@/lib/utils"

interface Props {
    project: Project
}

export function ProjectHeader({ project }: Props) {
    const budgetConsumed = 40
    const progress = 59

    return (
        <header className="bg-white pt-2 pb-6">
            {/* First row: title, info, progress, avatar group */}
            <section className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
                <div className="flex flex-col gap-1">
                    <hgroup className="flex items-center gap-4">
                        <h1 className="text-text-primary truncate text-2xl font-medium whitespace-nowrap 2xl:max-w-none">
                            {project.title}
                        </h1>
                    </hgroup>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap">
                            <TwoUsersIcon
                                fill="var(--primary)"
                                stroke="var(--primary)"
                                className="size-5"
                            />
                            <span className="text-primary">Contractor:</span>
                            <p>{project.contractor}</p>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap">
                            <TimerIcon
                                fill="var(--primary)"
                                stroke="var(--primary)"
                                className="size-5"
                            />
                            <span className="text-primary">Deadline:</span>
                            <p>{project.deadline}</p>
                        </div>

                        {project.budget ? (
                            <div className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap">
                                <DollarSquareIcon
                                    fill="var(--primary)"
                                    stroke="var(--primary)"
                                    className="size-5"
                                />
                                <span className="text-primary">Budget:</span>
                                <p>{project.budget}</p>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Progress indicators for 2xl and above, placed before avatar group */}
                <div className="ml-auto hidden items-center gap-6 2xl:flex">
                    <HalfCircularProgressBar
                        value={budgetConsumed}
                        label="Budget Consumed"
                    />

                    <HalfCircularProgressBar
                        value={progress}
                        label="Progress"
                    />
                </div>

                <div className="flex items-center gap-1">
                    {project.users?.map((user, index) => (
                        <Avatar
                            className={cn(
                                "size-10 rounded-none border-2 border-white",
                                index !== 0 ? "-ml-4" : "",
                            )}
                        >
                            <AvatarImage
                                className="object-cover object-top"
                                src={user.image}
                            />

                            <AvatarFallback className="size-10 rounded-none border-2 border-white text-sm">
                                {user.name
                                    .split(" ")
                                    .map((o) => o[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                    ))}

                    <Button
                        size="icon"
                        className="z-10 -ml-4 size-10 rounded-none border-2 border-white text-white"
                    >
                        <Plus />
                    </Button>

                    <div className="ml-3 flex gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-Bg-Dark bg-light-bg size-10 rounded-xs border"
                        >
                            <MessageIcon />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="border-Bg-Dark bg-light-bg size-10 rounded-xs border"
                        >
                            <ThreeDotsIcon />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Second row: shadcn progress bars, only visible below 2xl, hidden above */}
            <section className="mt-4 flex w-full flex-col gap-3 2xl:hidden">
                <div>
                    <div className="text-text-secondary mb-1 flex items-center gap-2 text-xs">
                        <Progress value={budgetConsumed} className="max-w-80" />
                        <span>{budgetConsumed}% Budget Consumed</span>
                    </div>
                </div>

                <div>
                    <div className="text-text-secondary mb-1 flex items-center gap-2 text-xs">
                        <Progress value={progress} className="max-w-80" />
                        <span>{progress}% Progress</span>
                    </div>
                </div>
            </section>
        </header>
    )
}

function HalfCircularProgressBar({
    value,
    label,
    color = "#5f0101",
}: {
    value: number
    label: string
    color?: string
}) {
    // Calculate the stroke dasharray for half circle
    // Circumference of half circle (radius = 40, so half circumference = π * r)
    const radius = 40
    const circumference = Math.PI * radius

    return (
        <div className="flex flex-col items-center">
            <div className="relative h-12 w-16">
                <svg
                    className="h-full w-full"
                    viewBox="0 0 100 50"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Background arc */}
                    <path
                        d="M 10 45 A 40 40 0 0 1 90 45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    {/* Progress arc */}
                    <path
                        d="M 10 45 A 40 40 0 0 1 90 45"
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
                        className="transition-all duration-500 ease-in-out"
                    />
                </svg>

                <p className="absolute inset-0 flex items-end justify-center pb-2 text-sm font-semibold">
                    {value}%
                </p>
            </div>

            <p className="-mt-1 pb-2 text-center text-[11px] font-medium">
                {label}
            </p>
        </div>
    )
}
