import React from "react";

export type RobotMsgBadgeStatus =
  | "in-progress"
  | "completed"
  | "on-hold"
  | "default";

interface RobotMsgBadgeProps {
  title: string;
  status?: RobotMsgBadgeStatus;
  className?: string;
}

const statusStyles: Record<RobotMsgBadgeStatus, { bg: string; text: string }> =
  {
    "in-progress": {
      bg: "bg-[#FFDD98]",
      text: "text-[#A17800]",
    },
    completed: {
      bg: "bg-[#C8F7C5]",
      text: "text-[#1B7F2A]",
    },
    "on-hold": {
      bg: "bg-primary-light ",
      text: "text-primary",
    },
    default: {
      bg: "bg-primary-light",
      text: "text-primary",
    },
  };

export function RobotMsgBadge({
  title,
  status = "default",
  className = "",
}: RobotMsgBadgeProps) {
  const style = statusStyles[status] || statusStyles.default;
  return (
    <span
      className={`inline-block rounded-sm py-0.5 px-2 text-xs font-semibold whitespace-nowrap ${style.bg} ${style.text} ${className}`}
    >
      {title}
    </span>
  );
}
