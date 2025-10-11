import { FullScreenIcon } from "@/icons/full-screen"
import { SplitScreenIcon } from "@/icons/split-screen"

import { ActionButton } from "../action-button"
import Logo from "../logo"
import { SearchInput } from "../search-input"

interface SplitScreenBtnProps {
    type?: "full" | "split"
    isSplitScreen: boolean
    onClick: () => void
}

function SplitScreenBtn({ type, isSplitScreen, onClick }: SplitScreenBtnProps) {
    const isActive = type === "split" ? isSplitScreen : !isSplitScreen

    return (
        <button
            type="button"
            onClick={onClick}
            className={`grid size-10 place-items-center 2xl:size-12 ${
                isActive ? "bg-primary text-white" : "text-primary bg-white"
            }`}
        >
            {type === "full" ? (
                <FullScreenIcon
                    className={`size-6`}
                    fill={isActive ? "white" : "#5F0101"}
                    stroke={isActive ? "" : "#5F0101"}
                />
            ) : (
                <SplitScreenIcon
                    className={`size-6`}
                    fill={isActive ? "white" : "#5F0101"}
                    stroke={isActive ? "white" : ""}
                />
            )}
        </button>
    )
}

function NavBar() {
    return (
        <nav className="w-full rounded-xs bg-white">
            <section className="mx-auto flex max-w-[1920px] items-center justify-between px-4 py-2">
                <div className="flex items-center gap-5">
                    <Logo />

                    <div className="border-primary hidden items-center border xl:flex">
                        <SplitScreenBtn
                            isSplitScreen={false}
                            onClick={() => {}}
                            type="full"
                        />
                        <SplitScreenBtn
                            isSplitScreen={false}
                            onClick={() => {}}
                            type="split"
                        />
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
