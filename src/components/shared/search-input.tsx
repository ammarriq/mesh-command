import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SearchInput() {
  return (
    <>
      {/* Desktop / tablet search field */}
      <label className="hidden flex-1 sm:flex p-3 border border-light-bg bg-light-bg text-base items-center gap-2 max-w-80">
        <span className="sr-only">Search</span>
        <Search className="size-5 text-text-secondary" aria-hidden />
        <Input
          placeholder="Search"
          className="shadow-none border-none outline-none ring-0 p-0 text-base placeholder:text-base h-fit min-h-7 flex-1 bg-transparent"
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
