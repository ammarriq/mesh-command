"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { CustomTabTrigger } from "../shared/custom-tab-trigger";
import { SearchInput } from "../shared/search-input";
import { AddIcon } from "@/icons/add";
import {
  useChatStore,
  useSelectedChat,
  useProjectStore,
  useSplitScreen,
} from "@/stores";
import { useRouter } from "next/navigation";

// Import the ProjectContentItem component from project-selector
import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import type { Project } from "@/stores";

function ChatTab() {
  const { categories } = useProjectStore();
  const selectedChat = useSelectedChat();
  const { chats, setSelectedChat, createNewChat } = useChatStore();

  return (
    <Tabs defaultValue="private" className="w-[496px]">
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
        className="p-2 flex flex-col border-r border-r-Bg-Dark gap-3"
      >
        {categories.map((category) => (
          <ProjectContentItem
            key={category.id}
            title={category.name}
            projects={category.projects}
            showCreateButton={false}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}

interface ProjectContentItemProps {
  title: string;
  projects: Project[];
  showCreateButton?: boolean;
}

function ProjectContentItem({
  title,
  projects,
  showCreateButton = false,
}: ProjectContentItemProps) {
  const { setSelectedProject, selectedProjectId } = useProjectStore();
  const isSplitScreen = useSplitScreen();
  const router = useRouter();

  // Handle project selection based on split screen state
  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);

    if (!isSplitScreen) {
      router.push("/projects");
    }
  };

  // Check if any project in this category is currently selected because we need to know if the category should be opened or closed by default
  const hasSelectedProject = projects.some(
    (project) => project.id === selectedProjectId
  );

  const [isCategoryOpen, setIsCateoryOpen] = useState(hasSelectedProject);

  useEffect(() => {
    setIsCateoryOpen(hasSelectedProject);
  }, [hasSelectedProject]);

  const getStatusDisplay = (status: "active" | "on-hold" | "completed") => {
    switch (status) {
      case "active":
        return { text: "In-progress", color: "text-yellow-600" };
      case "on-hold":
        return { text: "On-hold", color: "text-primary" };
      case "completed":
        return { text: "Completed", color: "text-green-600" };
      default:
        return { text: status, color: "text-text-secondary" };
    }
  };

  return (
    <Collapsible
      open={isCategoryOpen}
      onOpenChange={setIsCateoryOpen}
      className="flex w-full flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 rounded-sm bg-primary text-white hover:bg-primary/90"
          >
            <ChevronDown
              className={`transition-transform duration-200 ${
                isCategoryOpen ? "rotate-0" : "rotate-180"
              }`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <h4 className=" text-primary font-semibold">{title} </h4>
      </div>
      <CollapsibleContent className="flex flex-col pl-2.5 ">
        {projects.length === 0 ? (
          <div className="flex flex-col gap-2 py-2">
            <p className="text-sm text-text-secondary">No project available.</p>
            {showCreateButton && (
              <button className="bg-primary py-2 px-4 text-sm font-medium leading-5 shadow-sm rounded-xs text-white w-fit">
                Create new project
              </button>
            )}
          </div>
        ) : (
          projects.map((project) => {
            const statusInfo = getStatusDisplay(project.status);
            return (
              <button
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className={`text-sm rounded-xs text-left flex items-center gap-1 text-text-primary ${
                  selectedProjectId === project.id ? "bg-Bg-Dark p-2" : ""
                }`}
              >
                <span>{project.title}</span>
                <span className={`font-semibold ${statusInfo.color}`}>
                  {statusInfo.text}
                </span>
              </button>
            );
          })
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default ChatTab;
