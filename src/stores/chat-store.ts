import { privateChats } from "@/lib/utils";
import { create } from "zustand";
import type { PrivateChat } from "@/types/chat";

interface ChatState {
  selectedChatId: number | null;
  chats: PrivateChat[];
  isSplitScreen: boolean;
}

interface ChatActions {
  setSelectedChat: (chatId: number) => void;
  setChats: (chats: PrivateChat[]) => void;
  updateChat: (chat: PrivateChat) => void;
  createNewChat: () => void;
  toggleSplitScreen: () => void;
}

export const useChatStore = create<ChatState & ChatActions>((set, get) => ({
  selectedChatId: privateChats.length
    ? privateChats[privateChats.length - 1].id
    : null,
  chats: [...privateChats].reverse(),
  isSplitScreen: false,

  setSelectedChat: (chatId) => set({ selectedChatId: chatId }),

  setChats: (chats) => set({ chats }),

  updateChat: (updatedChat) => {
    const chats = get().chats.map((c) =>
      c.id === updatedChat.id ? updatedChat : c
    );
    set({ chats });
  },

  createNewChat: () => {
    const { chats } = get();
    const newChatId = Math.max(...chats.map((c) => c.id), 0) + 1;
    const newChat: PrivateChat = {
      id: newChatId,
      name: `new-chat-${newChatId}`,
      selectedModel: null,
      messages: null,
    };
    const updatedChats = [newChat, ...chats];
    set({
      chats: updatedChats,
      selectedChatId: newChatId,
    });
  },

  toggleSplitScreen: () =>
    set((state) => ({ isSplitScreen: !state.isSplitScreen })),
}));

// Selectors
export const useSelectedChat = () =>
  useChatStore(
    (state) => state.chats.find((c) => c.id === state.selectedChatId) || null
  );

export const useSplitScreen = () =>
  useChatStore((state) => state.isSplitScreen);
