import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface User {
  id: string | number;
  name: string;
  image?: string;
  initials?: string;
}

export interface AvatarGroupProps {
  users?: User[];
  className?: string;
  large?: boolean;
  isTaskCard?: boolean;
}

export function AvatarGroup({
  users = [],
  className = "",
  large = false,
  isTaskCard = false,
}: AvatarGroupProps) {
  if (!users || users.length === 0) return null;

  const avatarSize = large ? "size-12" : "size-8";
  const overlapClass = large ? "-space-x-6" : "-space-x-4";
  const visibleUsers = users.slice(0, isTaskCard ? 2 : 5);

  return (
    <div className={`flex ${overlapClass} ${className}`}>
      {visibleUsers.map((user) => (
        <Avatar
          key={user.id}
          className={`${avatarSize} rounded-none border-l-2 border-l-white`}
        >
          <AvatarImage
            src={user.image}
            alt={user.name}
            className={`object-cover ${avatarSize} w-full h-full`}
          />
          <AvatarFallback
            className={`bg-gray-50 ${avatarSize} rounded-none flex items-center justify-center`}
          >
            {user.initials || user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
