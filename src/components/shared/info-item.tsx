import React from "react";
import { LucideIcon } from "lucide-react";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function InfoItem({
  icon: Icon,
  label,
  value,
  iconClassName = "size-5 text-gray-500 text-primary ",
  labelClassName = "text-primary font-semibold text-sm",
  valueClassName = "text-text-primary tex-sm",
}: InfoItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={iconClassName} />
      <span className={labelClassName}>
        {label}: <span className={valueClassName}>{value}</span>
      </span>
    </div>
  );
}
