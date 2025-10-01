import { RobotMsgInfoBadge } from '@/components/shared/robot-msg-info-badge';
import { Separator } from '@/components/ui/separator';
import DeepseekIcon from '@/icons/deep-seek';
import { OpenaiIcon } from '@/icons/open-ai';
import ProjectsIcon from '@/icons/project';
import TaskSquareIcon from '@/icons/task-square';
import TimerIcon from '@/icons/timer';
import { formatTime } from '@/lib/utils';
import type { SelectedModel } from '@/types/chat';

type ModelDisplay = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  strokeColor: string;
};

type Task = {
  title: string;
  assignedTo: string;
  due: string;
};

interface RobotMsgProps {
  response: string;
  time: string;
  model: 'Deepseek-R1' | 'OpenAI 04';
}

const TASKS: Task[] = [
  { title: 'Review current contract', assignedTo: 'John Smith', due: 'Mar 10' },
  { title: 'Collect vendor performance data', assignedTo: 'Facilities', due: 'Mar 15' },
  { title: 'Draft negotiation strategy', assignedTo: 'John Smith', due: 'Apr 1' },
];

const getModelDisplay = (model: SelectedModel): ModelDisplay => {
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

function RobotMsgBadge({ title, className = '' }: { title: string; className?: string }) {
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
      <h3 className="mt-2 text-xl font-medium text-text-primary">HVAC service agreement for HQ</h3>
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
        <span className="text-text-primary text-sm font-semibold">Facilities Project</span>
        <span className="text-text-secondary text-sm ">Related Project found</span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        <span className="text-text-primary text-xs font-semibold">Project Status:</span>
        <span
          className={
            'inline-block rounded-xs bg-[#FFDD98]  text-[#A17800] py-1 px-2 text-xs font-semibold '
          }
        >
          In-Progress
        </span>

        <span className={'inline-block text-text-secondary text-sm'}> Parts in bound</span>
      </div>
      <Separator className="bg-dark-bg mt-2" />
    </div>
  );
}

function RobotMsgAssignedTo() {
  return (
    <div className="">
      <RobotMsgBadge title="Assigned To" />
      <p className="mt-2 text-text-primary">Facilities Manager, Procurement Team</p>
      <Separator className="bg-dark-bg mt-2" />
    </div>
  );
}

function RobotMsgBroadcast({ showBtns = true }: { showBtns?: boolean }) {
  return (
    <div className="">
      Would you like me to broadcast this draft to the Facilities Project channel, or keep refining
      privately?
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

function RobotMsgTasks() {
  return (
    <div className="space-y-2">
      <RobotMsgBadge title="Tasks" />
      <div className="space-y-2">
        {TASKS.map((task, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <TaskSquareIcon className="size-6" />
              <p className="text-sm font-semibold text-text-primary">{task.title}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-text-primary">
                Assign to: <span className="text-text-secondary">{task.assignedTo}</span>
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

export function RobotMsg({ time, model }: RobotMsgProps) {
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
