"use client";

import React, { useState } from "react";
import { Calendar, DollarSign, Paperclip, Send } from "lucide-react";
import { RobotIcon } from "@/icons/robot";
import { UsersIcon } from "@/icons/users";
import { Separator } from "../ui/separator";
import { ProjectIcon } from "@/icons/project";
import Pill from "../shared/pill";
import { DeepseekIcon } from "@/icons/deep-seek";
import { OpenaiIcon } from "@/icons/open-ai";
import { useSelectedChat, useChatStore } from "@/stores";
import type { MessagePair, SelectedModel } from "@/types/chat";

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
  const selectedChat = useSelectedChat();
  const [inputMessage, setInputMessage] = useState("");
  const [isRenamingChat, setIsRenamingChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const updateChat = useChatStore((state) => state.updateChat);

  if (!selectedChat) return null;

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      message: inputMessage,
      createdAt: new Date().toISOString(),
    };

    const newRobotResponse = {
      response: `I understand your message: "${inputMessage}". This is a generic robot response for now.`,
      createdAt: new Date().toISOString(),
    };

    const newMessagePair: MessagePair = [newUserMessage, newRobotResponse];

    const updatedChat = {
      ...selectedChat,
      messages: [...(selectedChat.messages || []), newMessagePair],
    };

    updateChat(updatedChat);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

          {/* Renaming Chat */}
          {isRenamingChat ? (
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
        {!isRenamingChat && (
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
              <RobotMsg
                response={messagePair[1].response}
                time={messagePair[1].createdAt}
                model={selectedChat.selectedModel || "Deepseek-R1"}
              />
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

          <div>
            <textarea
              className="w-full resize-none p-3 bg-light-bg outline-none placeholder:text-text-secondary max-h-24"
              rows={4}
              placeholder="Write message here....."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
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
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                >
                  <Send className="size-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

interface UserMsgProps {
  time: string;
  user?: string;
  msg: string;
}

function UserMsg({ msg, time, user = "Boss" }: UserMsgProps) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="flex flex-col max-w-2xl gap-1.5 ml-auto">
      <div className="flex justify-between items-center">
        <span className="text-xs text-text-secondary">{formatTime(time)}</span>
        <p className="space-x-2">
          <span className="font-medium text-primary">{user}</span>
          <span className="text-xs font-medium text-text-secondary p-1 bg-primary/10">
            AD
          </span>
        </p>
      </div>

      <p className="bg-primary text-white p-2">{msg}</p>
    </section>
  );
}

interface RobotMsgProps {
  response: string;
  time: string;
  model: "Deepseek-R1" | "OpenAI 04";
}

function RobotMsg({ response, time, model }: RobotMsgProps) {
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
        <p className="">{response}</p>
        <RobotMsgWrapper title="Summary">
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
        </RobotMsgWrapper>

        <RobotMsgWrapper title="Dockets">
          <p className="mt-2 text-text-primary">No file attached.</p>
        </RobotMsgWrapper>

        <RobotMsgWrapper title="Projects">
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
        </RobotMsgWrapper>
        {/* <RobotMsgWrapper title="Summary">
          <p className="mt-2 text-text-primary">
            Facilities Manager, Procurement Team
          </p>
        </RobotMsgWrapper> */}
        <div className="">
          Would you like me to broadcast this draft to the Facilities Project
          channel, or keep refining privately?
          <div className="mt-3 flex items-center gap-2">
            <button className="w-40 rounded-md bg-primary text-white text-xs font-medium py-2.5 px-6">
              Broadcast
            </button>
            <button className="w-40 rounded-md border border-primary text-primary text-xs font-medium py-2.5 px-6">
              Keep Refining
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface RobotMsgWrapperI {
  children: React.ReactNode;
  title: string;
}

function RobotMsgWrapper({ title, children }: RobotMsgWrapperI) {
  return (
    <>
      <div className="">
        <Pill title={title} />
        {children}
      </div>
      <Separator className="bg-dark-bg" />
    </>
  );
}
