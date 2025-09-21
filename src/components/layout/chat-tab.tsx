"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { CustomTabTrigger } from "../shared/custom-tab-trigger";
import { SearchInput } from "../shared/search-input";
import { AddIcon } from "@/icons/add";
import { useAppStore, useSelectedChat } from "@/stores/app-store";
import { PrivateChat } from "@/types/chat";
import Pill from "../shared/pill";

function ChatTab() {
  const { chats, setChats, setSelectedChat, projects, setSelectedProject } =
    useAppStore();
  const selectedChat = useSelectedChat();
  function createNewChat() {
    const newChat: PrivateChat = {
      id: chats.length + 1,
      name: "New Chat",
      selectedModel: null,
      messages: null,
    };

    setSelectedChat(newChat.id);
    setChats([newChat, ...chats]);
  }

  return (
    <Tabs defaultValue="private" className="w-full max-w-[496px]">
      <TabsList className="w-full border-b border-r border-r-Bg-Dark border-b-Bg-Dark">
        <CustomTabTrigger title="Private" value="private" />
        <CustomTabTrigger title="Projects" value="projects" />
      </TabsList>
      <div className="p-2 flex items-center gap-2">
        <SearchInput />
        <button onClick={createNewChat} className="bg-primary p-3">
          <AddIcon className="size-6" />
        </button>
      </div>
      <TabsContent
        value="private"
        className="p-2 flex flex-col border-r border-r-Bg-Dark"
      >
        {chats.length !== 0 &&
          selectedChat &&
          chats.map((chat) => (
            <button
              onClick={() => setSelectedChat(chat.id)}
              key={chat.id}
              className={`${
                selectedChat.id === chat.id && "bg-Bg-Dark"
              } p-2 text-text-primary text-start`}
            >
              {chat.name}
            </button>
          ))}
      </TabsContent>
      <TabsContent
        value="projects"
        className="p-2 flex flex-col border-r border-r-Bg-Dark"
      >
        {projects.map((project) => (
          <button
            onClick={() => setSelectedProject(project.id)}
            key={project.id}
            className="p-3 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-text-primary text-sm">
                {project.name}
              </h3>
              <div className="flex items-center gap-2">
                <Pill title={project.status} />
                <span className="text-xs text-text-secondary">
                  {project.budget}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span>👤 Contractor: {project.contractor}</span>
              <span>📅 Deadline: {project.deadline}</span>
            </div>
            <div className="mt-1">
              <span className="text-xs text-text-secondary">
                📋 Assigned to: {project.assignedTo}
              </span>
            </div>
          </button>
        ))}
      </TabsContent>
    </Tabs>
  );
}

export default ChatTab;
