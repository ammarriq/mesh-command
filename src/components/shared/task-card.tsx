import { AvatarGroup } from '@/components/shared/avatar-group';
import { InfoItem } from '@/components/shared/info-item';
import { Task } from '@/store';

import { MoreHorizontal } from 'lucide-react';

const getPriorityStyles = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-600';
    case 'low':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="p-4 flex flex-col gap-2 items-stretch bg-white rounded-2xl">
      <TaskCardHeader task={task} />
      <TaskCardContent task={task} />
    </div>
  );
}

function TaskCardHeader({ task }: TaskCardProps) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-xs font-medium rounded-sm px-1 py-0.5 ${getPriorityStyles(task.priority)}`}
      >
        {task.priority}
      </span>
      <MoreHorizontal className="size-4 text-text-primary" />
    </div>
  );
}

function TaskCardContent({ task }: TaskCardProps) {
  return (
    <section className="flex flex-col items-start gap-1.5">
      <h4 className="text-text-primary font-semibold text-base">{task.title}</h4>
      <p className="text-xs text-text-secondary line-clamp-2">
        {task.description} lrem ipsum dolor sit
      </p>
      <TaskCardDetails task={task} />
      <TaskCardFooter task={task} />
    </section>
  );
}

function TaskCardDetails({ task }: TaskCardProps) {
  return (
    <div className="space-y-2">
      <InfoItem type="user" label="Assigned to" value={task.assignedTo} />
      <InfoItem type="timer" label="Deadline" value={task.deadline} />
      {task.linkedDocs && task.linkedDocs.length > 0 && (
        <InfoItem
          type="link"
          label="Linked Docs"
          value={task.linkedDocs.join(', ')}
          valueClassName="text-text-primary tex-sm underline"
        />
      )}
    </div>
  );
}

function TaskCardFooter({ task }: TaskCardProps) {
  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex -space-x-1">
        <AvatarGroup users={task.users} />
      </div>
    </div>
  );
}
