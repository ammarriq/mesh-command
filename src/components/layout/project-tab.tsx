"use client";

import ProjectSelector from "../shared/project-selector";

function ProjectTab() {
  function createNewProject() {
    // Implementation for creating new project
    console.log("Create new project");
  }

  return (
    <ProjectSelector
      showCreateButton={true}
      onCreateProject={createNewProject}
    />
  );
}

export default ProjectTab;
