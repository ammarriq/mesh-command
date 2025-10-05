"use client"

import { FullScreenIcon } from "@/icons/full-screen"
import { SplitScreenIcon } from "@/icons/split-screen"
import { useAppStore, useSplitScreen } from "@/store"

import { ActionButton } from "../shared/action-button"
import CustomDropDown from "../shared/custom-drop-down"
import Logo from "../shared/logo"
import { SearchInput } from "../shared/search-input"

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
    const { toggleSplitScreen } = useAppStore()
    const isSplitScreen = useSplitScreen()

    return (
        <nav className="w-full rounded-xs bg-white">
            <section className="mx-auto flex max-w-[1920px] items-center justify-between px-4 py-2">
                <div className="flex items-center gap-5">
                    <Logo />

                    <div className="border-primary hidden items-center border xl:flex">
                        <SplitScreenBtn
                            isSplitScreen={isSplitScreen}
                            onClick={toggleSplitScreen}
                            type="full"
                        />
                        <SplitScreenBtn
                            isSplitScreen={isSplitScreen}
                            onClick={toggleSplitScreen}
                            type="split"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <SearchInput />
                    <ActionButton type={"notification"} />
                    <CustomDropDown type="settings">
                        <div className="relative size-12">
                            <img
                                src="/users/1.jpg"
                                alt="Profile"
                                width={48}
                                height={48}
                                className="border-Bg-Dark bg-light-bg size-12 rounded-xs border object-cover"
                            />
                        </div>
                    </CustomDropDown>
                </div>
            </section>
        </nav>
    )
}

export default NavBar
