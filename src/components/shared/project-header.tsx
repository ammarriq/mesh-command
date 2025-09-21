import { Calendar, DollarSign, User, Plus } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { CircularProgress } from "@/components/shared/circular-progress";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
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

export function ProjectHeader({
  title,
  status,
  deadline,
  budget,
  contractor,
  budgetConsumed,
  progress,
  filingCapacity,
  showTeamMembers = true,
  showDownloadButton = false,
  onDownloadAll,
}: ProjectHeaderProps) {
  return (
    <div className="border-b border-gray-200 p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center gap-4 text-sm">
          {contractor && (
            <div className="flex items-center gap-2">
              <User className="size-4 text-gray-500" />
              <span className="text-gray-600">Contractor: {contractor}</span>
            </div>
          )}

          {deadline && (
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-gray-500" />
              <span className="text-gray-600">Deadline: {deadline}</span>
            </div>
          )}

          {budget && (
            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-gray-500" />
              <span className="text-gray-600">Budget: {budget}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Progress Indicators */}
        {budgetConsumed !== undefined && (
          <CircularProgress
            value={budgetConsumed}
            label="Budget Consumed"
            size="md"
          />
        )}

        {progress !== undefined && (
          <CircularProgress value={progress} label="Progress" size="md" />
        )}

        {filingCapacity !== undefined && (
          <CircularProgress
            value={filingCapacity}
            label="Filing Capacity"
            size="md"
          />
        )}

        {/* Team members */}
        {showTeamMembers && (
          <div className="flex -space-x-2 ml-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"
              />
            ))}
            <div className="w-10 h-10 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
              <Plus className="size-5 text-white" />
            </div>
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
  );
}
