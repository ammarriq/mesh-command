'use client';

import { ChatHeader } from '@/components/layout/chat-header';
import LoadingRobotChat from '@/components/shared/loading-robot-chat';
import { RobotMsg } from '@/components/shared/robot-msg';
import { UserMsg } from '@/components/shared/user-msg';
import DeepseekIcon from '@/icons/deep-seek';
import LinkSquareIcon from '@/icons/link-square';
import { OpenaiIcon } from '@/icons/open-ai';
import Send2Icon from '@/icons/send-2';
import TwoUsersIcon from '@/icons/two-users';
import { useChatStore, useSelectedChat, useSelectedProject, useSplitScreen } from '@/store';
import type { MessagePair, SelectedModel } from '@/types/chat';

import React, { useState } from 'react';

export default function ChatView() {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isRenamingChat, setIsRenamingChat] = useState(false);
  const [chatName, setChatName] = useState('');
  const [pendingMessageIndex, setPendingMessageIndex] = useState<number | null>(null);

  const selectedChat = useSelectedChat();
  const updateChat = useChatStore((state) => state.updateChat);
  const isSplitScreen = useSplitScreen();
  const selectedProject = useSelectedProject();

  if (!selectedChat) return null;

  const createUserMessage = (userMsg: string) => ({
    message: userMsg,
    createdAt: new Date().toISOString(),
  });

  const createRobotResponse = (userMsg: string) => ({
    response: `I understand your message: "${userMsg}". This is a generic robot response for now.`,
    createdAt: new Date().toISOString(),
  });

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userMsg = ((formData.get('userMessage') as string) || '').trim();

    if (!userMsg) return;

    const userMessage = createUserMessage(userMsg);
    const currentMessages = selectedChat.messages || [];
    const newMessageIndex = currentMessages.length;

    const tempMessagePair: MessagePair = [userMessage, { response: '', createdAt: '' }];

    const updatedChat = {
      ...selectedChat,
      messages: [...currentMessages, tempMessagePair],
    };

    updateChat(updatedChat);
    e.currentTarget.reset();
    setPendingMessageIndex(newMessageIndex);

    setTimeout(() => {
      const robotResponse = createRobotResponse(userMsg);
      const completeMessagePair: MessagePair = [userMessage, robotResponse];

      const finalUpdatedChat = {
        ...selectedChat,
        messages: [...currentMessages, completeMessagePair],
      };

      updateChat(finalUpdatedChat);
      setPendingMessageIndex(null);
    }, 2000);
  };

  const handleRenameChat = () => {
    setIsRenamingChat(true);
    setChatName(selectedChat.name);
  };

  const handleSaveRename = () => {
    if (!chatName.trim()) return;
    updateChat({ ...selectedChat, name: chatName.trim() });
    setIsRenamingChat(false);
  };

  const handleCancelRename = () => {
    setIsRenamingChat(false);
    setChatName('');
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

  const renderMessage = (messagePair: MessagePair, index: number) => {
    const isPendingMessage = pendingMessageIndex === index;
    const hasRobotResponse = messagePair[1] && messagePair[1].response;

    return (
      <React.Fragment key={index}>
        <UserMsg msg={messagePair[0].message} time={messagePair[0].createdAt} />
        {isPendingMessage ? (
          <LoadingRobotChat />
        ) : hasRobotResponse ? (
          <>
            <RobotMsg
              response={messagePair[1].response}
              time={messagePair[1].createdAt}
              model={selectedChat.selectedModel || 'Deepseek-R1'}
            />
            {isSplitScreen && selectedProject && (
              <>
                <AddedNewUserMsg />
                <UserMsg
                  msg={messagePair[0].message}
                  time={messagePair[0].createdAt}
                  splitScreenStyle
                />
              </>
            )}
          </>
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <section className="flex w-full flex-col">
      <ChatHeader
        isSplitScreen={isSplitScreen}
        selectedProject={selectedProject}
        isRenamingChat={isRenamingChat}
        chatName={chatName}
        selectedChat={selectedChat}
        onChatNameChange={setChatName}
        onSaveRename={handleSaveRename}
        onCancelRename={handleCancelRename}
        onRenameChat={handleRenameChat}
      />

      <section className="flex flex-col h-full">
        <MessagesContainer>{selectedChat.messages?.map(renderMessage)}</MessagesContainer>

        <FileAttachment files={attachedFiles} onRemove={removeAttachedFile} />

        <MessageInputForm
          onSubmit={handleSendMessage}
          onFileAttach={handleFileAttach}
          selectedModel={selectedChat.selectedModel || 'Deepseek-R1'}
        />
      </section>
    </section>
  );
}

interface MessagesContainerProps {
  children: React.ReactNode;
}

function MessagesContainer({ children }: MessagesContainerProps) {
  return <div className="pl-4 py-4 space-y-1 flex-1">{children}</div>;
}

const getModelDisplay = (
  model: SelectedModel,
): {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  strokeColor: string;
} => {
  if (model === 'OpenAI 04') {
    return {
      icon: OpenaiIcon,
      color: 'text-text-primary',
      strokeColor: 'fill-text-primary',
    };
  }
  return {
    icon: DeepseekIcon,
    color: 'text-[#4D6BFE]',
    strokeColor: 'stroke-[#4D6BFE]',
  };
};

interface MessageInputFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFileAttach: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedModel: SelectedModel;
}

function MessageInputForm({ onSubmit, onFileAttach, selectedModel }: MessageInputFormProps) {
  const modelInfo = getModelDisplay(selectedModel);
  const IconComponent = modelInfo.icon;

  return (
    <form onSubmit={onSubmit} className="pl-4">
      <textarea
        className="w-full resize-none py-3 px-[11px] rounded-xs border border-Bg-Dark shadow-[0_0_0_1px_rgba(29,201,160,0.05)] bg-light-bg outline-none placeholder:text-text-secondary max-h-24"
        rows={4}
        placeholder="Write message here....."
        name="userMessage"
      />
      <div className="bg-white flex items-center justify-between">
        <label className="px-3 py-2 text-sm font-medium text-primary inline-flex items-center gap-2 cursor-pointer hover:text-primary/90">
          <LinkSquareIcon className="size-6 text-primary" /> Attach files
          <input type="file" multiple onChange={onFileAttach} className="hidden" accept="*/*" />
        </label>
        <div className="flex items-center justify-end gap-4">
          <div className={`h-12 flex items-center justify-center gap-2 ${modelInfo.color}`}>
            <IconComponent className={`${modelInfo.strokeColor} w-6 h-auto`} />
            <span className="font-medium">{selectedModel}</span>
          </div>
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
  );
}

function AddedNewUserMsg() {
  return (
    <div className="flex items-start gap-1">
      <TwoUsersIcon fill="#5f0101" className="size-5 " />
      <p className="text-sm text-text-secondary">
        John Smith Was added to the channel by{' '}
        <span className="text-text-primary font-semibold">Deepseek</span> agent.
      </p>
    </div>
  );
}

interface AttachedFileProps {
  file: File;
  onRemove: () => void;
}

interface FileAttachmentProps {
  files: File[];
  onRemove: (index: number) => void;
}

function AttachedFile({ file, onRemove }: AttachedFileProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded px-2 py-1 text-xs">
      <span className="text-text-primary">{file.name}</span>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
        aria-label={`Remove ${file.name}`}
      >
        ×
      </button>
    </div>
  );
}

function FileAttachment({ files, onRemove }: FileAttachmentProps) {
  if (files.length === 0) return null;

  return (
    <div className="p-3 bg-light-bg border-b border-gray-200">
      <p className="text-xs text-text-secondary mb-2">Attached Files:</p>
      <div className="flex flex-wrap gap-2">
        {files.map((file, index) => (
          <AttachedFile key={index} file={file} onRemove={() => onRemove(index)} />
        ))}
      </div>
    </div>
  );
}
