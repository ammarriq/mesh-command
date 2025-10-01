'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store';
import type { Project, ProjectCategory } from '@/store';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { SearchInput } from '../shared/search-input';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface ProjectSelectorProps {
  showCreateButton?: boolean;
  onCreateProject?: () => void;
  className?: string;
}

function ProjectSelectorTab({
  showCreateButton = false,
  onCreateProject,
  className = 'w-96 2xl:w-[496px]',
}: ProjectSelectorProps) {
  const {
    project: { categories },
  } = useAppStore();

  // Filter categories based on project status

  const getFilteredCategories = (status: 'active' | 'on-hold' | 'completed') => {
    return categories.filter((category: ProjectCategory) =>
      category.projects.some((project: Project) => project.status.toLowerCase() === status),
    );
  };

  const activeCategories = getFilteredCategories('active');
  const onHoldCategories = getFilteredCategories('on-hold');
  const completedCategories = getFilteredCategories('completed');

  return (
    <Tabs defaultValue="active" className={className}>
      <TabsList className="w-full border-r border-r-Bg-Dark h-fit">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="onhold">On-hold</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <div className="p-2 flex w-full gap-2 min-w-0">
        <SearchInput isChatTab />
        {showCreateButton && (
          <button
            onClick={onCreateProject}
            className="bg-primary w-fit py-2.5 px-6 text-sm font-medium leading-5 shadow-sm rounded-xs text-white whitespace-nowrap"
            style={{ minWidth: 0 }}
          >
            New Project
          </button>
        )}
      </div>
      <TabsContent value="active" className="p-2 flex flex-col border-r border-r-Bg-Dark gap-3">
        {activeCategories.map((category) => (
          <ProjectContentItem
            key={category.id}
            title={category.name}
            projects={category.projects.filter(
              (project) => project.status.toLowerCase() === 'active',
            )}
            showCreateButton={showCreateButton}
          />
        ))}
      </TabsContent>
      <TabsContent value="onhold" className="p-2 flex flex-col border-r border-r-Bg-Dark gap-3">
        {onHoldCategories.map((category) => (
          <ProjectContentItem
            key={category.id}
            title={category.name}
            projects={category.projects.filter(
              (project) => project.status.toLowerCase() === 'on-hold',
            )}
            showCreateButton={showCreateButton}
          />
        ))}
      </TabsContent>
      <TabsContent value="completed" className="p-2 flex flex-col border-r border-r-Bg-Dark gap-3">
        {completedCategories.map((category) => (
          <ProjectContentItem
            key={category.id}
            title={category.name}
            projects={category.projects.filter(
              (project) => project.status.toLowerCase() === 'completed',
            )}
            showCreateButton={showCreateButton}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}

interface ProjectContentItemProps {
  title: string;
  projects: Project[];
  showCreateButton?: boolean;
}

function ProjectContentItem({
  title,
  projects,
  showCreateButton = false,
}: ProjectContentItemProps) {
  const {
    project: { selectedProjectId },
    setSelectedProject,
  } = useAppStore();

  // Check if any project in this category is currently selected
  const hasSelectedProject = projects.some((project) => project.id === selectedProjectId);

  const [isOpen, setIsOpen] = useState(hasSelectedProject);

  // Update isOpen state when selectedProjectId changes
  useEffect(() => {
    setIsOpen(hasSelectedProject);
  }, [hasSelectedProject]);

  // Helper function to get status display information
  const getStatusDisplay = (status: string) => {
    // Normalize status to lowercase for logic
    const normalized = status.toLowerCase();
    switch (normalized) {
      case 'active':
        return { text: 'In-progress', color: 'text-yellow-600' };
      case 'on-hold':
        return { text: 'On-hold', color: 'text-primary' };
      case 'completed':
        return { text: 'Completed', color: 'text-green-600' };
      default:
        return { text: status, color: 'text-text-secondary' };
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 rounded-sm bg-primary text-white hover:bg-primary/90"
          >
            <ChevronDown
              className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <h4 className=" text-primary font-semibold">{title} </h4>
      </div>
      <CollapsibleContent className="flex flex-col pl-2.5 ">
        {projects.length === 0 ? (
          <div className="flex flex-col gap-2 py-2">
            <p className="text-sm text-text-secondary">No project available.</p>
            {showCreateButton && (
              <button className="bg-primary py-2 px-4 text-sm font-medium leading-5 shadow-sm rounded-xs text-white w-fit">
                Create new project
              </button>
            )}
          </div>
        ) : (
          projects.map((project) => {
            const statusInfo = getStatusDisplay(project.status);
            return (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`text-sm rounded-xs text-left flex items-center gap-1 text-text-primary ${
                  selectedProjectId === project.id ? 'bg-Bg-Dark p-2' : ''
                }`}
              >
                <span>{project.title}</span>
                <span className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</span>
              </button>
            );
          })
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default ProjectSelectorTab;
