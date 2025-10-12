import type { SelectedModel } from "./selected-model.ts"

export interface Chat {
    id: string
    name: string
    messages: { message: string; uid: string; createdAt: string }[]
    selectedModel?: SelectedModel
}
