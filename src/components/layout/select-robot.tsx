"use client";

import React from "react";
import { useAppStore, useSelectedChat } from "@/stores/app-store";
import { DeepseekIcon } from "@/icons/deep-seek";
import { OpenaiIcon } from "@/icons/open-ai";

export default function SelectRobot() {
  const { updateChat } = useAppStore();
  const selectedChat = useSelectedChat();

  function choose(model: "Deepseek-R1" | "OpenAI 04") {
    if (!selectedChat) return;
    updateChat({ ...selectedChat, selectedModel: model });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <hgroup className="space-y-2">
        <h2 className="text-primary text-2xl font-medium text-center">
          Select Robot
        </h2>
        <p className="text-sm text-text-primary text-center">
          You must have to select a robot to start a chat.
        </p>
      </hgroup>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => choose("Deepseek-R1")}
          className="rounded-2xl h-12 min-w-[360px] bg-[#4D6BFE] text-white flex items-center justify-center gap-2"
        >
          <DeepseekIcon className="text-white w-7" />
          <span className="font-medium">Deepseek-R1</span>
        </button>

        <button
          type="button"
          onClick={() => choose("OpenAI 04")}
          className=" rounded-2xl h-12 min-w-[360px] border border-[#98A2B3] bg-white text-text-primary flex items-center justify-center gap-2"
        >
          <OpenaiIcon className="fill-text-primary w-7" />
          <span className="font-medium">OpenAI 04</span>
        </button>
      </div>
    </div>
  );
}
