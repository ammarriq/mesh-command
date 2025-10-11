"use client"

import type { ComponentType, SVGProps } from "react"

import { Link, useLocation } from "@tanstack/react-router"

import ChatIcon from "@/icons/chat"
import LogoutIcon from "@/icons/logout"
import OpenFolderIcon from "@/icons/open-folder"
import ProjectsIcon from "@/icons/project"
import ShieldIcon from "@/icons/shield"
import TrendUpIcon from "@/icons/trend-up"
import TwoUsersIcon from "@/icons/two-users"
import { cn } from "@/lib/utils"

interface NavItem {
    title: string
    href: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

interface SideBarItemProps {
    item: NavItem
    isActive?: boolean
}

const NAV_ITEMS: Array<NavItem> = [
    { title: "Chat", href: "/chat", icon: ChatIcon },
    { title: "Projects", href: "/projects", icon: ProjectsIcon },
    { title: "Dockets", href: "/dockets", icon: OpenFolderIcon },
    { title: "Reports", href: "/reports", icon: TrendUpIcon },
    { title: "Directory", href: "/directory", icon: TwoUsersIcon },
    { title: "Admin", href: "/admin", icon: ShieldIcon },
]

function SideBarItem({ isActive, item }: SideBarItemProps) {
    return (
        <Link
            to={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "flex size-20 flex-col items-center rounded-[4px] py-4",
                isActive ? "bg-primary/20 text-primary" : "text-text-secondary",
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
                    "text-base font-medium",
                )}
            >
                {item.title}
            </span>
        </Link>
    )
}

function Sidebar() {
    const { pathname } = useLocation()

    const urlPrefix = "/" + pathname.split("/").filter(Boolean)[0]

    return (
        <section className="flex flex-col justify-between p-4">
            <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                    <SideBarItem
                        key={item.href}
                        item={item}
                        isActive={item.href.startsWith(urlPrefix)}
                    />
                ))}
            </nav>

            <nav className="mt-auto pt-4">
                <SideBarItem
                    item={{
                        href: "/logout",
                        icon: LogoutIcon,
                        title: "Logout",
                    }}
                />
            </nav>
        </section>
    )
}

export default Sidebar
