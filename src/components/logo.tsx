import LogoIcon from "@/icons/logo"

interface LogoProps {
    isNavBar?: boolean
}

function Logo({ isNavBar }: LogoProps) {
    return (
        <div className="font-nunito flex items-center gap-3 2xl:gap-3.5">
            <LogoIcon className="size-14 2xl:size-16" />
            <LogoText isNavBar={isNavBar} />
        </div>
    )
}

export function LogoText({ isNavBar }: LogoProps) {
    return (
        <hgroup
            className={`${isNavBar ? "hidden sm:flex" : "flex"} flex-col items-start space-y-1`}
        >
            <h3 className="text-primary text-2xl leading-6 font-extrabold sm:leading-7 md:text-3xl 2xl:text-4xl">
                Mesh Command
            </h3>

            <p className="text-text-secondary text-sm leading-tight md:text-[17px] 2xl:text-xl">
                Redwood Real Estate Service
            </p>
        </hgroup>
    )
}

export default Logo
