'use client';

import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { useAppStore, useProjectStore, useSelectedChat } from '@/store';
import type { Chat, ProjectCategory } from '@/store';

import { CustomTabTrigger } from '../shared/chat-tab-trigger';
import ProjectContentItem from '../shared/project-content-item';
import SharedTabActions from '../shared/tab-actions';

export default function ChatTab() {
  const categories = useProjectStore((state) => state.categories);
  const {
    chat: { chats },
    setSelectedChat,
    createNewChat,
  } = useAppStore();
  const selectedChat = useSelectedChat();

  const tabConfig = getTabConfig();
  return (
    <Tabs defaultValue="private" className="w-96 2xl:w-[496px]">
      <TabsList className="w-full border-r border-r-Bg-Dark h-fit">
        {tabConfig.map((tab) => (
          <CustomTabTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </CustomTabTrigger>
        ))}
      </TabsList>

      <SharedTabActions onCreateNewItem={createNewChat} type="chat" />
      <TabsContent
        value="private"
        className="p-1.5 lg:p-2 flex flex-col gap-3 border-r border-r-Bg-Dark"
      >
        <PrivateChatsList
          chats={chats}
          selectedChat={selectedChat}
          onChatSelect={setSelectedChat}
        />
      </TabsContent>

      <TabsContent value="projects" className="p-2 flex flex-col border-r border-r-Bg-Dark gap-3">
        <ProjectsList categories={categories} />
      </TabsContent>
    </Tabs>
  );
}

const getTabConfig = () => [
  { value: 'private', label: 'Private' },
  { value: 'projects', label: 'Projects' },
];

interface PrivateChatsListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (id: string) => void;
}

function PrivateChatsList({ chats, selectedChat, onChatSelect }: PrivateChatsListProps) {
  if (!chats.length || !selectedChat) {
    return null;
  }

  return (
    <>
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isSelected={selectedChat.id === chat.id}
          onClick={onChatSelect}
        />
      ))}
    </>
  );
}

interface ProjectsListProps {
  categories: ProjectCategory[];
}

function ProjectsList({ categories }: ProjectsListProps) {
  return (
    <>
      {categories.map((category) => (
        <ProjectContentItem
          key={category.id}
          title={category.name}
          projects={category.projects}
          showCreateButton={false}
          isChatTab
        />
      ))}
    </>
  );
}

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: (id: string) => void;
}

function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  return (
    <button
      onClick={() => onClick(chat.id)}
      className={`px-2 text-text-primary text-start ${isSelected ? 'bg-Bg-Dark py-2' : ''}`}
    >
      {chat.name}
    </button>
  );
}
