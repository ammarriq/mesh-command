import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallback?: string;
  className?: string;
}

const sizeMap = {
  sm: { class: "w-6 h-6", size: 24 },
  md: { class: "w-8 h-8", size: 32 },
  lg: { class: "w-10 h-10", size: 40 },
};

export function Avatar({
  src,
  alt,
  size = "md",
  fallback,
  className,
}: AvatarProps) {
  const { class: sizeClasses, size: imageSize } = sizeMap[size];
  const textSize =
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  if (src) {
    return (
      <Image
        src={src}
        alt={alt || "Avatar"}
        width={imageSize}
        height={imageSize}
        className={cn("rounded-full object-cover", sizeClasses, className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "bg-gray-300 rounded-full flex items-center justify-center font-medium text-gray-700",
        sizeClasses,
        textSize,
        className
      )}
    >
      {fallback || "?"}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    fallback?: string;
  }>;
  size?: "sm" | "md" | "lg";
  showAddButton?: boolean;
  onAdd?: () => void;
  maxVisible?: number;
}

export function AvatarGroup({
  avatars,
  size = "md",
  showAddButton = false,
  onAdd,
  maxVisible = 5,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  return (
    <div className="flex -space-x-2">
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="border-2 border-white rounded-full">
          <Avatar {...avatar} size={size} />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            "border-2 border-white rounded-full",
            sizeMap[size].class
          )}
        >
          <div className="bg-gray-400 rounded-full w-full h-full flex items-center justify-center text-white text-xs">
            +{remainingCount}
          </div>
        </div>
      )}

      {showAddButton && (
        <button
          onClick={onAdd}
          className={cn(
            "bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-red-700 transition-colors",
            sizeMap[size].class
          )}
        >
          +
        </button>
      )}
    </div>
  );
}
