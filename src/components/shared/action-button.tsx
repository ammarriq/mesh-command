"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import NotificationIcon from "@/icons/notification";
import ThreeDotsIcon from "@/icons/three-dots";

interface DropdownAction {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  iconClassName?: string;
}

interface ActionButtonProps {
  icon: "notification" | "3-dots";
  tooltipText?: string;
  onClick?: () => void;
  dropdownActions?: DropdownAction[];
  className?: string;
  size?: 8 | 12;
}
export function ActionButton({
  icon,
  tooltipText = "Action",
  onClick,
  dropdownActions,
  className = "",
  size = 12,
}: ActionButtonProps) {
  // Determine button and icon size classes
  const buttonSizeClass = size === 8 ? "size-8 p-1.5" : "size-12 p-3";
  const iconSizeClass = size === 8 ? "size-5" : "size-6";

  const buttonContent = (
    <Button
      variant="outline"
      size="icon"
      aria-label={tooltipText}
      onClick={dropdownActions ? undefined : onClick}
      className={`${buttonSizeClass} rounded-xs border border-Bg-Dark bg-light-bg ${className}`}
    >
      {icon === "notification" && (
        <NotificationIcon className={iconSizeClass} />
      )}
      {icon === "3-dots" && <ThreeDotsIcon className={iconSizeClass} />}
    </Button>
  );

  // Otherwise, return just the tooltip wrapped button
  return (
    <Tooltip>
      <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
}
