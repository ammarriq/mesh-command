import { Plus, MoreHorizontal } from "lucide-react";
import { Project, Task } from "@/stores";
import { InfoItem } from "@/components/shared/info-item";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AvatarGroup } from "@/components/shared/avatar-group";
import { ProjectHeader } from "@/components/shared/project-header";
interface ProjectMainContentProps {
  selectedProject: Project;
  getTasksByStatus: (project: Project, status: string) => Task[];
  getPriorityColor: (priority: string) => string;
}

const ProjectMainContent: React.FC<ProjectMainContentProps> = ({
  selectedProject,
  getTasksByStatus,
  getPriorityColor,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <ProjectHeader project={selectedProject} />
      {/* 2xl and above: grid columns */}
      <section className="hidden 2xl:grid grid-cols-3 gap-2 h-full">
        <TaskColumn
          title="To Do"
          count={getTasksByStatus(selectedProject, "To Do").length}
          tasks={getTasksByStatus(selectedProject, "To Do")}
          getPriorityColor={getPriorityColor}
        />
        <TaskColumn
          title="In-Progress"
          count={getTasksByStatus(selectedProject, "In-Progress").length}
          tasks={getTasksByStatus(selectedProject, "In-Progress")}
          getPriorityColor={getPriorityColor}
        />
        <TaskColumn
          title="Completed"
          count={getTasksByStatus(selectedProject, "Completed").length}
          tasks={getTasksByStatus(selectedProject, "Completed")}
          getPriorityColor={getPriorityColor}
        />
      </section>
      {/* Below 2xl: tabs, then all columns in a row */}
      <section className="block 2xl:hidden mt-4">
        <div className="flex items-center gap-2 mb-2 w-full">
          <Tabs defaultValue="todo" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="inprogress">In-Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="todo">
              <TaskColumn
                title="To Do"
                count={getTasksByStatus(selectedProject, "To Do").length}
                tasks={getTasksByStatus(selectedProject, "To Do")}
                getPriorityColor={getPriorityColor}
              />
            </TabsContent>
            <TabsContent value="inprogress">
              <TaskColumn
                title="In-Progress"
                count={getTasksByStatus(selectedProject, "In-Progress").length}
                tasks={getTasksByStatus(selectedProject, "In-Progress")}
                getPriorityColor={getPriorityColor}
              />
            </TabsContent>
            <TabsContent value="completed">
              <TaskColumn
                title="Completed"
                count={getTasksByStatus(selectedProject, "Completed").length}
                tasks={getTasksByStatus(selectedProject, "Completed")}
                getPriorityColor={getPriorityColor}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ProjectMainContent;

// Task Column Component
function TaskColumn({
  title,
  count,
  tasks,
  getPriorityColor,
}: {
  title: string;
  count: number;
  tasks: Task[];
  getPriorityColor: (priority: string) => string;
}) {
  const getBorderColor = () => {
    switch (title) {
      case "To Do":
        return "#5030E5";
      case "In-Progress":
        return "#FFA500";
      case "Completed":
        return "#68B266";
      default:
        return "#E5E7EB";
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
                title === "To Do"
                  ? "bg-blue-500"
                  : title === "In-Progress"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            ></div>
            <h3 className="font-semibold text-text-primary">{title}</h3>
            <span className="bg-Bg-Dark text-text-secondary text-xs size-5 flex items-center justify-center rounded-full">
              {count}
            </span>
          </hgroup>

          {title === "To Do" && (
            <div className="bg-blue-900/10">
              <Plus className="ml-auto text-[#5030E5] p-1" />
            </div>
          )}
        </div>
      </header>

      <div className="space-y-3 flex-1 overflow-y-auto px-2 py-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>
    </section>
  );
}

// Task Card Component
function TaskCard({
  task,
  getPriorityColor,
}: {
  task: Task;
  getPriorityColor: (priority: string) => string;
}) {
  return (
    <div className="p-4 flex flex-col gap-2 items-stretch bg-white rounded-2xl">
      {/* Priority Badge */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium rounded-sm px-1 py-0.5 ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <MoreHorizontal className="size-4 text-text-primary" />
      </div>

      <section className="flex flex-col items-start gap-1.5">
        <h4 className="text-text-primary font-semibold text-base">
          {task.title}
        </h4>
        <p className="text-xs text-text-secondary line-clamp-2">
          {task.description} lrem ipsum dolor sit
        </p>

        <div className="space-y-2">
          <InfoItem type="user" label="Assigned to" value={task.assignedTo} />
          <InfoItem type="timer" label="Deadline" value={task.deadline} />
          {task.linkedDocs && task.linkedDocs.length > 0 && (
            <InfoItem
              type="dollar"
              label="Linked Docs"
              value={task.linkedDocs.join(", ")}
              valueClassName="text-text-primary tex-sm underline"
            />
          )}
        </div>
        {/* Avatars  */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex -space-x-1">
            <AvatarGroup
              members={task.users}
              maxVisible={5}
              size="md"
              showAddButton={true}
              onAddClick={() => console.log("Add team member")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
