"use client";

import React from "react";
import { Bell } from "lucide-react";
import Logo from "../shared/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FullScreenIcon } from "@/icons/full-screen";
import { SplitscreenIcon } from "@/icons/split-screen";
import { useChatStore, useSplitScreen } from "@/stores";

import { SearchInput } from "../shared/search-input";
import { ActionButton } from "../shared/action-button";

function NavBar() {
  const isSplitScreen = useSplitScreen();
  const { toggleSplitScreen } = useChatStore();

  return (
    <nav className="w-full bg-white rounded-xs">
      <div className="mx-auto flex h-14 sm:h-16 2xl:h-16 items-center gap-2 sm:gap-3 2xl:gap-4 px-2 sm:px-4 2xl:px-4">
        {/* Left: Brand + controls */}
        <div className="flex min-w-0 items-center gap-3">
          <Logo />

          {/* Small control group with functional split screen toggle */}
          <div className="hidden md:flex items-center border border-primary">
            <button
              type="button"
              aria-label="Full screen"
              onClick={toggleSplitScreen}
              className={`size-9 lg:size-10 2xl:size-12 grid place-items-center ${
                !isSplitScreen
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary bg-white text-primary"
              }`}
            >
              <FullScreenIcon
                className={`size-6 ${
                  isSplitScreen ? "fill-primary" : "fill-white"
                }`}
              />
            </button>
            <button
              type="button"
              aria-label="Split screen"
              onClick={toggleSplitScreen}
              className={`size-9 lg:size-10 2xl:size-12 grid place-items-center ${
                isSplitScreen
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary bg-white text-primary"
              }`}
            >
              <SplitscreenIcon
                className={`size-6 ${
                  isSplitScreen ? "fill-white" : "fill-primary"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex-1" />

        {/* Right: Search, bell, avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchInput />

          <ActionButton icon={Bell} tooltipText="Notifications" />

          <Avatar name="Alex Doe" />
        </div>
      </div>
    </nav>
  );
}

function Avatar({ src, name }: { src?: string; name?: string }) {
  const initials =
    (name || "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={name ? `${name} profile` : "Profile"}
          className="size-9 sm:size-10 2xl:size-12 border border-Bg-Dark bg-light-bg text-primary "
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={name || "Profile"}
              className="size-full object-cover"
            />
          ) : (
            <span className="grid size-full place-items-center text-sm font-medium text-foreground/80">
              {initials}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>View linked Projects</DropdownMenuItem>
        <DropdownMenuItem>Linked Dockets</DropdownMenuItem>
        <DropdownMenuItem>Revert to 1:1</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavBar;
