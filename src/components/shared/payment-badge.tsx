import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PaymentBadgeProps {
  status: "Active" | "Paid";
  size?: "sm" | "md" | "lg";
}

const paymentStatusConfig = {
  Active: {
    variant: "default" as const,
    color: "bg-[#ECFDF3]",
    textColor: "text-[#067647]",
    borderColor: "border-[#ABEFC6]",
  },
  Paid: {
    variant: "default" as const,
    color: "bg-[#ECFDF3]",
    textColor: "text-[#067647]",
    borderColor: "border-[#ABEFC6]",
  },
};

// Checkmark icon component
const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PaymentBadge({ status, size = "md" }: PaymentBadgeProps) {
  const config = paymentStatusConfig[status];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <Badge
      variant={config.variant}
      className={cn(
        sizeClasses[size],
        config.textColor,
        config.color,
        config.borderColor,
        "inline-flex items-center gap-1.5 font-medium border"
      )}
    >
      <CheckIcon />
      {status}
    </Badge>
  );
}
