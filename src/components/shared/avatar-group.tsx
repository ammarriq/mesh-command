import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddIcon from "@/icons/add";

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

  // Limit the number of visible members
  const visibleMembers = members.slice(0, maxVisible);
  const remainingCount = members.length - maxVisible;

  return (
    <div className={`flex ${overlapClasses[size]} ${className}`}>
      {/* Render visible members */}
      {visibleMembers.map((member) => (
        <Avatar
          key={member.id}
          className={`size-12 rounded-none border-l-2 border-l-white`}
        >
          <AvatarImage
            src={member.image}
            alt={member.name}
            className={`object-cover size-full`}
          />
          <AvatarFallback className="bg-gray-50 size-6 p-3 rounded-none">
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
          className={`${sizeClasses[size]} bg-primary rounded-none border-l-2 border-l-white cursor-pointer hover:bg-primary/90 size-fit transition-colors`}
          onClick={onAddClick}
        >
          <AvatarFallback className="bg-primary p-3 rounded-none">
            <AddIcon className={`size-6 text-white`} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
