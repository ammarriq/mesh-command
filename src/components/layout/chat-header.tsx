import { ActionButton } from '@/components/shared/action-button';
import { AvatarGroup } from '@/components/shared/avatar-group';
import PeopleIcon from '@/icons/people';
import { RobotIcon } from '@/icons/robot';

interface ChatHeaderProps {
  isSplitScreen: boolean;
  selectedProject: {
    title: string;
    users?: Array<{ name: string; image?: string }>;
  } | null;
  isRenamingChat: boolean;
  chatName: string;
  selectedChat: {
    name: string;
  };
  onChatNameChange: (name: string) => void;
  onSaveRename: () => void;
  onCancelRename: () => void;
  onRenameChat: () => void;
}

export function ChatHeader({
  isSplitScreen,
  selectedProject,
  isRenamingChat,
  chatName,
  selectedChat,
  onChatNameChange,
  onSaveRename,
  onCancelRename,
  onRenameChat,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-b-Bg-Dark p-4">
      <div className="flex items-center 2xl:items-start flex-col 2xl:flex-row gap-2 text-text-primary gap-y-3">
        {isSplitScreen && selectedProject ? (
          <div className="flex flex-col 2xl:flex-row gap-2 items-start justify-start">
            <div className="text-sm font-semibold flex justify-start items-center 2xl:items-start gap-1">
              <PeopleIcon />
              {selectedProject.title}
            </div>
            <div className="flex items-center 2xl:self-end gap-2">
              <AvatarGroup users={selectedProject.users} />
              <ActionButton type="3-dots" size={8} />
            </div>
          </div>
        ) : isRenamingChat ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatName}
              onChange={(e) => onChatNameChange(e.target.value)}
              className="text-sm bg-transparent border border-primary rounded px-2 py-1 outline-none"
              autoFocus
            />
            <button
              onClick={onSaveRename}
              className="text-xs text-green-600 hover:text-green-700 font-semibold"
            >
              Save
            </button>
            <button
              onClick={onCancelRename}
              className="text-xs text-red-600 hover:text-red-700 font-semibold"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="inline-flex items-center gap-2">
            <RobotIcon className="size-6" />
            <span className="text-sm text-text-primary">{selectedChat.name}</span>
          </p>
        )}
      </div>
      {!isRenamingChat && (!isSplitScreen || !selectedProject) && (
        <button
          onClick={onRenameChat}
          className="text-xs text-primary hover:text-primary/90 font-semibold"
        >
          Rename Chat
        </button>
      )}
    </header>
  );
}
