import { Calendar, DollarSign, User, Plus } from "lucide-react";
import { HalfCircleProgress } from "@/components/shared/half-circle-progress";
import { Button } from "@/components/ui/button";
import { InfoItem } from "@/components/shared/info-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project } from "@/stores";

interface ProjectHeaderPropsWithProject {
  project: Project;
  showTeamMembers?: boolean;
  showDownloadButton?: boolean;
  onDownloadAll?: () => void;
}

interface ProjectHeaderPropsWithDetails {
  title: string;
  status: string;
  deadline?: string;
  budget?: string;
  contractor?: string;
  budgetConsumed?: number;
  progress?: number;
  filingCapacity?: number;
  showTeamMembers?: boolean;
  showDownloadButton?: boolean;
  onDownloadAll?: () => void;
}

type ProjectHeaderProps =
  | ProjectHeaderPropsWithProject
  | ProjectHeaderPropsWithDetails;

export function ProjectHeader(props: ProjectHeaderProps) {
  const {
    showTeamMembers = true,
    showDownloadButton = false,
    onDownloadAll,
  } = props;

  // Check if props contains a project object
  const isProjectObject = "project" in props;

  const title = isProjectObject ? props.project.title : props.title;
  const status = isProjectObject ? props.project.status : props.status;
  const deadline = isProjectObject ? props.project.deadline : props.deadline;
  const budget = isProjectObject ? props.project.budget : props.budget;
  const contractor = isProjectObject
    ? props.project.contractor
    : props.contractor;

  // For project object, calculate progress from tasks
  const budgetConsumed = isProjectObject ? 40 : props.budgetConsumed;
  const progress = isProjectObject
    ? Math.round(
        (props.project.completed.length /
          (props.project.todo.length +
            props.project.inProgress.length +
            props.project.completed.length)) *
          100
      )
    : props.progress;
  const filingCapacity = isProjectObject ? undefined : props.filingCapacity;

  return (
    <header className="p-6 bg-white flex flex-col 2xl:flex-row justify-between 2xl:items-center gap-6">
      <section className="flex flex-col gap-2">
        <hgroup className="flex items-center gap-4">
          <h1 className="text-2xl font-medium text-text-primary">{title}</h1>
          <span className="px-2 py-0.5 bg-[#FFDD98] text-[#A17800] font-semibold text-xs">
            {status}
          </span>
        </hgroup>

        <div className="flex items-center gap-4 text-sm">
          {contractor && (
            <InfoItem icon={User} label="Contractor" value={contractor} />
          )}

          {deadline && (
            <InfoItem icon={Calendar} label="Deadline" value={deadline} />
          )}

          {budget && (
            <InfoItem icon={DollarSign} label="Budget" value={budget} />
          )}
        </div>
      </section>

      <section className="flex items-center justify-between gap-2">
        {/* Progress Indicators */}
        <div className="flex items-center gap-2">
          {budgetConsumed !== undefined && (
            <HalfCircleProgress
              value={budgetConsumed}
              label="Budget Consumed"
              size="md"
            />
          )}

          {progress !== undefined && (
            <HalfCircleProgress value={progress} label="Progress" size="md" />
          )}

          {filingCapacity !== undefined && (
            <HalfCircleProgress
              value={filingCapacity}
              label="Filing Capacity"
              size="md"
            />
          )}
        </div>

        {/* Team members */}
        {showTeamMembers && (
          <div className="flex -space-x-2 ml-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Avatar
                key={i}
                className="w-10 h-10 rounded-none border-2 border-white"
              >
                <AvatarImage src="" alt={`Team member ${i}`} />
                <AvatarFallback className="bg-gray-50 rounded-none">
                  {i}
                </AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="w-10 h-10 bg-primary rounded-none border-2 border-white">
              <AvatarFallback className="bg-primary rounded-none">
                <Plus className="size-5 text-white" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Download all button */}
        {showDownloadButton && (
          <div className="ml-auto">
            <Button variant="outline" onClick={onDownloadAll}>
              Download all
            </Button>
          </div>
        )}
      </section>
    </header>
  );
}
