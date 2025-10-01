'use client';

import { CustomTabTrigger } from '@/components/shared/custom-tab-trigger';
import { SearchInput } from '@/components/shared/search-input';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  type Auditor,
  type Contractor,
  type Employee,
  type Manager,
  type SubManager,
  useAdminStore,
  useDirectoryStore,
} from '@/store';

import { useState } from 'react';

import { Copy, Edit, Users } from 'lucide-react';

type UserType = Manager | SubManager | Employee | Contractor | Auditor;

export default function AdminPage() {
  const [activeMainTab, setActiveMainTab] = useState('People Management');
  const [activePeopleTab, setActivePeopleTab] = useState('Managers');

  const { managers, subManagers, auditors } = useAdminStore();
  const { employees, contractors } = useDirectoryStore();

  const peopleTabsConfig = [
    {
      value: 'Managers',
      data: managers,
      title: 'Managers',
      description: 'Here are list of managers who are also admins.',
    },
    {
      value: 'Sub-Manager',
      data: subManagers,
      title: 'Sub-Managers',
      description: 'Here are list of sub-managers with limited permissions.',
    },
    {
      value: 'Employee',
      data: employees,
      title: 'Employees',
      description: 'Here are list of employees in the system.',
    },
    {
      value: 'Contractor',
      data: contractors,
      title: 'Contractors',
      description: 'Here are list of contractors with project access.',
    },
    {
      value: 'Auditor',
      data: auditors,
      title: 'Auditors',
      description: 'Here are list of auditors with read-only permissions.',
    },
  ];

  return (
    <main className="min-h-screen bg-white flex-1 py-4">
      <div className="p-8">
        <AdminHeader />

        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <MainTabsList />

          <TabsContent value="People Management" className="space-y-6">
            <PeopleManagement
              activePeopleTab={activePeopleTab}
              setActivePeopleTab={setActivePeopleTab}
              peopleTabsConfig={peopleTabsConfig}
            />
          </TabsContent>

          <PlaceholderTabContent
            value="Dockets Management"
            title="Dockets Management"
            description="Manage dockets and their permissions here."
          />
          <PlaceholderTabContent
            value="Integrations"
            title="Integrations"
            description="Manage system integrations and API connections here."
          />
        </Tabs>
      </div>
    </main>
  );
}

const createUserColumns = <T extends UserType>() => [
  {
    key: 'name' as keyof T,
    label: 'Name',
    render: (_: unknown, user: T) => <AdminUserAvatar user={user} />,
  },
  {
    key: 'phone' as keyof T,
    label: 'Phone Number',
  },
  {
    key: 'status' as keyof T,
    label: 'Status',
    render: (status: unknown) => <StatusBadge status={status as T['status']} />,
  },
  {
    key: 'dateAdded' as keyof T,
    label: 'Date added',
  },
  {
    key: 'id' as keyof T,
    label: '',
    render: () => <ActionButtons />,
  },
];

function AdminHeader() {
  return (
    <header className="flex justify-between items-start">
      <hgroup className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Management</h1>
        <p className="text-gray-600">
          Manage your team members and their account permissions here.
        </p>
      </hgroup>
      <SearchInput />
    </header>
  );
}

function MainTabsList() {
  return (
    <TabsList className="grid w-full grid-cols-3 mb-8">
      <CustomTabTrigger value="People Management" title="People Management" />
      <CustomTabTrigger title="Dockets Management" value="Dockets Management" />
      <CustomTabTrigger value="Integrations" title="Integrations" />
    </TabsList>
  );
}

interface PeopleManagementProps {
  activePeopleTab: string;
  setActivePeopleTab: (tab: string) => void;
  peopleTabsConfig: Array<{
    value: string;
    data: UserType[];
    title: string;
    description: string;
  }>;
}

function PeopleManagement({
  activePeopleTab,
  setActivePeopleTab,
  peopleTabsConfig,
}: PeopleManagementProps) {
  const peopleTabStyle =
    'data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700';

  return (
    <Tabs value={activePeopleTab} onValueChange={setActivePeopleTab} className="w-full">
      <TabsList className="flex w-full max-w-[520px] rounded-xl">
        {peopleTabsConfig.map((tab, index) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              peopleTabStyle,
              index === 0 && 'rounded-l-lg',
              index === peopleTabsConfig.length - 1 && 'rounded-r-lg',
            )}
          >
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>

      {peopleTabsConfig.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="space-y-6">
          <AdminTable
            data={tab.data}
            columns={createUserColumns()}
            onAdd={() => {}}
            addButtonText={`Add New ${tab.value === 'Sub-Manager' ? 'Sub-Manager' : tab.value}`}
            title={tab.title}
            description={tab.description}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface PlaceholderTabContentProps {
  value: string;
  title: string;
  description: string;
}

function PlaceholderTabContent({ value, title, description }: PlaceholderTabContentProps) {
  return (
    <TabsContent value={value} className="space-y-6">
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </TabsContent>
  );
}

function AdminUserAvatar({ user }: { user: UserType }) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
        {initials}
      </div>
      <div>
        <div className="font-medium text-gray-900">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
}

function ActionButtons() {
  const buttonClass = 'p-1 text-gray-400 hover:text-gray-600';

  return (
    <div className="flex items-center gap-2">
      <button className={buttonClass}>
        <Copy className="w-4 h-4" />
      </button>
      <button className={buttonClass}>
        <Edit className="w-4 h-4" />
      </button>
    </div>
  );
}

interface AdminTableProps<T extends UserType> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (value: unknown, item: T) => React.ReactNode;
  }[];
  onAdd: () => void;
  addButtonText: string;
  title: string;
  description?: string;
}

function AdminTable<T extends UserType>({
  data,
  columns,
  onAdd,
  addButtonText,
  title,
  description,
}: AdminTableProps<T>) {
  return (
    <section className="flex gap-8">
      <hgroup>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        <Button
          onClick={onAdd}
          className="bg-primary-light text-primary hover:bg-primary/80 rounded-xs mt-4"
        >
          {addButtonText}
        </Button>
      </hgroup>

      <div className="bg-white rounded-xl border flex-1">
        <Table className="rounded-2xl">
          <TableHeader>
            <TableRow className="bg-light-bg border border-Bg-Dark">
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    column.key === 'name' ? 'w-full min-w-[180px]' : 'text-right min-w-[120px]',
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.id}
                className={cn((index + 1) % 2 === 0 ? 'bg-light-bg' : '', 'border border-Bg-Dark')}
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={cn(column.key === 'name' ? 'w-full' : 'text-right')}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
