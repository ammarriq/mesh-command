export type SelectedModel = "Deepseek-R1" | "OpenAI 04";

export type UserMessage = {
  message: string;
  createdAt: string; // ISO string
};

export type ModelResponse = {
  response: string;
  createdAt: string; // ISO string
};

export type MessagePair = [UserMessage, ModelResponse];

export interface PrivateChat {
  id: number;
  name: string;
  selectedModel: SelectedModel | null;
  messages: MessagePair[] | null;
}
