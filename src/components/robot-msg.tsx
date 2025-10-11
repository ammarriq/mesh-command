import type { SelectedModel } from "@/types/model"

import { RobotMsgInfoBadge } from "@/components/robot-msg-info-badge"
import { Separator } from "@/components/ui/separator"
import DeepseekIcon from "@/icons/deep-seek"
import { OpenaiIcon } from "@/icons/open-ai"
import ProjectsIcon from "@/icons/project"
import TaskSquareIcon from "@/icons/task-square"
import TimerIcon from "@/icons/timer"
import { formatTime } from "@/lib/utils"

type ModelDisplay = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    color: string
    strokeColor: string
}

type Task = {
    title: string
    assignedTo: string
    due: string
}

interface RobotMsgProps {
    response: string
    time: string
    model: "Deepseek-R1" | "OpenAI 04"
}

const TASKS: Array<Task> = [
    {
        title: "Review current contract",
        assignedTo: "John Smith",
        due: "Mar 10",
    },
    {
        title: "Collect vendor performance data",
        assignedTo: "Facilities",
        due: "Mar 15",
    },
    {
        title: "Draft negotiation strategy",
        assignedTo: "John Smith",
        due: "Apr 1",
    },
]

const getModelDisplay = (model: SelectedModel): ModelDisplay => {
    if (model === "OpenAI 04") {
        return {
            icon: OpenaiIcon,
            color: "text-text-primary",
            strokeColor: "fill-text-primary",
        }
    }
    return {
        icon: DeepseekIcon,
        color: "text-[#4D6BFE]",
        strokeColor: "stroke-[#4D6BFE]",
    }
}

function RobotMsgBadge({
    title,
    className = "",
}: {
    title: string
    className?: string
}) {
    return (
        <span
            className={`bg-primary-light text-primary inline-block rounded-sm px-2 py-[5px] text-xs font-semibold ${className}`}
        >
            {title}
        </span>
    )
}

function RobotMsgSummary() {
    return (
        <div className="">
            <RobotMsgBadge title="Summary" />
            <h3 className="text-text-primary mt-2 text-xl font-medium">
                HVAC service agreement for HQ
            </h3>
            <div className="text-text-secondary mt-1 flex flex-wrap items-center gap-4 text-xs">
                <RobotMsgInfoBadge type="user" value="John Smith" />
                <RobotMsgInfoBadge type="time" value="December 20,2026" />
                <RobotMsgInfoBadge type="budget" value="$250k" />
            </div>
            <Separator className="bg-dark-bg mt-2" />
        </div>
    )
}

function RobotMsgDocket() {
    return (
        <div className="">
            <RobotMsgBadge title="Dockets" />
            <p className="text-text-primary mt-2">No file attached.</p>
            <Separator className="bg-dark-bg mt-2" />
        </div>
    )
}

function RobotMsgProject() {
    return (
        <div className="space-y-1">
            <RobotMsgBadge title="Projects" />
            <div className="flex items-center gap-2">
                <span className="text-text-primary inline-flex items-center gap-2 rounded-md border">
                    <ProjectsIcon className="size-5" />
                </span>
                <span className="text-text-primary text-sm font-semibold">
                    Facilities Project
                </span>
                <span className="text-text-secondary text-sm">
                    Related Project found
                </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-text-primary text-xs font-semibold">
                    Project Status:
                </span>
                <span
                    className={
                        "inline-block rounded-xs bg-[#FFDD98] px-2 py-1 text-xs font-semibold text-[#A17800]"
                    }
                >
                    In-Progress
                </span>

                <span className={"text-text-secondary inline-block text-sm"}>
                    {" "}
                    Parts in bound
                </span>
            </div>
            <Separator className="bg-dark-bg mt-2" />
        </div>
    )
}

function RobotMsgAssignedTo() {
    return (
        <div className="">
            <RobotMsgBadge title="Assigned To" />
            <p className="text-text-primary mt-2">
                Facilities Manager, Procurement Team
            </p>
            <Separator className="bg-dark-bg mt-2" />
        </div>
    )
}

function RobotMsgBroadcast({ showBtns = true }: { showBtns?: boolean }) {
    return (
        <div className="">
            Would you like me to broadcast this draft to the Facilities Project
            channel, or keep refining privately?
            {showBtns && (
                <div className="mt-3 flex items-center gap-2">
                    <button className="border-primary bg-primary flex w-40 items-center justify-center rounded-md border px-6 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                        Broadcast
                    </button>
                    <button className="text-primary border-primary flex w-40 items-center justify-center rounded-md border px-6 py-2.5 text-sm font-medium shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                        Keep Refining
                    </button>
                </div>
            )}
        </div>
    )
}

function RobotMsgTasks() {
    return (
        <div className="space-y-2">
            <RobotMsgBadge title="Tasks" />
            <div className="space-y-2">
                {TASKS.map((task, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <TaskSquareIcon className="size-6" />
                            <p className="text-text-primary text-sm font-semibold">
                                {task.title}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-text-primary text-sm">
                                Assign to:{" "}
                                <span className="text-text-secondary">
                                    {task.assignedTo}
                                </span>
                            </p>
                            <span className="text-primary flex items-center gap-1 text-sm font-medium">
                                <TimerIcon className="size-4" />
                                Due: {task.due}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <Separator className="bg-dark-bg mt-2" />
        </div>
    )
}

export function RobotMsg({ time, model }: RobotMsgProps) {
    const modelInfo = getModelDisplay(model)
    const IconComponent = modelInfo.icon

    return (
        <section className="flex max-w-2xl flex-col">
            <div className="text-text-secondary flex items-center justify-between">
                <p
                    className={`flex h-12 items-center gap-2 ${modelInfo.color}`}
                >
                    <IconComponent
                        className={`${modelInfo.strokeColor} h-auto w-6`}
                    />
                    <span className="font-medium">{model}</span>
                </p>
                <span className="text-xs">{formatTime(time)}</span>
            </div>

            <div className="border-Bg-Dark bg-light-bg space-y-2 rounded-xs border px-[11px] py-3">
                <p className="">Understood, I will create the pack</p>
                <RobotMsgSummary />
                <RobotMsgDocket />
                <RobotMsgProject />
                <RobotMsgTasks />
                <RobotMsgAssignedTo />
                <RobotMsgBroadcast />
            </div>
        </section>
    )
}
