import { createFileRoute } from "@tanstack/react-router"

import DeepseekIcon from "@/icons/deep-seek"
import { OpenaiIcon } from "@/icons/open-ai"

export const Route = createFileRoute("/_dashboard/chat/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <hgroup className="space-y-2">
                <h2 className="text-primary text-center text-2xl font-medium">
                    Select Robot
                </h2>
                <p className="text-text-primary text-center text-sm">
                    You must have to select a robot to start a chat.
                </p>
            </hgroup>

            <div className="flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => {}}
                    className="flex h-12 min-w-[360px] items-center justify-center gap-2 rounded-2xl bg-[#4D6BFE] text-white"
                >
                    <DeepseekIcon className="w-7 text-white" />
                    <span className="font-medium">Deepseek-R1</span>
                </button>

                <button
                    type="button"
                    onClick={() => {}}
                    className="text-text-primary flex h-12 min-w-[360px] items-center justify-center gap-2 rounded-2xl border border-[#98A2B3] bg-white"
                >
                    <OpenaiIcon className="fill-text-primary w-7" />
                    <span className="font-medium">OpenAI 04</span>
                </button>
            </div>
        </div>
    )
}
