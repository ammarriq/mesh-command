"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface DropdownAction {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  iconClassName?: string;
}

interface ActionButtonProps {
  icon: LucideIcon;
  tooltipText?: string;
  onClick?: () => void;
  hasNotifications?: boolean;
  notificationCount?: number;
  dropdownActions?: DropdownAction[];
  className?: string;
}

export function ActionButton({
  icon: Icon,
  tooltipText = "Action",
  onClick,
  hasNotifications = false,
  notificationCount = 0,
  dropdownActions,
  className = "",
}: ActionButtonProps) {
  const buttonContent = (
    <Button
      variant="outline"
      size="icon"
      aria-label={tooltipText}
      onClick={dropdownActions ? undefined : onClick}
      className={`size-9 sm:size-10 2xl:size-12 border border-primary bg-primary text-white relative ${className}`}
    >
      <Icon className="size-4 sm:size-5 2xl:size-6 text-white" />
      {hasNotifications && (
        <div className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        </div>
      )}
    </Button>
  );

  // If dropdown actions are provided, wrap in dropdown menu
  if (dropdownActions && dropdownActions.length > 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Tooltip>
            <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
            <TooltipContent>{tooltipText}</TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {dropdownActions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              className="flex items-center gap-2"
            >
              <action.icon
                className={action.iconClassName || "size-4 text-red-600"}
              />
              <span>{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Otherwise, return just the tooltip wrapped button
  return (
    <Tooltip>
      <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
}
