import { Button } from "@/components/ui/button"
import NotificationIcon from "@/icons/notification"
import ThreeDotsIcon from "@/icons/three-dots"

interface ActionButtonProps {
    type: "notification" | "3-dots"
    className?: string
    size?: 8 | 12
}
export function ActionButton({
    type,
    className = "",
    size = 12,
}: ActionButtonProps) {
    const buttonSizeClass = size === 8 ? "size-8 p-1.5" : "size-12 p-3"
    const iconSizeClass = size === 8 ? "size-5" : "size-6"

    return (
        <Button
            variant="outline"
            size="icon"
            className={`${buttonSizeClass} border-Bg-Dark bg-light-bg rounded-xs border ${className}`}
        >
            {type === "notification" && (
                <NotificationIcon className={iconSizeClass} />
            )}
            {type === "3-dots" && <ThreeDotsIcon className={iconSizeClass} />}
        </Button>
    )
}
