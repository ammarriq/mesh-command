'use client';

import { AvatarGroup } from '@/components/shared/avatar-group';
import { InfoItem } from '@/components/shared/info-item';
import { ProjectHeader } from '@/components/shared/project-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Project, Task } from '@/store';

import { MoreHorizontal, Plus } from 'lucide-react';
import { Edit } from 'lucide-react';

interface ProjectMainContentProps {
  selectedProject: Project;
  isSplitScreen?: boolean;
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

const ProjectMainContent: React.FC<ProjectMainContentProps> = ({
  selectedProject,
  isSplitScreen = false,
}) => {
  const todoTasks = getTasksByStatus(selectedProject, 'To Do');
  const inProgressTasks = getTasksByStatus(selectedProject, 'In-Progress');
  const completedTasks = getTasksByStatus(selectedProject, 'Completed');

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ProjectHeader project={selectedProject} />

      {/* For screens above 2xl */}
      <section className="hidden 2xl:grid grid-cols-3 gap-2 h-full">
        <TaskColumn title="To Do" tasks={todoTasks} />
        <TaskColumn title="In-Progress" tasks={inProgressTasks} />
        <TaskColumn title="Completed" tasks={completedTasks} />
      </section>

      {/* Under 2xl screens */}
      <section className={`${isSplitScreen ? 'block' : 'block 2xl:hidden'} mt-4`}>
        <div className="flex items-center gap-2 mb-2 w-full">
          <Tabs defaultValue="todo" className="w-full">
            <TabsList className="w-full h-fit">
              <TabsTrigger value="todo" className="p-4">
                To Do
              </TabsTrigger>
              <TabsTrigger value="inprogress">In-Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="todo">
              <TaskColumn title="To Do" tasks={todoTasks} />
            </TabsContent>
            <TabsContent value="inprogress">
              <TaskColumn title="In-Progress" tasks={inProgressTasks} />
            </TabsContent>
            <TabsContent value="completed">
              <TaskColumn title="Completed" tasks={completedTasks} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ProjectMainContent;

// Task Column Component

function TaskColumn({ title, tasks }: { title: string; tasks: Task[] }) {
  const getBorderColor = () => {
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

  return (
    <section className="flex flex-col bg-light-bg rounded-sm px-3">
      <header
        className="flex items-center justify-between px-2 py-4 border-b-3"
        style={{ borderBottomColor: getBorderColor() }}
      >
        <div className="flex items-center gap-2 justify-between w-full">
          <hgroup className="flex items-center gap-2">
            <div
              className={`size-2 rounded-full ${
                title === 'To Do'
                  ? 'bg-blue-500'
                  : title === 'In-Progress'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
              }`}
            ></div>
            <h3 className="font-semibold text-text-primary">{title}</h3>
            <span className="bg-Bg-Dark text-text-secondary text-xs size-5 font-medium flex items-center justify-center rounded-full">
              {tasks.length}
            </span>
          </hgroup>
          {title === 'To Do' && (
            <div className="bg-blue-900/10">
              <Plus className="ml-auto text-[#5030E5] p-1" />
            </div>
          )}
        </div>
      </header>
      <div className="space-y-3 flex-1 overflow-y-auto px-2 py-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

// Task Card Component

function TaskCard({ task }: { task: Task }) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-4 flex flex-col gap-2 items-stretch bg-white rounded-2xl">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium rounded-sm px-1 py-0.5 ${getPriorityColor(
            task.priority,
          )}`}
        >
          {task.priority}
        </span>
        <MoreHorizontal className="size-4 text-text-primary" />
      </div>
      <section className="flex flex-col items-start gap-1.5">
        <h4 className="text-text-primary font-semibold text-base">{task.title}</h4>
        <p className="text-xs text-text-secondary line-clamp-2">
          {task.description} lrem ipsum dolor sit
        </p>
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
        <div className="flex items-center justify-between mt-3">
          <div className="flex -space-x-1">
            <AvatarGroup users={task.users} />
          </div>
        </div>
      </section>
    </div>
  );
}
