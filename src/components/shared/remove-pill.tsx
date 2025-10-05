import CrossCircleIcon from "@/icons/cross-circle"

interface Props {
    title: string
}

function RemovePill({ title }: Props) {
    return (
        <div className="border-Bg-Dark flex w-full max-w-56 items-center justify-between gap-6 border-r bg-white px-2 py-1">
            <h3 className="text-sm font-medium">{title}</h3>
            <CrossCircleIcon className="size-4 cursor-pointer" />
        </div>
    )
}

export default RemovePill
