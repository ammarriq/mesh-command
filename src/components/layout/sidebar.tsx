'use client';

import ChatIcon from '@/icons/chat';
import LogoutIcon from '@/icons/logout';
import OpenFolderIcon from '@/icons/open-folder';
import ProjectsIcon from '@/icons/project';
import ShieldIcon from '@/icons/shield';
import TrendUpIcon from '@/icons/trend-up';
import TwoUsersIcon from '@/icons/two-users';
import { cn } from '@/lib/utils';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { title: 'Chat', href: '/chat', icon: ChatIcon },
  { title: 'Projects', href: '/projects', icon: ProjectsIcon },
  { title: 'Dockets', href: '/dockets', icon: OpenFolderIcon },
  { title: 'Reports', href: '/reports', icon: TrendUpIcon },
  { title: 'Directory', href: '/directory', icon: TwoUsersIcon },
  { title: 'Admin', href: '/admin', icon: ShieldIcon },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <section className="py-6 px-4 flex justify-between flex-col">
      <ul className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <SideBarItem key={item.href} item={item} isActive={pathname === item.href} />
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <SideBarItem
          item={{ href: '/logout', icon: LogoutIcon, title: 'Logout' }}
          isActive={pathname === '/logout'}
        />
      </div>
    </section>
  );
}

export default Sidebar;

interface SideBarItemProps {
  item: NavItem;
  isActive: boolean;
}

function SideBarItem({ isActive, item }: SideBarItemProps) {
  return (
    <li key={item.href}>
      <Link
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'flex size-20 flex-col items-center rounded-[4px] py-4',
          isActive ? 'bg-primary/20 text-primary' : 'text-text-secondary',
        )}
      >
        <item.icon
          className="size-6"
          fill={isActive ? '#5F0101' : '#78829D'}
          stroke={isActive ? '#5F0101' : '#78829D'}
        />
        <span
          className={cn(isActive ? 'text-primary' : 'text-text-secondary', 'font-medium text-base')}
        >
          {item.title}
        </span>
      </Link>
    </li>
  );
}
