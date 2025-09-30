"use client";

import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Separator } from "../ui/separator";
import LoadingRobotChat from "../shared/loading-robot-chat";
import { AvatarGroup } from "@/components/shared/avatar-group";
import { ActionButton } from "@/components/shared/action-button";

import { OpenaiIcon } from "@/icons/open-ai";
import { RobotIcon } from "@/icons/robot";
import { UsersIcon } from "@/icons/users";

import {
  useSelectedChat,
  useChatStore,
  useSelectedProject,
  useSplitScreen,
} from "@/stores";
import type { MessagePair, SelectedModel } from "@/types/chat";
import Image from "next/image";
import DeepseekIcon from "@/icons/deep-seek";
import { RobotMsgInfoBadge } from "@/components/shared/robot-msg-info-badge";
import ProjectsIcon from "@/icons/hierarchy-square-2";
import TaskSquareIcon from "@/icons/task-square";
import LinkSquareIcon from "@/icons/link-square";
import Send2Icon from "@/icons/send-2";
import TimerIcon from "@/icons/timer";

const getModelDisplay = (model: SelectedModel) => {
  if (model === "OpenAI 04") {
    return {
      icon: OpenaiIcon,
      color: "text-text-primary",
      strokeColor: "fill-text-primary",
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
  const [isRobotMsgLoading, setIsRobotMsgLoading] = useState(false);

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
    setIsRobotMsgLoading(true);
    setTimeout(() => setIsRobotMsgLoading(false), 2000);
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
      <header className="flex items-center justify-between border-b border-b-Bg-Dark p-4">
        <div className="flex items-center gap-2 text-text-primary">
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
                icon={"3-dots"}
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
          ) : isRenamingChat ? (
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
            <>
              <RobotIcon className="size-6" />
              <span className="text-sm text-text-primary">
                {selectedChat.name}
              </span>
            </>
          )}
        </div>

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
        <div className="pl-4 py-4 space-y-1 flex-1">
          {selectedChat.messages?.map((messagePair, i) => (
            <React.Fragment key={i}>
              <UserMsg
                msg={messagePair[0].message}
                time={messagePair[0].createdAt}
              />
              {isRobotMsgLoading ? (
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

          <form onSubmit={handleSendMessage} className="pl-4">
            <textarea
              className="w-full resize-none py-3 px-[11px] rounded-xs border border-Bg-Dark shadow-[0_0_0_1px_rgba(29,201,160,0.05)] bg-light-bg outline-none placeholder:text-text-secondary max-h-24"
              rows={4}
              placeholder="Write message here....."
              name="userMessage"
            />

            <div className="bg-white flex items-center justify-between">
              <label className="px-3 py-2 text-sm font-medium text-primary inline-flex items-center gap-2 cursor-pointer hover:text-primary/90">
                <LinkSquareIcon className="size-6 text-primary" /> Attach files
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
                  className="inline-flex items-center gap-2 rounded-xs bg-primary text-sm font-medium text-white px-3 py-[11px] disabled:opacity-50"
                  type="submit"
                >
                  <Send2Icon className="size-6" />
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
            <Image
              src={"/users/2.jpg"}
              alt="user"
              width={20}
              height={20}
              className="bg-primary/10"
            />
          </p>
          <span className="text-xs text-text-secondary">
            {formatTime(time)}
          </span>
        </div>
      ) : (
        <div className="flex justify-between items-center ">
          <span className="text-xs text-text-secondary">
            {formatTime(time)}
          </span>
          <hgroup className="flex items-center gap-2">
            <h5 className="font-medium text-primary">{user}</h5>
            <div className="relative size-5 ">
              <Image
                src={"/users/2.jpg"}
                alt="user"
                width={20}
                height={20}
                className="bg-primary/10 size-5 object-cover object-top"
              />
            </div>
          </hgroup>
        </div>
      )}
      <p
        className={`${
          splitScreenStyle
            ? "bg-light-bg text-text-primary px-[11px] py-3"
            : "bg-primary text-white px-[11px] py-3"
        } rounded-xs shadow-[0_0_0_2px_rgba(29,201,160,0.2)]"`}
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
        <p className={`h-12 flex items-center gap-2 ${modelInfo.color}`}>
          <IconComponent className={`${modelInfo.strokeColor} w-6 h-auto`} />
          <span className="font-medium">{model}</span>
        </p>
        <span className="text-xs">{formatTime(time)}</span>
      </div>

      <div className="rounded-xs border border-Bg-Dark bg-light-bg py-3 px-[11px] space-y-2">
        <p className="">Understood, I will create the pack</p>
        <RobotMsgSummary />
        <RobotMsgDocket />
        <RobotMsgProject />
        <RobotMsgTasks />
        <RobotMsgAssignedTo />
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
      className={`inline-block rounded-sm py-[5px] px-2 text-xs font-semibold bg-primary-light text-primary  ${className}`}
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
        <RobotMsgInfoBadge type="user" value="John Smith" />
        <RobotMsgInfoBadge type="time" value="December 20,2026" />
        <RobotMsgInfoBadge type="budget" value="$250k" />
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
    <div className="space-y-1">
      <RobotMsgBadge title="Projects" />
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-md border text-text-primary">
          <ProjectsIcon className="size-5 " />
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
            "inline-block rounded-xs bg-[#FFDD98]  text-[#A17800] py-1 px-2 text-xs font-semibold "
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

function RobotMsgAssignedTo() {
  return (
    <div className="">
      <RobotMsgBadge title="Assigned To" />
      <p className="mt-2 text-text-primary">
        Facilities Manager, Procurement Team
      </p>
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
          <button className="w-40 rounded-md text-white text-sm font-medium py-2.5 px-6 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] flex items-center justify-center border border-primary bg-primary">
            Broadcast
          </button>
          <button className="w-40 rounded-md text-primary text-sm font-medium py-2.5 px-6 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] flex items-center justify-center border border-primary">
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
    <div className="space-y-2">
      <RobotMsgBadge title="Tasks" />
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <TaskSquareIcon className="size-6" />
              <p className="text-sm font-semibold text-text-primary">
                {task.title}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-text-primary">
                Assign to:{" "}
                <span className="text-text-secondary">{task.assignedTo}</span>
              </p>
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                <TimerIcon className="size-4 " />
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
