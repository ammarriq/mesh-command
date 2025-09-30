"use client";

import { useEffect } from "react";

import {
  useSelectedChat,
  useSplitScreen,
  useChatStore,
  useSelectedProject,
} from "@/stores";

import ChatView from "@/components/layout/chat-view";
import ChatTab from "@/components/layout/chat-tab";
import SelectRobot from "@/components/layout/select-robot";
import ProjectMainContent from "@/components/layout/ProjectMainContent";
import RemovePill from "@/components/shared/remove-pill";

function ChatPage() {
  const selectedChat = useSelectedChat();
  const isSplitScreen = useSplitScreen();
  const selectedProject = useSelectedProject();
  const { chats, selectedChatId, setSelectedChat, createNewChat } =
    useChatStore();

  useEffect(() => {
    if (chats.length === 0) {
      createNewChat();
      return;
    }

    if (!selectedChatId && chats.length > 0) {
      setSelectedChat(chats[0].id);
      return;
    }
  }, [chats, selectedChatId, setSelectedChat, createNewChat]);

  if (!selectedChat) {
    return null;
  }

  // If project is selected, show split view
  if (isSplitScreen && selectedProject) {
    return (
      <main className="flex-1 grid grid-cols-[1fr_2fr_2fr]">
        <section className="flex flex-col">
          <div className="bg-light-bg border border-Bg-Dark">
            <RemovePill title={"Chat"} isSelectedProject />
          </div>
          <div className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr]">
            <ChatTab />
            {!selectedChat.selectedModel && <SelectRobot />}
            {selectedChat.selectedModel && <ChatView />}
          </div>
        </section>

        <section className="flex flex-col">
          <div className="bg-light-bg border border-Bg-Dark">
            <RemovePill title={"Project"} isSelectedProject />
          </div>
          <ProjectMainContent
            selectedProject={selectedProject}
            getTasksByStatus={(project, status) => {
              switch (status) {
                case "To Do":
                  return project.todo;
                case "In-Progress":
                  return project.inProgress;
                case "Completed":
                  return project.completed;
                default:
                  return [];
              }
            }}
            getPriorityColor={(priority) => {
              switch (priority.toLowerCase()) {
                case "high":
                  return "bg-primary/10 text-primary";
                case "medium":
                  return "bg-yellow-100 text-[#D58D49]";
                case "low":
                  return "bg-green-100 text-[#68B266]";
                default:
                  return "bg-gray-100 text-gray-700";
              }
            }}
          />
        </section>
      </main>
    );
  }

  // Render normal single view layout if no project selected or not in split screen mode
  return (
    <main className="flex flex-col">
      <section className="bg-light-bg border border-Bg-Dark">
        <RemovePill title={"Chat"} />
      </section>
      <section className="bg-white flex-1 py-4 pr-4 grid grid-cols-[1fr_4fr]">
        <ChatTab />
        {!selectedChat.selectedModel && <SelectRobot />}
        {selectedChat.selectedModel && <ChatView />}
      </section>
    </main>
  );
}

export default ChatPage;
