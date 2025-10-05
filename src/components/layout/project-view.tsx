'use client';

import { useAppStore } from '@/store';
import type { Project } from '@/store';

import { AlertCircle, Calendar, CheckCircle, Clock, DollarSign, User } from 'lucide-react';

import Pill from '../shared/pill';
import { Separator } from '../ui/separator';

export default function ProjectView() {
  const {
    project: { selectedProjectId },
  } = useAppStore();

  const selectedProject = getSelectedProject(selectedProjectId);

  if (!selectedProject) {
    return <EmptyState />;
  }

  return (
    <section className="flex w-full flex-col">
      <ProjectHeader project={selectedProject} />
      <ProjectContent project={selectedProject} />
    </section>
  );
}

function getSelectedProject(selectedProjectId: number | null): Project | null {
  return selectedProjectId
    ? {
        id: selectedProjectId,
        title: 'Sample Project',
        status: 'Active',
        deadline: '2024-12-31',
        budget: '$50k',
        contractor: 'ABC Construction',
        todo: [],
        inProgress: [],
        completed: [],
      }
    : null;
}

function EmptyState() {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <p className="text-text-secondary">Select a project to view details</p>
    </section>
  );
}

interface ProjectHeaderProps {
  project: Project;
}

function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="border-b border-b-Bg-Dark px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon(project.status)}
          <div>
            <h1 className="text-lg font-semibold text-text-primary">{project.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Pill title={project.status} />
              <span className="text-xs text-text-secondary">40% Budget Consumed</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

interface ProjectContentProps {
  project: Project;
}

function ProjectContent({ project }: ProjectContentProps) {
  const budgetInfo = getBudgetConsumption(project);
  const infoCards = getInfoCardsConfig(project);
  const actions = getActionsConfig();
  const activities = getRecentActivities(project);

  return (
    <section className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        <InfoCardsGrid cards={infoCards} />
        <Separator className="bg-Bg-Dark" />
        <ProjectDescription project={project} />
        <Separator className="bg-Bg-Dark" />
        <BudgetOverview project={project} budgetInfo={budgetInfo} />
        <Separator className="bg-Bg-Dark" />
        <ProjectActions actions={actions} />
        <RecentActivity activities={activities} />
      </div>
    </section>
  );
}

function getInfoCardsConfig(project: Project) {
  return [
    { icon: Calendar, label: 'Deadline', value: project.deadline || '' },
    { icon: DollarSign, label: 'Budget', value: project.budget || '' },
    { icon: User, label: 'Assigned To', value: project.contractor || '' },
    { icon: User, label: 'Contractor', value: project.contractor || '' },
  ];
}

function getActionsConfig() {
  return [
    { label: 'Update Status', variant: 'primary' as const },
    { label: 'View Timeline', variant: 'secondary' as const },
    { label: 'Export Report', variant: 'outline' as const },
  ];
}

function getRecentActivities(project: Project) {
  return [
    {
      message: `Status updated to ${project.status}`,
      time: '2 hours ago',
      color: 'bg-green-500',
    },
    {
      message: 'Budget review completed',
      time: '1 day ago',
      color: 'bg-blue-500',
    },
    {
      message: 'New contractor assigned',
      time: '3 days ago',
      color: 'bg-orange-500',
    },
  ];
}

function getStatusIcon(status: string) {
  const iconMap: Record<string, React.ReactElement> = {
    Completed: <CheckCircle className="size-5 text-green-600" />,
    'In-Progress': <Clock className="size-5 text-blue-600" />,
    'To-Do': <AlertCircle className="size-5 text-orange-600" />,
  };
  return iconMap[status] || <Clock className="size-5 text-gray-600" />;
}

function getBudgetConsumption(project: Project) {
  const budgetNum = project.budget ? parseInt(project.budget.replace(/[^\d]/g, '')) : 50;
  const consumed = Math.floor(budgetNum * 0.4);
  return {
    consumed: `$${consumed}k`,
    percentage: 40,
  };
}

interface InfoCardsGridProps {
  cards: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
  }>;
}

function InfoCardsGrid({ cards }: InfoCardsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <InfoCard key={card.label} {...card} />
      ))}
    </div>
  );
}

interface InfoCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="bg-light-bg p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="size-4 text-primary" />
        <span className="text-sm font-medium text-text-primary">{label}</span>
      </div>
      <p className="text-text-primary font-semibold">{value}</p>
    </div>
  );
}

interface ProjectDescriptionProps {
  project: Project;
}

function ProjectDescription({ project }: ProjectDescriptionProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">Description</h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        Project status: {project.status} | Budget: {project.budget} | Deadline: {project.deadline}
      </p>
    </div>
  );
}

interface BudgetOverviewProps {
  project: Project;
  budgetInfo: {
    consumed: string;
    percentage: number;
  };
}

function BudgetOverview({ project, budgetInfo }: BudgetOverviewProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary">Budget Overview</h3>
      <div className="bg-light-bg p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">Budget Consumed</span>
          <span className="text-sm font-semibold text-text-primary">
            {budgetInfo.consumed} / {project.budget}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${budgetInfo.percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {budgetInfo.percentage}% of total budget utilized
        </p>
      </div>
    </div>
  );
}

interface ProjectActionsProps {
  actions: Array<{
    label: string;
    variant: 'primary' | 'secondary' | 'outline';
  }>;
}

function ProjectActions({ actions }: ProjectActionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary">Actions</h3>
      <div className="flex gap-2">
        {actions.map((action) => (
          <ActionButton key={action.label} {...action} />
        ))}
      </div>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'outline';
}

function ActionButton({ label, variant }: ActionButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors';
      case 'secondary':
        return 'px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary/5 transition-colors';
      case 'outline':
        return 'px-4 py-2 border border-gray-300 text-text-secondary text-sm font-medium rounded-md hover:bg-gray-50 transition-colors';
    }
  };

  return <button className={getVariantClasses()}>{label}</button>;
}

interface RecentActivityProps {
  activities: Array<{
    message: string;
    time: string;
    color: string;
  }>;
}

function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}

interface ActivityItemProps {
  message: string;
  time: string;
  color: string;
}

function ActivityItem({ message, time, color }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 p-2 bg-light-bg rounded">
      <div className={`w-2 h-2 ${color} rounded-full`}></div>
      <div>
        <p className="text-sm text-text-primary">{message}</p>
        <p className="text-xs text-text-secondary">{time}</p>
      </div>
    </div>
  );
}
