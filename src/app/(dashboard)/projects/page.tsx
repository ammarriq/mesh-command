'use client';

import ProjectMainContent from '@/components/layout/project-main-content';
import ProjectSelectorTab from '@/components/layout/project-tab';
import { useSelectedProject } from '@/store';

export default function ProjectsPage() {
  const selectedProject = useSelectedProject();

  return (
    <section className="bg-white flex-1 py-4 pr-4 flex">
      <ProjectSelectorTab showCreateButton={true} onCreateProject={createNewProject} />
      {selectedProject ? <ProjectMainContent selectedProject={selectedProject} /> : <EmptyState />}
    </section>
  );
}

function createNewProject() {
  // TODO: Implement project creation logic
}

function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Select a project to view details</p>
    </div>
  );
}
