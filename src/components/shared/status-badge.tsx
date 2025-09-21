import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
  withDot?: boolean;
}

const statusConfig = {
  // Project/Task statuses
  Active: {
    variant: "default" as const,
    color: "bg-green-500",
    textColor: "text-green-700",
  },
  "In-Progress": {
    variant: "secondary" as const,
    color: "bg-blue-500",
    textColor: "text-blue-700",
  },
  "On-hold": {
    variant: "outline" as const,
    color: "bg-orange-500",
    textColor: "text-orange-700",
  },
  Completed: {
    variant: "default" as const,
    color: "bg-green-500",
    textColor: "text-green-700",
  },
  "To Do": {
    variant: "outline" as const,
    color: "bg-gray-500",
    textColor: "text-gray-700",
  },

  // Priority statuses
  High: {
    variant: "destructive" as const,
    color: "bg-red-500",
    textColor: "text-red-700",
  },
  Medium: {
    variant: "secondary" as const,
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
  },
  Low: {
    variant: "outline" as const,
    color: "bg-gray-500",
    textColor: "text-gray-700",
  },

  // Payment statuses
  Paid: {
    variant: "default" as const,
    color: "bg-green-500",
    textColor: "text-green-700",
  },
  Unpaid: {
    variant: "destructive" as const,
    color: "bg-red-500",
    textColor: "text-red-700",
  },
};

export function StatusBadge({
  status,
  variant,
  size = "md",
  withDot = false,
}: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig];
  const badgeVariant = variant || config?.variant || "secondary";

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <Badge
      variant={badgeVariant}
      className={cn(
        sizeClasses[size],
        config?.textColor,
        "inline-flex items-center gap-1.5 font-medium"
      )}
    >
      {withDot && (
        <div
          className={cn("w-2 h-2 rounded-full", config?.color || "bg-gray-500")}
        />
      )}
      {status}
    </Badge>
  );
}
