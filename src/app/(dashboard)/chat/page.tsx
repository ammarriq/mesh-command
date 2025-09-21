"use client";

import ChatView from "@/components/layout/chat-view";
import ChatTab from "@/components/layout/chat-tab";
import SelectRobot from "@/components/layout/select-robot";
import ProjectView from "@/components/layout/project-view";
import { useSelectedChat, useSplitScreen } from "@/stores/app-store";
import React from "react";

function ChatPage() {
  const selectedChat = useSelectedChat();
  const isSplitScreen = useSplitScreen();

  if (!selectedChat) {
    return <p>Create a new Chat!</p>;
  }

  // Render split screen layout
  if (isSplitScreen) {
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
