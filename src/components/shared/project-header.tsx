import { InfoItem } from "@/components/shared/info-item";
import { FileText, Edit } from "lucide-react";
import { RobotMsgBadge } from "@/components/shared/robot-msg-badge";
import { Progress } from "@/components/ui/progress";
import { HalfCircleProgress } from "@/components/shared/half-circle-progress";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/shared/action-button";
import { AvatarGroup } from "@/components/shared/avatar-group";
import { Project } from "@/stores";

interface ProjectHeaderPropsWithProject {
  project: Project;
  showTeamMembers?: boolean;
  showDownloadButton?: boolean;
  onDownloadAll?: () => void;
  showOnlyAvatarGroup?: boolean; // If true, only show AvatarGroup (for Docket page)
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
  showOnlyAvatarGroup?: boolean;
}

type ProjectHeaderProps =
  | ProjectHeaderPropsWithProject
  | ProjectHeaderPropsWithDetails;

export function ProjectHeader(props: ProjectHeaderProps) {
  const {
    showTeamMembers = true,
    showDownloadButton = false,
    onDownloadAll,
    showOnlyAvatarGroup = false,
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
    <header className="px-1 bg-white">
      {/* First row: title, info, avatar group */}
      <div className="flex flex-col 2xl:flex-row 2xl:justify-between 2xl:items-center gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            <div className="flex flex-col gap-1">
              <hgroup className="flex items-center gap-4">
                <h1 className="text-2xl font-medium text-text-primary text-ellipsis overflow-hidden whitespace-nowrap max-w-80 2xl:max-w-none">
                  {title}
                </h1>
                <RobotMsgBadge
                  title={
                    status === "active"
                      ? "In-Progress"
                      : status === "completed"
                      ? "Completed"
                      : status === "on-hold"
                      ? "On-hold"
                      : status
                  }
                  status={
                    status === "active"
                      ? "in-progress"
                      : status === "completed"
                      ? "completed"
                      : status === "on-hold"
                      ? "on-hold"
                      : "default"
                  }
                  className="ml-2"
                />
              </hgroup>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-1">
                {contractor && (
                  <InfoItem type="user" label="Contractor" value={contractor} />
                )}
                {deadline && (
                  <InfoItem type="timer" label="Deadline" value={deadline} />
                )}
                {budget && (
                  <InfoItem type="dollar" label="Budget" value={budget} />
                )}
              </div>
            </div>
            {/* Team members and actions */}
            {showTeamMembers && (
              <div className="flex items-center gap-1">
                <AvatarGroup
                  members={
                    isProjectObject && props.project.users
                      ? props.project.users.map((user, idx) => ({
                          id: idx,
                          name: user.name,
                          image: user.image,
                          initials: user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join(""),
                        }))
                      : [
                          { id: 1, name: "Team Member 1", initials: "1" },
                          { id: 2, name: "Team Member 2", initials: "2" },
                          { id: 3, name: "Team Member 3", initials: "3" },
                          { id: 4, name: "Team Member 4", initials: "4" },
                          { id: 5, name: "Team Member 5", initials: "5" },
                        ]
                  }
                  maxVisible={5}
                  size="md"
                  showAddButton={true}
                  onAddClick={() => console.log("Add team member")}
                />
                {/* Only show other actions if not showOnlyAvatarGroup */}
                {!showOnlyAvatarGroup && (
                  <>
                    <ActionButton
                      icon={"notification"}
                      tooltipText="Project Comments"
                    />
                    <ActionButton
                      icon={"3-dots"}
                      tooltipText="Project Options"
                      dropdownActions={[
                        {
                          label: "Linked Dockets",
                          icon: FileText,
                          onClick: () => console.log("Open linked dockets"),
                          iconClassName: "size-4 text-red-600",
                        },
                        {
                          label: "Edit Project",
                          icon: Edit,
                          onClick: () => console.log("Edit project"),
                          iconClassName: "size-4 text-red-600",
                        },
                      ]}
                    />
                  </>
                )}
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
          </div>
        </div>
      </div>

      {/* Second row: shadcn progress bars, only visible below 2xl, hidden above */}
      <div className="flex flex-col gap-3 mt-4 2xl:hidden w-full">
        {budgetConsumed !== undefined && (
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-text-secondary">
              <Progress value={budgetConsumed} className="max-w-80" />
              <span>{budgetConsumed}% Budget Consumed</span>
            </div>
          </div>
        )}
        {progress !== undefined && (
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-text-secondary">
              <Progress value={progress} className="max-w-80" />
              <span>{progress}% Progress</span>
            </div>
          </div>
        )}
        {filingCapacity !== undefined && (
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-text-secondary">
              <span>Filing Capacity</span>
              <Progress value={filingCapacity} className="max-w-80" />
              <span>{filingCapacity}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Progress indicators for 2xl and above, placed at end */}
      <div className="hidden 2xl:flex items-center gap-2 ml-4">
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
    </header>
  );
}
