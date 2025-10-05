import { RobotIcon } from "@/icons/robot"

function LoadingRobotChat() {
    return (
        <div className="flex items-center gap-1">
            <RobotIcon className="fill-primary size-5" fill="#5f0101" />
            <p className="text-primary text-xs font-semibold">
                Working on your request....
            </p>
        </div>
    )
}

export default LoadingRobotChat
