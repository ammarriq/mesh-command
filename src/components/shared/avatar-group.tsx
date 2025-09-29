import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string | number;
  name: string;
  image?: string;
  initials?: string;
}

interface AvatarGroupProps {
  members?: TeamMember[];
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  showAddButton?: boolean;
  onAddClick?: () => void;
  className?: string;
}

export function AvatarGroup({
  members = [],
  maxVisible = 5,
  size = "md",
  showAddButton = true,
  onAddClick,
  className = "",
}: AvatarGroupProps) {
  // Size configurations
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const overlapClasses = {
    sm: "-space-x-4",
    md: "-space-x-5",
    lg: "-space-x-6",
  };

  const iconSizes = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
  };

  // Limit the number of visible members
  const visibleMembers = members.slice(0, maxVisible);
  const remainingCount = members.length - maxVisible;

  return (
    <div className={`flex ${overlapClasses[size]} ${className}`}>
      {/* Render visible members */}
      {visibleMembers.map((member) => (
        <Avatar
          key={member.id}
          className={`${sizeClasses[size]} rounded-none border-2 border-white`}
        >
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback className="bg-gray-50 rounded-none">
            {member.initials || member.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}

      {/* Show remaining count if there are more members */}
      {remainingCount > 0 && (
        <Avatar
          className={`${sizeClasses[size]} bg-gray-100 rounded-none border-2 border-white`}
        >
          <AvatarFallback className="bg-gray-100 rounded-none text-gray-600 text-xs">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Add button */}
      {showAddButton && (
        <Avatar
          className={`${sizeClasses[size]} bg-primary rounded-none border-2 border-white cursor-pointer hover:bg-primary/90 transition-colors`}
          onClick={onAddClick}
        >
          <AvatarFallback className="bg-primary rounded-none">
            <Plus className={`${iconSizes[size]} text-white`} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
