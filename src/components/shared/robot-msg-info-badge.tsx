import DollarSquareIcon from "@/icons/dollar-square"
import TimerIcon from "@/icons/timer"
import TwoUsersIcon from "@/icons/two-users"

type InfoType = "user" | "time" | "budget"

interface RobotMsgInfoBadgeProps {
    type: InfoType
    value: string
    className?: string
}

export function RobotMsgInfoBadge({
    type,
    value,
    className = "",
}: RobotMsgInfoBadgeProps) {
    const icons = {
        user: (
            <TwoUsersIcon
                fill="var(--primary)"
                stroke="var(--primary)"
                className="size-5"
            />
        ),
        time: <TimerIcon className="size-5" />,
        budget: <DollarSquareIcon className="size-5" />,
    }

    return (
        <span
            className={`text-primary flex items-center gap-1 font-semibold ${className}`}
        >
            {icons[type]} {value}
        </span>
    )
}
