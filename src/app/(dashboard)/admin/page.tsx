"use client";

import { useState } from "react";
import { Search, Copy, Edit, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  useAppStore,
  type Manager,
  type SubManager,
  type Employee,
  type Contractor,
  type Auditor,
} from "@/stores/app-store";
import { cn } from "@/lib/utils";

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
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
      </div>

      {/* Add Button */}
      <Button
        onClick={onAdd}
        className="bg-red-100 text-red-600 hover:bg-red-200"
      >
        {addButtonText}
      </Button>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className="text-left p-4 text-sm font-medium text-gray-600"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="p-4 text-sm">
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { managers, subManagers, employees, contractors, auditors } =
    useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMainTab, setActiveMainTab] = useState("People Management");
  const [activePeopleTab, setActivePeopleTab] = useState("Managers");

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Admin Management
          </h1>
          <p className="text-gray-600">
            Manage your team members and their account permissions here.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs
          value={activeMainTab}
          onValueChange={setActiveMainTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-md">
            <TabsTrigger
              value="People Management"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              People Management
            </TabsTrigger>
            <TabsTrigger
              value="Dockets Management"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Dockets Management
            </TabsTrigger>
            <TabsTrigger
              value="Integrations"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* People Management Tab */}
          <TabsContent value="People Management" className="space-y-6">
            {/* People Sub-tabs */}
            <Tabs
              value={activePeopleTab}
              onValueChange={setActivePeopleTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger
                  value="Managers"
                  className={cn(
                    "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
                  )}
                >
                  Managers
                </TabsTrigger>
                <TabsTrigger
                  value="Sub-Manager"
                  className={cn(
                    "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
                  )}
                >
                  Sub-Manager
                </TabsTrigger>
                <TabsTrigger
                  value="Employee"
                  className={cn(
                    "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
                  )}
                >
                  Employee
                </TabsTrigger>
                <TabsTrigger
                  value="Contractor"
                  className={cn(
                    "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
                  )}
                >
                  Contractor
                </TabsTrigger>
                <TabsTrigger
                  value="Auditor"
                  className={cn(
                    "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
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
    </div>
  );
}
