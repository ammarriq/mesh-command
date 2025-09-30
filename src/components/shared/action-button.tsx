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

interface DropdownAction {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  iconClassName?: string;
}

interface ActionButtonProps {
  icon: "notification";
  tooltipText?: string;
  onClick?: () => void;
  dropdownActions?: DropdownAction[];
  className?: string;
}

export function ActionButton({
  icon,
  tooltipText = "Action",
  onClick,
  dropdownActions,
  className = "",
}: ActionButtonProps) {
  const buttonContent = (
    <Button
      variant="outline"
      size="icon"
      aria-label={tooltipText}
      onClick={dropdownActions ? undefined : onClick}
      className={`size-10 md:size-12 p-3 rounded-xs border border-Bg-Dark bg-light-bg ${className}`}
    >
      {icon === "notification" && <NotificationIcon className="size-6" />}
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
