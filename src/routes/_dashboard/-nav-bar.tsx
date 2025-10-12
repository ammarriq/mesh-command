import { ActionButton } from "@/components/action-button"
import Logo from "@/components/logo"
import { SearchInput } from "@/components/search-input"
import { useSplitScreen } from "@/context/split-screen"
import { FullScreenIcon } from "@/icons/full-screen"
import { SplitScreenIcon } from "@/icons/split-screen"

interface Props {
    activePath?: string
}

function NavBar({ activePath }: Props) {
    const { isActive, onToggle, onTabClick } = useSplitScreen()

    return (
        <nav className="w-full rounded-xs bg-white">
            <section className="mx-auto flex max-w-[1920px] items-center justify-between px-4 py-2">
                <div className="flex items-center gap-5">
                    <Logo />

                    <div className="border-primary *:data-[active=true]:bg-primary *:text-primary *:group hidden items-center border *:grid *:size-10 *:place-items-center *:bg-white *:data-[active=true]:text-white xl:flex *:2xl:size-12">
                        <button
                            type="button"
                            data-active={!isActive}
                            onClick={() => {
                                onToggle(false)
                                onTabClick((prev) => {
                                    return prev.filter(
                                        (tab) => tab === activePath,
                                    )
                                })
                            }}
                        >
                            <FullScreenIcon
                                className="size-6"
                                fill={!isActive ? "white" : "#5F0101"}
                                stroke={!isActive ? "" : "#5F0101"}
                            />
                        </button>

                        <button
                            type="button"
                            data-active={isActive}
                            onClick={() => onToggle(true)}
                        >
                            <SplitScreenIcon
                                className="size-6"
                                fill={isActive ? "white" : "#5F0101"}
                                stroke={isActive ? "white" : ""}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <SearchInput />
                    <ActionButton type={"notification"} />

                    <div className="relative size-12">
                        <img
                            src="/users/1.jpg"
                            alt="Profile"
                            width={48}
                            height={48}
                            className="border-Bg-Dark bg-light-bg size-12 rounded-xs border object-cover"
                        />
                    </div>
                </div>
            </section>
        </nav>
    )
}

export default NavBar
