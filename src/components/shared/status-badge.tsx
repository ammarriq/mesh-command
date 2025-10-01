import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
  withDot?: boolean;
}

const statusConfig = {
  // Manager/User statuses
  Active: {
    variant: "default" as const,
    color: "bg-[#ECFDF3]",
    textColor: "text-[#067647]",
    borderColor: "border-[#ABEFC6]",
  },
  "In-Active": {
    variant: "destructive" as const,
    color: "bg-[#FEF3F2]",
    textColor: "text-[#B42318]",
    borderColor: "border-[#FECDCA]",
  },
  "On-hold": {
    variant: "outline" as const,
    color: "bg-[#FFFAEB]",
    textColor: "text-[#B54708]",
    borderColor: "border-[#FEDF89]",
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
        config?.color,
        config?.borderColor,
        " inline-flex items-center gap-1.5 font-medium border",
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
