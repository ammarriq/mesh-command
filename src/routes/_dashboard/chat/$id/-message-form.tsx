import type { SelectedModel } from "@/types/chat"

import { useMemo, useState } from "react"

import DeepseekIcon from "@/icons/deep-seek"
import LinkSquareIcon from "@/icons/link-square"
import { OpenaiIcon } from "@/icons/open-ai"
import Send2Icon from "@/icons/send-2"
import { cn } from "@/lib/utils"

interface Props {
    selectedModel: SelectedModel
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function MessageForm({ selectedModel, onSubmit }: Props) {
    const [attachedFiles, setAttachedFiles] = useState<Array<File>>([])

    const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setAttachedFiles((prev) => [...prev, ...Array.from(files)])
        }
    }

    const removeAttachedFile = (index: number) => {
        setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const data = useMemo(() => {
        if (selectedModel === "OpenAI 04") {
            return {
                icon: OpenaiIcon,
                color: "text-text-primary",
                strokeColor: "fill-text-primary",
            }
        }

        return {
            icon: DeepseekIcon,
            color: "text-[#4D6BFE]",
            strokeColor: "stroke-[#4D6BFE]",
        }
    }, [])

    return (
        <form
            onSubmit={onSubmit}
            className="sticky bottom-0 bg-white pt-4 pl-4"
        >
            {attachedFiles.length > 0 ? (
                <div className="bg-light-bg border-Bg-Dark border-x border-t p-3">
                    <p className="text-text-secondary mb-2 text-xs">
                        Attached Files:
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {attachedFiles.map((file, index) => (
                            <div className="flex items-center gap-2 rounded bg-white px-2 py-1 text-xs">
                                <span className="text-text-primary">
                                    {file.name}
                                </span>
                                <button
                                    onClick={() => removeAttachedFile(index)}
                                    className="text-red-500 hover:text-red-700"
                                    aria-label={`Remove ${file.name}`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            <textarea
                className="border-Bg-Dark bg-light-bg placeholder:text-text-secondary max-h-24 w-full resize-none rounded-xs border px-[11px] py-3 shadow-[0_0_0_1px_rgba(29,201,160,0.05)] outline-none"
                rows={4}
                placeholder="Write message here....."
                name="userMessage"
            />

            <div className="flex items-center justify-between bg-white">
                <label className="text-primary hover:text-primary/90 inline-flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium">
                    <LinkSquareIcon className="text-primary size-6" /> Attach
                    files
                    <input
                        type="file"
                        multiple
                        onChange={handleFileAttach}
                        className="hidden"
                        accept="*/*"
                    />
                </label>

                <aside className="flex items-center justify-end gap-4">
                    <div
                        className={cn(
                            "flex h-12 items-center justify-center gap-2",
                            data.color,
                        )}
                    >
                        <data.icon
                            className={cn("h-auto w-6", data.strokeColor)}
                        />

                        <span className="font-medium">{selectedModel}</span>
                    </div>

                    <button
                        className="bg-primary inline-flex items-center gap-2 rounded-xs px-3 py-[11px] text-sm font-medium text-white disabled:opacity-50"
                        type="submit"
                    >
                        <Send2Icon className="size-6" />
                        Send
                    </button>
                </aside>
            </div>
        </form>
    )
}

export default MessageForm
