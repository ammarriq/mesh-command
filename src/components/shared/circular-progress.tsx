import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number; // 0-100
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  strokeColor?: string;
}

const sizeMap = {
  sm: { width: "w-12", height: "h-12", strokeWidth: 2, fontSize: "text-xs" },
  md: { width: "w-16", height: "h-16", strokeWidth: 2, fontSize: "text-sm" },
  lg: { width: "w-20", height: "h-20", strokeWidth: 3, fontSize: "text-base" },
};

export function CircularProgress({
  value,
  size = "md",
  label,
  className,
  strokeColor = "#dc2626",
}: CircularProgressProps) {
  const { width, height, strokeWidth, fontSize } = sizeMap[size];
  const strokeDasharray = `${value}, 100`;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", width, height)}>
        <svg
          className={cn(width, height, "transform -rotate-90")}
          viewBox="0 0 36 36"
        >
          {/* Background circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-semibold text-gray-900", fontSize)}>
            {value}%
          </span>
        </div>
      </div>
      {label && (
        <div className="text-sm">
          <div className="text-gray-600">{label}</div>
        </div>
      )}
    </div>
  );
}
