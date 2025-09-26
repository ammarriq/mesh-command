import { cn } from "@/lib/utils";

interface HalfCircleProgressProps {
  value: number; // 0-100
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  strokeColor?: string;
}

const sizeMap = {
  sm: { width: "w-12", height: "h-6", strokeWidth: 2, fontSize: "text-xs" },
  md: { width: "w-16", height: "h-8", strokeWidth: 2, fontSize: "text-sm" },
  lg: { width: "w-20", height: "h-10", strokeWidth: 3, fontSize: "text-base" },
};

export function HalfCircleProgress({
  value,
  size = "md",
  label,
  className,
  strokeColor = "#5f0101",
}: HalfCircleProgressProps) {
  const { width, height, strokeWidth, fontSize } = sizeMap[size];
  const strokeDasharray = `${(value / 100) * 50}, 50`; // Half circle is 50 units

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className={cn("relative", width, height)}>
        <svg className={cn(width, height)} viewBox="0 0 36 18">
          {/* Background half circle */}
          <path
            d="M2 16 a 14 14 0 0 1 32 0"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress half circle */}
          <path
            d="M2 16 a 14 14 0 0 1 32 0"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className={cn("font-semibold text-gray-900", fontSize)}>
            {value}%
          </span>
        </div>
      </div>
      {label && (
        <div className="text-sm font-medium text-text-primary text-center">
          {label}
        </div>
      )}
    </div>
  );
}
