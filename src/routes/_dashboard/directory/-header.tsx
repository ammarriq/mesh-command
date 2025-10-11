import { Link, linkOptions } from "@tanstack/react-router"

import { SearchInput } from "@/components/search-input"

const menuList = linkOptions([
    {
        name: "Employees",
        to: "/directory/employees",
    },
    {
        name: "Contractors",
        to: "/directory/contractors",
    },
    {
        name: "Teams",
        to: "/directory/teams",
    },
    {
        name: "Vendors",
        to: "/directory/vendors",
    },
    {
        name: "Equipments",
        to: "/directory/equipments",
    },
    {
        name: "Locations",
        to: "/directory/locations",
    },
])

function Header() {
    return (
        <>
            <header className="flex items-start justify-between">
                <hgroup className="mb-8">
                    <h1 className="mb-1 text-3xl font-semibold text-gray-900">
                        MeshCommand Directory
                    </h1>
                    <p className="text-sm text-slate-400">
                        Manage and view all people, equipment and locations.
                    </p>
                </hgroup>
                <SearchInput />
            </header>

            <div className="border-y-Bg-Dark border-y py-8">
                <div className="border-Bg-Dark *:data-[status=active]:bg-primary-light *:data-[status=active]:text-primary *:border-Bg-Dark *:text-foreground flex h-10 max-w-fit overflow-hidden rounded-lg border p-0 *:h-full *:border-y-0 *:px-4 *:not-last-of-type:border-r *:data-[status=active]:border-y-0 *:data-[status=active]:font-medium">
                    {menuList.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="grid place-items-center text-sm"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Header
