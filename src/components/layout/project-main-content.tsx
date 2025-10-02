'use client';

import { ProjectHeader } from '@/components/layout/project-header';
import TaskCard from '@/components/shared/task-card';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { Project, Task } from '@/store';

import { Plus } from 'lucide-react';

import { CustomTabTrigger } from '../shared/chat-tab-trigger';

interface ProjectMainContentProps {
  selectedProject: Project;
  isSplitScreen?: boolean;
}

export default function ProjectMainContent({
  selectedProject,
  isSplitScreen = false,
}: ProjectMainContentProps) {
  const tasksByStatus = {
    todo: getTasksByStatus(selectedProject, 'To Do'),
    inProgress: getTasksByStatus(selectedProject, 'In-Progress'),
    completed: getTasksByStatus(selectedProject, 'Completed'),
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ProjectHeader project={selectedProject} />
      <DesktopTaskGrid tasksByStatus={tasksByStatus} />
      <MobileTaskTabs tasksByStatus={tasksByStatus} isSplitScreen={isSplitScreen} />
    </div>
  );
}

interface TasksByStatus {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
}

const getTasksByStatus = (project: Project, status: string): Task[] => {
  switch (status) {
    case 'To Do':
      return project.todo;
    case 'In-Progress':
      return project.inProgress;
    case 'Completed':
      return project.completed;
    default:
      return [];
  }
};

const getColumnBorderColor = (title: string): string => {
  switch (title) {
    case 'To Do':
      return '#5030E5';
    case 'In-Progress':
      return '#FFA500';
    case 'Completed':
      return '#68B266';
    default:
      return '#E5E7EB';
  }
};

const getColumnDotColor = (title: string): string => {
  switch (title) {
    case 'To Do':
      return 'bg-blue-500';
    case 'In-Progress':
      return 'bg-yellow-500';
    case 'Completed':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

interface DesktopTaskGridProps {
  tasksByStatus: TasksByStatus;
}

function DesktopTaskGrid({ tasksByStatus }: DesktopTaskGridProps) {
  return (
    <section className="hidden 2xl:grid grid-cols-3 gap-2 h-full">
      <TaskColumn title="To Do" tasks={tasksByStatus.todo} />
      <TaskColumn title="In-Progress" tasks={tasksByStatus.inProgress} />
      <TaskColumn title="Completed" tasks={tasksByStatus.completed} />
    </section>
  );
}

interface MobileTaskTabsProps {
  tasksByStatus: TasksByStatus;
  isSplitScreen: boolean;
}

function MobileTaskTabs({ tasksByStatus, isSplitScreen }: MobileTaskTabsProps) {
  const tabConfig = [
    { value: 'todo', label: 'To Do', tasks: tasksByStatus.todo },
    { value: 'inprogress', label: 'In-Progress', tasks: tasksByStatus.inProgress },
    { value: 'completed', label: 'Completed', tasks: tasksByStatus.completed },
  ];

  return (
    <section className={`${isSplitScreen ? 'block' : 'block 2xl:hidden'} mt-4`}>
      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="w-full h-fit">
          {tabConfig.map((tab) => (
            <CustomTabTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </CustomTabTrigger>
          ))}
        </TabsList>
        {tabConfig.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <TaskColumn title={tab.label} tasks={tab.tasks} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <section className="flex flex-col bg-light-bg rounded-sm px-3">
      <TaskColumnHeader title={title} taskCount={tasks.length} />
      <div className="space-y-3 flex-1 overflow-y-auto px-2 py-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

interface TaskColumnHeaderProps {
  title: string;
  taskCount: number;
}

function TaskColumnHeader({ title, taskCount }: TaskColumnHeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-2 py-4 border-b-3"
      style={{ borderBottomColor: getColumnBorderColor(title) }}
    >
      <div className="flex items-center gap-2 justify-between w-full">
        <hgroup className="flex items-center gap-2">
          <div className={`size-2 rounded-full ${getColumnDotColor(title)}`} />
          <h3 className="font-semibold text-text-primary">{title}</h3>
          <span className="bg-Bg-Dark text-text-secondary text-xs size-5 font-medium flex items-center justify-center rounded-full">
            {taskCount}
          </span>
        </hgroup>
        {title === 'To Do' && (
          <div className="bg-blue-900/10">
            <Plus className="ml-auto text-[#5030E5] p-1" />
          </div>
        )}
      </div>
    </header>
  );
}
