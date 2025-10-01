import React from "react";
import Profile2UserIcon from "@/icons/profile-2user";
import TimerIcon from "@/icons/timer";
import DollarSquareIcon from "@/icons/dollar-square";
import FolderOpenIcon from "@/icons/folder-open";

type InfoType = "user" | "timer" | "dollar" | "link";

interface InfoItemProps {
  type: InfoType;
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
}

export function InfoItem({
  type,
  label,
  value,
  className = "",
  valueClassName = "",
}: InfoItemProps) {
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
    case "timer":
      icon = <TimerIcon className="size-5" />;
      break;
    case "dollar":
      icon = <DollarSquareIcon className="size-5" />;
      break;
    case "link":
      icon = <FolderOpenIcon fill="#5F0101" className="size-5" />;
      break;
    default:
      icon = null;
  }

  return (
    <span
      className={`flex items-center gap-1 text-primary font-semibold text-xs ${className}`}
    >
      {icon}
      {label ? `${label}: ` : ""}
      <span className={`text-text-primary ${valueClassName}`}>{value}</span>
    </span>
  );
}
