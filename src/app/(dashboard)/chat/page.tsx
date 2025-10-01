'use client';

import ProjectMainContent from '@/components/layout/ProjectMainContent';
import ChatTab from '@/components/layout/chat-tab';
import ChatView from '@/components/layout/chat-view';
import SelectRobot from '@/components/layout/select-robot';
import RemovePill from '@/components/shared/remove-pill';
import { useAppStore } from '@/store';
import type { Chat, Project } from '@/store';

import { useEffect } from 'react';

function ChatPage() {
  const {
    chat: { chats, selectedChatId, isSplitScreen },
    project: { selectedProjectId },
    setSelectedChat,
    createNewChat,
  } = useAppStore();

  const selectedChat = chats.find((chat: Chat) => chat.id === selectedChatId);
  // TODO: Replace with actual project object lookup when projects are added to store
  const selectedProject = selectedProjectId ? ({ id: selectedProjectId } as Project) : null;

  useEffect(() => {
    if (chats.length === 0) {
      createNewChat();
      return;
    }
    if (!selectedChatId && chats.length > 0) {
      setSelectedChat(chats[0].id);
    }
  }, [chats, selectedChatId, setSelectedChat, createNewChat]);

  if (!selectedChat) return null;

  const ChatLayoutContent = (
    <section className="flex flex-col">
      <div className="bg-light-bg border border-Bg-Dark">
        <RemovePill
          title="Chat"
          isSplitScreen={isSplitScreen}
          isSelectedProject={!!selectedProject}
        />
      </div>
      <div className="bg-white flex-1 py-4 grid grid-cols-[1fr_4fr] pr-4">
        <ChatTab />
        {!selectedChat.selectedModel && <SelectRobot />}
        {selectedChat.selectedModel && <ChatView />}
      </div>
    </section>
  );

  // If project is selected, show split view
  if (isSplitScreen && selectedProject) {
    return (
      <main className="flex-1 grid grid-cols-[1fr_2fr_2fr] gap-2">
        {ChatLayoutContent}
        <section className="flex flex-col">
          <div className="bg-light-bg border border-Bg-Dark">
            <RemovePill
              title="Project"
              isSplitScreen={isSplitScreen}
              isSelectedProject={!!selectedProject}
            />
          </div>
          <ProjectMainContent selectedProject={selectedProject} isSplitScreen />
        </section>
      </main>
    );
  }

  return ChatLayoutContent;
}

export default ChatPage;
