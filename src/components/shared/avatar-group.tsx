import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AddIcon from '@/icons/add';

export interface User {
  id: string | number;
  name: string;
  image?: string;
  initials?: string;
}

export interface RawUser {
  name: string;
  image?: string;
}

export interface AvatarGroupProps {
  users?: User[] | RawUser[];
  className?: string;
  large?: boolean;
  isTaskCard?: boolean;
  showAddButton?: boolean;
  maxCount?: number;
}

export function AvatarGroup({
  users = [],
  className = '',
  large = false,
  isTaskCard = false,
  showAddButton = true,
  maxCount,
}: AvatarGroupProps) {
  if (!users || users.length === 0) return null;

  const processedUsers: User[] = users.map((user, idx) => {
    if ('id' in user && 'initials' in user) {
      return user as User;
    }
    const rawUser = user as RawUser;
    return {
      id: idx,
      name: rawUser.name,
      image: rawUser.image || '',
      initials: rawUser.name
        .split(' ')
        .map((n: string) => n[0])
        .join(''),
    };
  });

  const avatarSize = large ? 'size-12' : 'size-8 2xl:size-12';
  const halfOverlap = large ? -24 : -16; // half the width for proper overlap
  const displayCount = maxCount || (isTaskCard ? 2 : 5);
  const visibleUsers = processedUsers.slice(0, displayCount);

  // Debug logging
  console.log('AvatarGroup Debug:', {
    totalUsers: processedUsers.length,
    visibleUsers: visibleUsers.length,
    isTaskCard,
    maxCount,
    displayCount,
    actualData: processedUsers.map((u) => u.name),
  });

  return (
    <div className={`flex items-center ${className}`} style={{ minWidth: 'fit-content' }}>
      {visibleUsers.map((user, index) => (
        <Avatar
          key={user.id}
          className={`${avatarSize} rounded-none border-2 border-white relative`}
          style={{
            zIndex: 10 - index,
            marginLeft: index === 0 ? '0' : `${halfOverlap}px`,
          }}
        >
          <AvatarImage
            src={user.image}
            alt={user.name}
            className={`object-cover ${avatarSize} w-full h-full`}
          />
          <AvatarFallback
            className={`bg-gray-50 ${avatarSize} rounded-none flex items-center justify-center text-sm font-medium`}
          >
            {user.initials || user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}

      {showAddButton && (
        <button
          className={`bg-primary ${avatarSize} rounded-none border-2 border-white flex items-center justify-center relative hover:bg-primary/90 transition-colors`}
          style={{
            zIndex: 20,
            marginLeft: `${halfOverlap}px`,
          }}
        >
          <AddIcon fill="#fff" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
