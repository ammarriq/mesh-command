"use client";

import React, { useState } from "react";
import { Calendar, DollarSign, Paperclip, Send } from "lucide-react";
import { RobotIcon } from "@/icons/robot";
import { UsersIcon } from "@/icons/users";
import { Separator } from "../ui/separator";
import { ProjectIcon } from "@/icons/project";
import { DeepseekIcon } from "@/icons/deep-seek";
import { OpenaiIcon } from "@/icons/open-ai";
import {
  useSelectedChat,
  useChatStore,
  useSelectedProject,
  useSplitScreen,
} from "@/stores";
import type { MessagePair, SelectedModel } from "@/types/chat";
import LoadingRobotChat from "../shared/loading-robot-chat";
import { TasksIcon } from "@/icons/tasks";
import { HourglassIcon } from "@/icons/hour-glass";
import { AvatarGroup } from "@/components/shared/avatar-group";
import { ActionButton } from "@/components/shared/action-button";
import { MoreHorizontal } from "lucide-react";

// Helper function to get model display info
const getModelDisplay = (model: SelectedModel) => {
  if (model === "OpenAI 04") {
    return {
      icon: OpenaiIcon,
      color: "text-primary",
      strokeColor: "fill-primary",
    };
  } else {
    return {
      icon: DeepseekIcon,
      color: "text-[#4D6BFE]",
      strokeColor: "stroke-[#4D6BFE]",
    };
  }
};

export default function ChatView() {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isRenamingChat, setIsRenamingChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedChat = useSelectedChat();
  const updateChat = useChatStore((state) => state.updateChat);
  const isSplitScreen = useSplitScreen();
  const selectedProject = useSelectedProject();

  if (!selectedChat) return null;

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userMsg = ((formData.get("userMessage") as string) || "").trim();
    if (!userMsg) return;

    const newUserMessage = {
      message: userMsg,
      createdAt: new Date().toISOString(),
    };

    const newRobotResponse = {
      response: `I understand your message: "${userMsg}". This is a generic robot response for now.`,
      createdAt: new Date().toISOString(),
    };

    const newMessagePair: MessagePair = [newUserMessage, newRobotResponse];

    const updatedChat = {
      ...selectedChat,
      messages: [...(selectedChat.messages || []), newMessagePair],
    };

    updateChat(updatedChat);
    e.currentTarget.reset();
    showLoadingMsg();
  };

  function showLoadingMsg() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  const handleRenameChat = () => {
    setIsRenamingChat(true);
    setChatName(selectedChat.name);
  };

  const handleSaveRename = () => {
    if (!chatName.trim()) return;

    const updatedChat = {
      ...selectedChat,
      name: chatName.trim(),
    };

    updateChat(updatedChat);
    setIsRenamingChat(false);
  };

  const handleCancelRename = () => {
    setIsRenamingChat(false);
    setChatName("");
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="flex w-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-b-Bg-Dark px-4 py-2">
        <div className="flex items-center gap-2 text-text-primary">
          <RobotIcon className="size-6" />
          {/* If split screen and project selected, show project name and users */}
          {isSplitScreen && selectedProject ? (
            <>
              <span className="text-sm font-semibold">
                {selectedProject.title}
              </span>
              <AvatarGroup
                members={
                  selectedProject.users?.map((user, idx) => ({
                    id: idx,
                    name: user.name,
                    image: user.image,
                    initials: user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join(""),
                  })) || []
                }
                maxVisible={5}
                size="sm"
                showAddButton={false}
                className="ml-4"
              />
              <ActionButton
                icon={MoreHorizontal}
                tooltipText="Project Options"
                dropdownActions={[
                  {
                    label: "Linked Dockets",
                    icon: MoreHorizontal,
                    onClick: () => console.log("Open linked dockets"),
                    iconClassName: "size-4 text-red-600",
                  },
                  {
                    label: "Edit Project",
                    icon: MoreHorizontal,
                    onClick: () => console.log("Edit project"),
                    iconClassName: "size-4 text-red-600",
                  },
                ]}
                className="ml-2"
              />
            </>
          ) : // Renaming Chat
          isRenamingChat ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                className="text-sm bg-transparent border border-primary rounded px-2 py-1 outline-none"
                autoFocus
              />
              <button
                onClick={handleSaveRename}
                className="text-xs text-green-600 hover:text-green-700 font-semibold"
              >
                Save
              </button>
              <button
                onClick={handleCancelRename}
                className="text-xs text-red-600 hover:text-red-700 font-semibold"
              >
                Cancel
              </button>
            </div>
          ) : (
            <span className="text-sm">{selectedChat.name}</span>
          )}
        </div>
        {/* Only show rename button if not split screen or no project selected */}
        {!isRenamingChat && (!isSplitScreen || !selectedProject) && (
          <button
            onClick={handleRenameChat}
            className="text-xs text-primary hover:text-primary/90 font-semibold"
          >
            Rename Chat
          </button>
        )}
      </header>

      <section className="flex flex-col h-full">
        {/* Conversation */}
        <div className="px-4 py-4 space-y-6 flex-1 overflow-y-auto">
          {selectedChat.messages?.map((messagePair, i) => (
            <React.Fragment key={i}>
              <UserMsg
                msg={messagePair[0].message}
                time={messagePair[0].createdAt}
              />
              {loading ? (
                <LoadingRobotChat />
              ) : (
                <>
                  <RobotMsg
                    response={messagePair[1].response}
                    time={messagePair[1].createdAt}
                    model={selectedChat.selectedModel || "Deepseek-R1"}
                  />
                  {/* Show AddedNewUserMsg and UserMsg again if split screen and project selected */}
                  {isSplitScreen && selectedProject && (
                    <>
                      <AddedNewUserMsg />
                      <UserMsg
                        msg={messagePair[0].message}
                        time={messagePair[0].createdAt}
                        splitScreenStyle={true}
                      />
                    </>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="">
          {/* Attached Files Display */}
          {attachedFiles.length > 0 && (
            <div className="p-3 bg-light-bg border-b border-gray-200">
              <p className="text-xs text-text-secondary mb-2">
                Attached Files:
              </p>
              <div className="flex flex-wrap gap-2">
                {attachedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white rounded px-2 py-1 text-xs"
                  >
                    <span className="text-text-primary">{file.name}</span>
                    <button
                      onClick={() => removeAttachedFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage}>
            <textarea
              className="w-full resize-none p-3 bg-light-bg outline-none placeholder:text-text-secondary max-h-24"
              rows={4}
              placeholder="Write message here....."
              name="userMessage"
            />

            <div className="bg-white flex items-center justify-between">
              <label className="px-3 py-2 text-sm font-medium text-primary inline-flex items-center gap-2 cursor-pointer hover:text-primary/90">
                <Paperclip className="size-5 text-primary" /> Attach files
                <input
                  type="file"
                  multiple
                  onChange={handleFileAttach}
                  className="hidden"
                  accept="*/*"
                />
              </label>

              <div className="flex items-center justify-end gap-4">
                {(() => {
                  const modelInfo = getModelDisplay(
                    selectedChat.selectedModel || "Deepseek-R1"
                  );
                  const IconComponent = modelInfo.icon;
                  return (
                    <p
                      className={`h-12 flex items-center justify-center gap-2 ${modelInfo.color}`}
                    >
                      <IconComponent
                        className={`${modelInfo.strokeColor} w-6 h-auto`}
                      />
                      <span className="font-medium">
                        {selectedChat.selectedModel || "Deepseek-R1"}
                      </span>
                    </p>
                  );
                })()}
                <button
                  className="inline-flex items-center gap-2 rounded-xs bg-primary text-sm font-medium text-white p-3 disabled:opacity-50"
                  type="submit"
                >
                  <Send className="size-4" />
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}

interface UserMsgProps {
  time: string;
  user?: string;
  msg: string;
  splitScreenStyle?: boolean;
}

function UserMsg({
  msg,
  time,
  user = "Boss",
  splitScreenStyle = false,
}: UserMsgProps) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="flex flex-col max-w-2xl gap-1.5 ml-auto">
      {splitScreenStyle ? (
        <div className="flex justify-between items-center">
          <p className="space-x-2">
            <span className="font-medium text-primary">{user}</span>
            <span className="text-xs font-medium text-text-secondary p-1 bg-primary/10">
              AD
            </span>
          </p>
          <span className="text-xs text-text-secondary">
            {formatTime(time)}
          </span>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-secondary">
            {formatTime(time)}
          </span>
          <p className="space-x-2">
            <span className="font-medium text-primary">{user}</span>
            <span className="text-xs font-medium text-text-secondary p-1 bg-primary/10">
              AD
            </span>
          </p>
        </div>
      )}
      <p
        className={
          splitScreenStyle
            ? "bg-light-bg text-text-primary p-2"
            : "bg-primary text-white p-2"
        }
      >
        {msg}
      </p>
    </section>
  );
}

interface RobotMsgProps {
  response: string;
  time: string;
  model: "Deepseek-R1" | "OpenAI 04";
}

function RobotMsg({ time, model }: RobotMsgProps) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const modelInfo = getModelDisplay(model);
  const IconComponent = modelInfo.icon;

  return (
    <section className="flex flex-col max-w-2xl">
      <div className="flex items-center justify-between text-text-secondary">
        <p
          className={`h-12 flex items-center justify-center gap-2 ${modelInfo.color}`}
        >
          <IconComponent className={`${modelInfo.strokeColor} w-6 h-auto`} />
          <span className="font-medium">{model}</span>
        </p>
        <span className="text-xs">{formatTime(time)}</span>
      </div>

      <div className="rounded-xs border border-Bg-Dark bg-light-bg p-3 space-y-2">
        <p className="">Understood, I will create the pack</p>
        <RobotMsgSummary />
        <RobotMsgDocket />
        <RobotMsgProject />
        <RobotMsgTasks />
        <RobotMsgBroadcast />
      </div>
    </section>
  );
}

function RobotMsgBadge({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-xs py-1 px-2 text-xs font-semibold bg-primary-light text-primary  ${className}`}
    >
      {title}
    </span>
  );
}

function RobotMsgSummary() {
  return (
    <div className="">
      <RobotMsgBadge title="Summary" />
      <h3 className="mt-2 text-xl font-medium text-text-primary">
        HVAC service agreement for HQ
      </h3>
      <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1 text-primary font-semibold">
          <UsersIcon className="size-5 fill-primary" /> John Smith
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="size-5 stroke-primary" /> December 20,2026
        </span>
        <span className="inline-flex items-center gap-1">
          <DollarSign className="size-5 stroke-primary" /> $250k
        </span>
      </div>
      <Separator className="bg-dark-bg mt-2" />
    </div>
  );
}

function RobotMsgDocket() {
  return (
    <div className="">
      <RobotMsgBadge title="Dockets" />
      <p className="mt-2 text-text-primary">No file attached.</p>
      <Separator className="bg-dark-bg mt-2" />
    </div>
  );
}

function RobotMsgProject() {
  return (
    <div className="">
      <RobotMsgBadge title="Projects" />
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-md border text-text-primary">
          <ProjectIcon className="size-5 fill-primary" />
        </span>
        <span className="text-text-primary text-sm font-semibold">
          Facilities Project
        </span>
        <span className="text-text-secondary text-sm ">
          Related Project found
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        <span className="text-text-primary text-xs font-semibold">
          Project Status:
        </span>
        <span
          className={
            "inline-block rounded-xs bg-[#FFDD98]  text-primary/80 py-1 px-2 text-xs font-semibold "
          }
        >
          In-Progress
        </span>

        <span className={"inline-block text-text-secondary text-sm"}>
          {" "}
          Parts in bound
        </span>
      </div>
      <Separator className="bg-dark-bg mt-2" />
    </div>
  );
}

function RobotMsgBroadcast({ showBtns = true }: { showBtns?: boolean }) {
  return (
    <div className="">
      Would you like me to broadcast this draft to the Facilities Project
      channel, or keep refining privately?
      {showBtns && (
        <div className="mt-3 flex items-center gap-2">
          <button className="w-40 rounded-md bg-primary text-white text-xs font-medium py-2.5 px-6">
            Broadcast
          </button>
          <button className="w-40 rounded-md border border-primary text-primary text-xs font-medium py-2.5 px-6">
            Keep Refining
          </button>
        </div>
      )}
    </div>
  );
}

const tasks = [
  { title: "Review current contract", assignedTo: "John Smith", due: "Mar 10" },
  {
    title: "Collect vendor performance data",
    assignedTo: "Facilities",
    due: "Mar 15",
  },
  {
    title: "Draft negotiation strategy",
    assignedTo: "John Smith",
    due: "Apr 1",
  },
];

function RobotMsgTasks() {
  return (
    <div className="">
      <RobotMsgBadge title="Tasks" />
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <TasksIcon className="size-6 fill-primary" />
              <p className="text-sm font-semibold text-text-primary">
                {task.title}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-text-primary">
                Assigned to:{" "}
                <span className="text-text-secondary">{task.assignedTo}</span>
              </p>
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                <HourglassIcon className="size-4 fill-primary" />
                Due: {task.due}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Separator className="bg-dark-bg mt-2" />
    </div>
  );
}

function AddedNewUserMsg() {
  return (
    <div>
      <UsersIcon className="size-5 fill-primary" />
      <p className="text-sm text-text-secondary">
        John Smith Was added to the channel by Deepseek agent.
      </p>
    </div>
  );
}
