import SearchIcon from "@/icons/search-normal"

import { Input } from "../ui/input"

interface SearchInputProps {
    isChatTab?: boolean
}

export function SearchInput({ isChatTab }: SearchInputProps) {
    return (
        <label
            className={`bg-Bg-Dark w-full items-center gap-2 rounded-xs px-3 py-1 shadow-xs ${
                isChatTab
                    ? "flex flex-1"
                    : "hidden w-72 md:flex lg:w-80 2xl:w-[360px]"
            } `}
        >
            <span className="sr-only">Search</span>
            <SearchIcon
                className="text-text-secondary size-5 shrink-0 sm:size-6"
                aria-hidden
            />
            <Input
                id={"search"}
                name={"search"}
                type={"text"}
                placeholder={"Search"}
                className="border-none bg-transparent p-0 text-sm shadow-none ring-0 outline-none placeholder:text-sm"
            />
        </label>
    )
}
