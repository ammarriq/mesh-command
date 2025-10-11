import { formatTime } from "@/lib/utils"

interface UserMsgProps {
    time: string
    user?: string
    msg: string
    splitScreenStyle?: boolean
}

export function UserMsg({
    msg,
    time,
    user = "Boss",
    splitScreenStyle = false,
}: UserMsgProps) {
    return (
        <section className="ml-auto flex max-w-2xl flex-col gap-1.5">
            {splitScreenStyle ? (
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2">
                        <span className="text-primary font-medium">{user}</span>
                        <img
                            src={"/users/2.jpg"}
                            alt="user"
                            width={20}
                            height={20}
                            className="bg-primary/10"
                        />
                    </p>
                    <span className="text-text-secondary text-xs">
                        {formatTime(time)}
                    </span>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-xs">
                        {formatTime(time)}
                    </span>
                    <hgroup className="flex items-center gap-2">
                        <h5 className="text-primary font-medium">{user}</h5>
                        <div className="relative size-5">
                            <img
                                src={"/users/2.jpg"}
                                alt="user"
                                width={20}
                                height={20}
                                className="bg-primary/10 size-5 object-cover object-top"
                            />
                        </div>
                    </hgroup>
                </div>
            )}
            <p
                className={`${
                    splitScreenStyle
                        ? "bg-light-bg text-text-primary px-[11px] py-3"
                        : "bg-primary px-[11px] py-3 text-white"
                } shadow-[0_0_0_2px_rgba(29,201,160,0.2)]" rounded-xs`}
            >
                {msg}
            </p>
        </section>
    )
}
