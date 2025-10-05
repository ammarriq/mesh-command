'use client';

import DeepseekIcon from '@/icons/deep-seek';
import { OpenaiIcon } from '@/icons/open-ai';
import { useChatStore, useSelectedChat } from '@/store';

export default function SelectRobot() {
  const { updateChat } = useChatStore();
  const selectedChat = useSelectedChat();

  const robots = getRobotConfig();

  const handleRobotSelect = (model: RobotModel) => {
    if (!selectedChat) return;
    updateChat({ ...selectedChat, selectedModel: model });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <SelectRobotHeader />
      <RobotButtonsList robots={robots} onSelect={handleRobotSelect} />
    </div>
  );
}

type RobotModel = 'Deepseek-R1' | 'OpenAI 04';

const getRobotConfig = () => [
  {
    model: 'Deepseek-R1' as const,
    icon: <DeepseekIcon className="text-white w-7" />,
    variant: 'primary' as const,
  },
  {
    model: 'OpenAI 04' as const,
    icon: <OpenaiIcon className="fill-text-primary w-7" />,
    variant: 'secondary' as const,
  },
];

function SelectRobotHeader() {
  return (
    <hgroup className="space-y-2">
      <h2 className="text-primary text-2xl font-medium text-center">Select Robot</h2>
      <p className="text-sm text-text-primary text-center">
        You must have to select a robot to start a chat.
      </p>
    </hgroup>
  );
}

interface RobotButtonsListProps {
  robots: Array<{
    model: RobotModel;
    icon: React.ReactNode;
    variant: 'primary' | 'secondary';
  }>;
  onSelect: (model: RobotModel) => void;
}

function RobotButtonsList({ robots, onSelect }: RobotButtonsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {robots.map((robot) => (
        <RobotButton key={robot.model} {...robot} onClick={onSelect} />
      ))}
    </div>
  );
}

interface RobotButtonProps {
  model: RobotModel;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick: (model: RobotModel) => void;
}

function RobotButton({ model, icon, variant, onClick }: RobotButtonProps) {
  const buttonClasses = getButtonClasses(variant);

  return (
    <button type="button" onClick={() => onClick(model)} className={buttonClasses}>
      {icon}
      <span className="font-medium">{model}</span>
    </button>
  );
}

function getButtonClasses(variant: 'primary' | 'secondary') {
  const baseClasses = 'rounded-2xl h-12 min-w-[360px] flex items-center justify-center gap-2';
  const variantClasses =
    variant === 'primary'
      ? 'bg-[#4D6BFE] text-white'
      : 'border border-[#98A2B3] bg-white text-text-primary';

  return `${baseClasses} ${variantClasses}`;
}
