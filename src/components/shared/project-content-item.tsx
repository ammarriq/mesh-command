'use client';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAppStore } from '@/store';
import type { Project } from '@/store';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ChevronDown } from 'lucide-react';

interface ProjectContentItemProps {
  title: string;
  projects: Project[];
  showCreateButton?: boolean;
  isChatTab?: boolean;
}

function ProjectContentItem({
  title,
  projects,
  showCreateButton = false,
  isChatTab = false,
}: ProjectContentItemProps) {
  const {
    project: { selectedProjectId },
    chat: { isSplitScreen },
    setSelectedProject,
  } = useAppStore();
  const router = useRouter();

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);

    if (isChatTab && !isSplitScreen) {
      router.push('/projects');
    }
  };

  const hasSelectedProject = projects.some((project) => project.id === selectedProjectId);
  const [isCategoryOpen, setIsCategoryOpen] = useState(hasSelectedProject);

  useEffect(() => {
    setIsCategoryOpen(hasSelectedProject);
  }, [hasSelectedProject]);

  const getStatusDisplay = (status: string) => {
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
    <Collapsible
      open={isCategoryOpen}
      onOpenChange={setIsCategoryOpen}
      className={`flex w-full flex-col ${isChatTab ? 'gap-3' : 'gap-2'}`}
    >
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 rounded-sm bg-primary text-white hover:bg-primary/90"
          >
            <ChevronDown
              className={`transition-transform duration-200 ${
                isCategoryOpen ? 'rotate-0' : 'rotate-180'
              }`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <h4 className="text-primary font-semibold">{title}</h4>
      </div>
      <CollapsibleContent className={`flex flex-col pl-2.5 ${isChatTab ? 'gap-1' : ''}`}>
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
          <div>
            {projects.map((project) => {
              const statusInfo = getStatusDisplay(project.status);
              return (
                <button
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className={`text-sm rounded-xs text-left flex items-center gap-1 text-text-primary ${
                    isChatTab ? 'px-2 py-1.5 w-full' : ''
                  } ${selectedProjectId === project.id ? 'bg-Bg-Dark p-2' : ''}`}
                >
                  <span>{project.title}</span>
                  {!isChatTab && (
                    <span className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default ProjectContentItem;
