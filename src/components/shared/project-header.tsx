import { ActionButton } from '@/components/shared/action-button';
import { AvatarGroup } from '@/components/shared/avatar-group';
import { HalfCircleProgress } from '@/components/shared/half-circle-progress';
import { InfoItem } from '@/components/shared/info-item';
import { RobotMsgBadge } from '@/components/shared/robot-msg-badge';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/store';

interface ProjectHeaderProps {
  project: Project;
  showTeamMembers?: boolean;
  showDownloadButton?: boolean;
  onDownloadAll?: () => void;
  showOnlyAvatarGroup?: boolean; // If true, only show AvatarGroup (for Docket page)
}

export function ProjectHeader({
  project,
  showTeamMembers = true,
  showOnlyAvatarGroup = false,
}: ProjectHeaderProps) {
  const budgetConsumed = 40;
  const progress = Math.round(
    (project.completed.length /
      (project.todo.length + project.inProgress.length + project.completed.length)) *
      100,
  );
  const filingCapacity = undefined;

  return (
    <header className="px-1 bg-white ">
      {/* First row: title, info, progress, avatar group */}
      <section className="flex flex-col 2xl:flex-row 2xl:justify-between 2xl:items-center gap-4">
        <div className="flex flex-col gap-1">
          <hgroup className="flex items-center gap-4">
            <h1 className="text-2xl font-medium text-text-primary text-ellipsis overflow-hidden whitespace-nowrap max-w-80 2xl:max-w-none">
              {project.title}
            </h1>
            <RobotMsgBadge
              title={
                project.status === 'Active'
                  ? 'In-Progress'
                  : project.status === 'Completed'
                    ? 'Completed'
                    : project.status === 'On-Hold'
                      ? 'On-hold'
                      : project.status
              }
              status={
                project.status === 'Active'
                  ? 'in-progress'
                  : project.status === 'Completed'
                    ? 'completed'
                    : project.status === 'On-Hold'
                      ? 'on-hold'
                      : 'default'
              }
              className="ml-2"
            />
          </hgroup>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-1">
            {project.contractor && (
              <InfoItem type="user" label="Contractor" value={project.contractor} />
            )}
            {project.deadline && (
              <InfoItem type="timer" label="Deadline" value={project.deadline} />
            )}
            {project.budget && <InfoItem type="dollar" label="Budget" value={project.budget} />}
          </div>
        </div>
        {/* Progress indicators for 2xl and above, placed before avatar group */}
        <div className="ml-auto hidden 2xl:flex items-center gap-2 ">
          {budgetConsumed !== undefined && (
            <HalfCircleProgress value={budgetConsumed} label="Budget Consumed" size="md" />
          )}
          {progress !== undefined && (
            <HalfCircleProgress value={progress} label="Progress" size="md" />
          )}
          {filingCapacity !== undefined && (
            <HalfCircleProgress value={filingCapacity} label="Filing Capacity" size="md" />
          )}
        </div>
        {showTeamMembers && (
          <div className="flex items-center gap-1">
            <AvatarGroup users={project.users && project.users.length > 0 ? project.users : []} />
            {!showOnlyAvatarGroup && (
              <>
                <ActionButton type={'notification'} size={8} />
                <ActionButton
                  type={'3-dots'}
                  size={8}
                  // dropdownActions={[
                  //   {
                  //     label: 'Linked Dockets',
                  //     icon: FileText,
                  //     onClick: () => console.log('Open linked dockets'),
                  //     iconClassName: 'size-4 text-red-600',
                  //   },
                  //   {
                  //     label: 'Edit Project',
                  //     icon: Edit,
                  //     onClick: () => console.log('Edit project'),
                  //     iconClassName: 'size-4 text-red-600',
                  //   },
                  // ]}
                />
              </>
            )}
          </div>
        )}
      </section>

      {/* Second row: shadcn progress bars, only visible below 2xl, hidden above */}
      <section className="flex flex-col gap-3 mt-4 2xl:hidden w-full">
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
      </section>
    </header>
  );
}
