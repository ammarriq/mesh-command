'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store';
import type { Project, ProjectCategory } from '@/store';

import { CustomTabTrigger } from '../shared/chat-tab-trigger';
import ProjectContentItem from '../shared/project-content-item';
import { SearchInput } from '../shared/search-input';
import TabActions from '../shared/tab-actions';

interface ProjectSelectorProps {
  showCreateButton?: boolean;
  onCreateProject?: () => void;
  className?: string;
}

export default function ProjectSelectorTab({
  showCreateButton = false,
  onCreateProject,
  className = 'w-96 2xl:w-[496px]',
}: ProjectSelectorProps) {
  const {
    project: { categories },
  } = useAppStore();

  const tabsConfig = getTabsConfig();

  return (
    <Tabs defaultValue="active" className={className}>
      <TabsList className="w-full border-r border-r-Bg-Dark h-fit">
        {tabsConfig.map((tab) => (
          <CustomTabTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </CustomTabTrigger>
        ))}
      </TabsList>

      <TabActions showCreateButton={showCreateButton} type="project" />

      {tabsConfig.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="p-2 flex flex-col border-r border-r-Bg-Dark gap-3"
        >
          <ProjectCategoriesList
            categories={categories}
            status={tab.status}
            showCreateButton={showCreateButton}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}

const getTabsConfig = () => [
  { value: 'active', label: 'Active', status: 'active' as const },
  { value: 'onhold', label: 'On-hold', status: 'on-hold' as const },
  { value: 'completed', label: 'Completed', status: 'completed' as const },
];

interface ProjectCategoriesListProps {
  categories: ProjectCategory[];
  status: 'active' | 'on-hold' | 'completed';
  showCreateButton?: boolean;
}

function ProjectCategoriesList({
  categories,
  status,
  showCreateButton,
}: ProjectCategoriesListProps) {
  const filteredCategories = getFilteredCategories(categories, status);

  return (
    <>
      {filteredCategories.map((category) => (
        <ProjectContentItem
          key={category.id}
          title={category.name}
          projects={getFilteredProjects(category.projects, status)}
          showCreateButton={showCreateButton}
        />
      ))}
    </>
  );
}

function getFilteredCategories(
  categories: ProjectCategory[],
  status: 'active' | 'on-hold' | 'completed',
) {
  return categories.filter((category) =>
    category.projects.some((project) => project.status.toLowerCase() === status),
  );
}

function getFilteredProjects(projects: Project[], status: 'active' | 'on-hold' | 'completed') {
  return projects.filter((project) => project.status.toLowerCase() === status);
}
