import React from "react";
import Profile2UserIcon from "@/icons/profile-2user";
import TimerIcon from "@/icons/timer";
import DollarSquareIcon from "@/icons/dollar-square";

type InfoType = "user" | "time" | "budget";

interface RobotMsgInfoBadgeProps {
  type: InfoType;
  value: string;
  className?: string;
}

export function RobotMsgInfoBadge({
  type,
  value,
  className = "",
}: RobotMsgInfoBadgeProps) {
  let icon: React.ReactNode;
  switch (type) {
    case "user":
      icon = (
        <Profile2UserIcon
          fill="var(--primary)"
          stroke="var(--primary)"
          className="size-5"
        />
      );
      break;
    case "time":
      icon = <TimerIcon className="size-5" />;
      break;
    case "budget":
      icon = <DollarSquareIcon className="size-5" />;
      break;
    default:
      icon = null;
  }
  return (
    <span
      className={`flex items-center gap-1 text-primary font-semibold ${className}`}
    >
      {icon} {value}
    </span>
  );
}
