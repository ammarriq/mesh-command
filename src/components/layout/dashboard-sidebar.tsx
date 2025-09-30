"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import FolderOpenIcon from "@/icons/folder-open";
import HierarchySquare2Icon from "@/icons/hierarchy-square-2";
import TrendUpIcon from "@/icons/trend-up";
import Profile2UserIcon from "@/icons/profile-2user";
import ShieldIcon from "@/icons/shield";
import ChatIcon from "@/icons/chat";
import LogoutIcon from "@/icons/logout";

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { title: "Chat", href: "/chat", icon: ChatIcon },
  { title: "Projects", href: "/projects", icon: HierarchySquare2Icon },
  { title: "Dockets", href: "/dockets", icon: FolderOpenIcon },
  { title: "Reports", href: "/reports", icon: TrendUpIcon },
  { title: "Directory", href: "/directory", icon: Profile2UserIcon },
  { title: "Admin", href: "/admin", icon: ShieldIcon },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <section className="py-6 px-4 flex justify-between flex-col">
      <ul className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <SideBarItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <SideBarItem
          item={{ href: "/logout", icon: LogoutIcon, title: "Logout" }}
          isActive={pathname === "/logout"}
        />
      </div>
    </section>
  );
}

interface Props {
  item: NavItem;
  isActive: boolean;
}

function SideBarItem({ isActive, item }: Props) {
  return (
    <li key={item.href}>
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex w-20 flex-col items-center rounded-[2px] py-4",
          isActive ? "bg-primary/20 text-primary" : "text-text-secondary"
        )}
      >
        <item.icon
          className="size-6"
          fill={isActive ? "#5F0101" : "#78829D"}
          stroke={isActive ? "#5F0101" : "#78829D"}
        />
        <span
          className={cn(
            isActive ? "text-primary" : "text-text-secondary",
            "font-medium text-base"
          )}
        >
          {item.title}
        </span>
      </Link>
    </li>
  );
}
