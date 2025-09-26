"use client";

import ChatView from "@/components/layout/chat-view";
import ChatTab from "@/components/layout/chat-tab";
import SelectRobot from "@/components/layout/select-robot";
import ProjectView from "@/components/layout/project-view";
import {
  useSelectedChat,
  useSplitScreen,
  useChatStore,
  useSelectedProject,
} from "@/stores";
import React, { useEffect } from "react";

function ChatPage() {
  const selectedChat = useSelectedChat();
  const isSplitScreen = useSplitScreen();
  const selectedProject = useSelectedProject();
  const { chats, selectedChatId, setSelectedChat, createNewChat } =
    useChatStore();

  useEffect(() => {
    // If there are no chats at all, create a new one
    if (chats.length === 0) {
      createNewChat();
      return;
    }

    // If there are chats but no selected chat, select the first one
    if (!selectedChatId && chats.length > 0) {
      setSelectedChat(chats[0].id);
      return;
    }
  }, [chats, selectedChatId, setSelectedChat, createNewChat]);

  // Don't render anything while we're setting up the initial chat state
  if (!selectedChat) {
    return null;
  }

  // Render split screen layout
  if (isSplitScreen) {
    // If no project is selected, show full width chat
    if (!selectedProject) {
      return (
        <section className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr]">
          <ChatTab />
          {!selectedChat.selectedModel && <SelectRobot />}
          {selectedChat.selectedModel && <ChatView />}
        </section>
      );
    }

    // If project is selected, show split view
    return (
      <section className="bg-white flex-1 py-4 grid grid-cols-[1fr_2fr_2fr]">
        <ChatTab />

        {/* Chat Section */}
        <div className="border-r border-Bg-Dark">
          {!selectedChat.selectedModel && <SelectRobot />}
          {selectedChat.selectedModel && <ChatView />}
        </div>

        {/* Project Section */}
        <div className="">
          <ProjectView />
        </div>
      </section>
    );
  }

  // Render normal single view layout
  return (
    <section className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr]">
      <ChatTab />
      {!selectedChat.selectedModel && <SelectRobot />}
      {selectedChat.selectedModel && <ChatView />}
    </section>
  );
}

export default ChatPage;
