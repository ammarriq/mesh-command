"use client";

import { useState } from "react";
import { Copy, Edit, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import { SearchInput } from "@/components/shared/search-input";
import { CustomTabTrigger } from "@/components/shared/custom-tab-trigger";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  useAdminStore,
  useDirectoryStore,
  type Manager,
  type SubManager,
  type Employee,
  type Contractor,
  type Auditor,
} from "@/stores";

import { cn } from "@/lib/utils";

// Manager columns configuration
const managerColumns = [
  {
    key: "name" as keyof Manager,
    label: "Name",
    render: (_: unknown, manager: Manager) => (
      <AdminUserAvatar user={manager} />
    ),
  },
  {
    key: "phone" as keyof Manager,
    label: "Phone Number",
  },
  {
    key: "status" as keyof Manager,
    label: "Status",
    render: (status: unknown) => (
      <StatusBadge status={status as Manager["status"]} />
    ),
  },
  {
    key: "dateAdded" as keyof Manager,
    label: "Date added",
  },
  {
    key: "id" as keyof Manager,
    label: "",
    render: () => <ActionButtons />,
  },
];

// Sub-Manager columns (same structure as Manager)
const subManagerColumns = [
  {
    key: "name" as keyof SubManager,
    label: "Name",
    render: (_: unknown, subManager: SubManager) => (
      <AdminUserAvatar user={subManager} />
    ),
  },
  {
    key: "phone" as keyof SubManager,
    label: "Phone Number",
  },
  {
    key: "status" as keyof SubManager,
    label: "Status",
    render: (status: unknown) => (
      <StatusBadge status={status as SubManager["status"]} />
    ),
  },
  {
    key: "dateAdded" as keyof SubManager,
    label: "Date added",
  },
  {
    key: "id" as keyof SubManager,
    label: "",
    render: () => <ActionButtons />,
  },
];

// Employee columns (reuse from directory with admin styling)
const employeeColumns = [
  {
    key: "name" as keyof Employee,
    label: "Name",
    render: (_: unknown, employee: Employee) => (
      <AdminUserAvatar user={employee} />
    ),
  },
  {
    key: "phone" as keyof Employee,
    label: "Phone Number",
  },
  {
    key: "status" as keyof Employee,
    label: "Status",
    render: (status: unknown) => (
      <StatusBadge status={status as Employee["status"]} />
    ),
  },
  {
    key: "dateAdded" as keyof Employee,
    label: "Date added",
  },
  {
    key: "id" as keyof Employee,
    label: "",
    render: () => <ActionButtons />,
  },
];

// Contractor columns (reuse from directory with admin styling)
const contractorColumns = [
  {
    key: "name" as keyof Contractor,
    label: "Name",
    render: (_: unknown, contractor: Contractor) => (
      <AdminUserAvatar user={contractor} />
    ),
  },
  {
    key: "phone" as keyof Contractor,
    label: "Phone Number",
  },
  {
    key: "status" as keyof Contractor,
    label: "Status",
    render: (status: unknown) => (
      <StatusBadge status={status as Contractor["status"]} />
    ),
  },
  {
    key: "dateAdded" as keyof Contractor,
    label: "Date added",
  },
  {
    key: "id" as keyof Contractor,
    label: "",
    render: () => <ActionButtons />,
  },
];

// Auditor columns
const auditorColumns = [
  {
    key: "name" as keyof Auditor,
    label: "Name",
    render: (_: unknown, auditor: Auditor) => (
      <AdminUserAvatar user={auditor} />
    ),
  },
  {
    key: "phone" as keyof Auditor,
    label: "Phone Number",
  },
  {
    key: "status" as keyof Auditor,
    label: "Status",
    render: (status: unknown) => (
      <StatusBadge status={status as Auditor["status"]} />
    ),
  },
  {
    key: "dateAdded" as keyof Auditor,
    label: "Date added",
  },
  {
    key: "id" as keyof Auditor,
    label: "",
    render: () => <ActionButtons />,
  },
];

export default function AdminPage() {
  const [activeMainTab, setActiveMainTab] = useState("People Management");
  const [activePeopleTab, setActivePeopleTab] = useState("Managers");

  const { managers, subManagers, auditors } = useAdminStore();
  const { employees, contractors } = useDirectoryStore();

  return (
    <main className="min-h-screen bg-white flex-1 py-4 ">
      <div className="p-8">
        {/* Header */}
        <header className="flex justify-between items-start">
          <hgroup className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Admin Management
            </h1>
            <p className="text-gray-600">
              Manage your team members and their account permissions here.
            </p>
          </hgroup>
          <SearchInput />
        </header>

        {/* Main Tabs */}
        <Tabs
          value={activeMainTab}
          onValueChange={setActiveMainTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 w">
            <CustomTabTrigger
              value="People Management"
              title="People Management"
            />
            <CustomTabTrigger
              title="Dockets Management"
              value="Dockets Management"
            />
            <CustomTabTrigger value="Integrations" title="Integrations" />
          </TabsList>

          {/* People Management Tab */}
          <TabsContent value="People Management" className="space-y-6">
            {/* People Sub-tabs */}
            <Tabs
              value={activePeopleTab}
              onValueChange={setActivePeopleTab}
              className="w-full"
            >
              <TabsList className="flex w-full max-w-[520px] rounded-xl">
                <TabsTrigger
                  value="Managers"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700 rounded-l-lg"
                  )}
                >
                  Managers
                </TabsTrigger>
                <TabsTrigger
                  value="Sub-Manager"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700"
                  )}
                >
                  Sub-Manager
                </TabsTrigger>
                <TabsTrigger
                  value="Employee"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700"
                  )}
                >
                  Employee
                </TabsTrigger>
                <TabsTrigger
                  value="Contractor"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700"
                  )}
                >
                  Contractor
                </TabsTrigger>
                <TabsTrigger
                  value="Auditor"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700 rounded-r-lg"
                  )}
                >
                  Auditor
                </TabsTrigger>
              </TabsList>

              {/* Managers Tab */}
              <TabsContent value="Managers" className="space-y-6">
                <AdminTable
                  data={managers}
                  columns={managerColumns}
                  onAdd={() => {
                    /* Add Manager functionality */
                  }}
                  addButtonText="Add New Manager"
                  title="Managers"
                  description="Here are list of managers who are also admins."
                />
              </TabsContent>

              {/* Sub-Manager Tab */}
              <TabsContent value="Sub-Manager" className="space-y-6">
                <AdminTable
                  data={subManagers}
                  columns={subManagerColumns}
                  onAdd={() => {
                    /* Add Sub-Manager functionality */
                  }}
                  addButtonText="Add New Sub-Manager"
                  title="Sub-Managers"
                  description="Here are list of sub-managers with limited permissions."
                />
              </TabsContent>

              {/* Employee Tab */}
              <TabsContent value="Employee" className="space-y-6">
                <AdminTable
                  data={employees}
                  columns={employeeColumns}
                  onAdd={() => {
                    /* Add Employee functionality */
                  }}
                  addButtonText="Add New Employee"
                  title="Employees"
                  description="Here are list of employees in the system."
                />
              </TabsContent>

              {/* Contractor Tab */}
              <TabsContent value="Contractor" className="space-y-6">
                <AdminTable
                  data={contractors}
                  columns={contractorColumns}
                  onAdd={() => {
                    /* Add Contractor functionality */
                  }}
                  addButtonText="Add New Contractor"
                  title="Contractors"
                  description="Here are list of contractors with project access."
                />
              </TabsContent>

              {/* Auditor Tab */}
              <TabsContent value="Auditor" className="space-y-6">
                <AdminTable
                  data={auditors}
                  columns={auditorColumns}
                  onAdd={() => {
                    /* Add Auditor functionality */
                  }}
                  addButtonText="Add New Auditor"
                  title="Auditors"
                  description="Here are list of auditors with read-only permissions."
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Dockets Management Tab */}
          <TabsContent value="Dockets Management" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Dockets Management
              </h3>
              <p className="text-gray-600">
                Manage dockets and their permissions here.
              </p>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="Integrations" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Integrations
              </h3>
              <p className="text-gray-600">
                Manage system integrations and API connections here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

// Admin User Avatar Component
function AdminUserAvatar({
  user,
}: {
  user: Manager | SubManager | Employee | Contractor | Auditor;
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <main className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
        {initials}
      </div>
      <div>
        <div className="font-medium text-gray-900">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </main>
  );
}

// Action Buttons Component
function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <button className="p-1 text-gray-400 hover:text-gray-600">
        <Copy className="w-4 h-4" />
      </button>
      <button className="p-1 text-gray-400 hover:text-gray-600">
        <Edit className="w-4 h-4" />
      </button>
    </div>
  );
}

// Admin Table Component
interface AdminTableProps<T> {
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

function AdminTable<T extends { id: number; name: string; email?: string }>({
  data,
  columns,
  onAdd,
  addButtonText,
  title,
  description,
}: AdminTableProps<T>) {
  return (
    <section className="flex gap-8">
      {/* Section Header */}
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

      {/* Table */}
      <div className="bg-white rounded-xl border flex-1">
        <Table className="rounded-2xl">
          <TableHeader>
            <TableRow className="bg-light-bg border border-Bg-Dark">
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    column.key === "name"
                      ? "w-full min-w-[180px]"
                      : "text-right min-w-[120px]"
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
                className={
                  (cn((index + 1) % 2 === 0 ? "bg-light-bg " : ""),
                  "border border-Bg-Dark")
                }
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={cn(
                      column.key === "name" ? "w-full" : "text-right"
                    )}
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
