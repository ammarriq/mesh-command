"use client";

import React from "react";
import Logo from "../shared/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell, Search } from "lucide-react";
import { FullScreenIcon } from "@/icons/full-screen";
import { SplitscreenIcon } from "@/icons/split-screen";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function NavBar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 sm:h-16 2xl:h-16 max-w-screen-2xl items-center gap-2 sm:gap-3 2xl:gap-4 px-2 sm:px-4 2xl:px-4">
        {/* Left: Brand + controls */}
        <div className="flex min-w-0 items-center gap-3">
          <Logo />

          {/* Small control group (visual only to match design) */}
          <div className="hidden md:flex items-center border border-primary">
            <button
              type="button"
              aria-label="Primary state"
              className="size-9 lg:size-10 2xl:size-12 bg-primary text-primary-foreground grid place-items-center"
            >
              <FullScreenIcon className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Secondary state"
              className="size-9 lg:size-10 2xl:size-12 border border-primary bg-white text-primary grid place-items-center"
            >
              <SplitscreenIcon className="size-6 fill-primary" />
            </button>
          </div>
        </div>

        <div className="flex-1" />

        {/* Right: Search, bell, avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchInput />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Notifications"
                className="size-9 sm:size-10 2xl:size-12 border border-Bg-Dark bg-light-bg text-primary "
              >
                <Bell className="size-4 sm:size-5 2xl:size-6 text-primary fill-primary/10" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

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
  );
}

function SearchInput() {
  return (
    <>
      {/* Desktop / tablet search field */}
      <label className="hidden sm:flex w-48 md:w-64 lg:w-72 xl:w-[20rem] 2xl:min-w-[360px] 2xl:w-[36rem] py-1.5 px-3 border border-light-bg bg-light-bg text-base items-center gap-2">
        <span className="sr-only">Search</span>
        <Search className="size-5 text-text-secondary" aria-hidden />
        <Input
          placeholder="Search"
          className="shadow-none border-none outline-none ring-0 p-0 text-base placeholder:text-base flex-1 bg-transparent"
          aria-label="Search"
        />
      </label>

      {/* Mobile sheet search */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden size-9 border border-Bg-Dark bg-light-bg text-primary"
            aria-label="Open search"
          >
            <Search className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="p-4">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
          </SheetHeader>
          <label className="mt-2 flex w-full items-center gap-2 rounded-md border border-light-bg bg-light-bg py-2 px-3">
            <Search className="size-5 text-text-secondary" aria-hidden />
            <Input
              autoFocus
              placeholder="Search"
              className="shadow-none border-none outline-none ring-0 p-0 text-base placeholder:text-base flex-1 bg-transparent"
              aria-label="Search"
            />
          </label>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default NavBar;
