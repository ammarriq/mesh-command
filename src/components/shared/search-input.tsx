import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchIcon from "@/icons/search-normal";

export function SearchInput() {
  return (
    <>
      {/* Desktop / tablet search field */}
      <label className="hidden px-3 py-1 md:flex items-center gap-2 rounded-xs bg-Bg-Dark shadow-xs w-72 lg:w-80 2xl:w-[360px]">
        <span className="sr-only">Search</span>

        <SearchIcon
          className="size-5 sm:size-6 text-text-secondary"
          aria-hidden
        />

        <Input
          id={"search"}
          name={"search"}
          type={"text"}
          placeholder={"Search"}
          className="shadow-none border-none outline-none ring-0 p-0 text-sm placeholder:text-sm bg-transparent "
        />
      </label>

      {/* Mobile sheet search */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden size-10 rounded-xs border border-Bg-Dark bg-light-bg text-primary"
            aria-label="Open search"
          >
            <SearchIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="p-4 bg-white px-6">
          <label className="px-3 py-1 flex items-center gap-2 rounded-xs bg-Bg-Dark shadow-xs max-w-lg w-full mx-auto">
            <span className="sr-only">Search</span>

            <SearchIcon
              className="size-5 sm:size-6 text-text-secondary"
              aria-hidden
            />

            <Input
              id={"search"}
              name={"search"}
              type={"text"}
              placeholder={"Search"}
              className="shadow-none border-none outline-none ring-0 p-0 text-sm placeholder:text-sm bg-transparent "
            />
          </label>
        </SheetContent>
      </Sheet>
    </>
  );
}
