'use client';

import ProjectSelectorTab from '@/components/layout/project-selector-tab';
import { useSelectedProject } from '@/store';

import ProjectMainContent from '../../../components/layout/ProjectMainContent';

function ProjectsPage() {
  const selectedProject = useSelectedProject();

  function createNewProject() {}

  if (!selectedProject) {
    return (
      <section className="bg-white flex-1 py-4 pr-4 grid grid-cols-[1fr_auto]">
        {/* Left Sidebar - Project List */}
        <ProjectSelectorTab showCreateButton={true} onCreateProject={createNewProject} />

        {/* Main Content - No Project Selected */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a project to view details</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white flex-1 py-4 pr-4 flex">
      <ProjectSelectorTab showCreateButton={true} onCreateProject={createNewProject} />
      <ProjectMainContent selectedProject={selectedProject} />
    </section>
  );
}

export default ProjectsPage;
