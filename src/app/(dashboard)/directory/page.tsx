"use client";

import { useState } from "react";
import { Copy, Edit, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  useDirectoryStore,
  type Employee,
  type Contractor,
  type Team,
  type Vendor,
  type Equipment,
  type Location,
} from "@/stores";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/shared/search-input";
import { CustomTabTrigger } from "@/components/shared/custom-tab-trigger";

// Directory Table Component
interface DirectoryTableProps<T> {
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

function DirectoryTable<T extends { id: number; name: string }>({
  data,
  columns,
  onAdd,
  addButtonText,
  title,
  description,
}: DirectoryTableProps<T>) {
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

// Directory User Avatar Component
function DirectoryUserAvatar({
  user,
}: {
  user: Employee | Contractor | Team | Vendor;
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

export default function DirectoryPage() {
  const { employees, contractors, teams, vendors, equipments, locations } =
    useDirectoryStore();
  const [activeMainTab, setActiveMainTab] = useState("People Management");
  const [activePeopleTab, setActivePeopleTab] = useState("Employees");

  // Employee columns configuration
  const employeeColumns = [
    {
      key: "name" as keyof Employee,
      label: "Name",
      render: (_: unknown, employee: Employee) => (
        <DirectoryUserAvatar user={employee} />
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
      key: "lastActive" as keyof Employee,
      label: "Last active",
    },
    {
      key: "id" as keyof Employee,
      label: "",
      render: () => <ActionButtons />,
    },
  ];

  // Contractor columns configuration
  const contractorColumns = [
    {
      key: "name" as keyof Contractor,
      label: "Name",
      render: (_: unknown, contractor: Contractor) => (
        <DirectoryUserAvatar user={contractor} />
      ),
    },
    {
      key: "phone" as keyof Contractor,
      label: "Phone Number",
    },
    {
      key: "projectCount" as keyof Contractor,
      label: "# of projects",
    },
    {
      key: "type" as keyof Contractor,
      label: "Type",
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
      key: "lastActive" as keyof Contractor,
      label: "Last active",
    },
    {
      key: "id" as keyof Contractor,
      label: "",
      render: () => <ActionButtons />,
    },
  ];

  // Team columns configuration
  const teamColumns = [
    {
      key: "name" as keyof Team,
      label: "Name",
      render: (_: unknown, team: Team) => <DirectoryUserAvatar user={team} />,
    },
    {
      key: "memberCount" as keyof Team,
      label: "# of Members",
    },
    {
      key: "department" as keyof Team,
      label: "Department",
    },
    {
      key: "status" as keyof Team,
      label: "Status",
      render: (status: unknown) => (
        <StatusBadge status={status as Team["status"]} />
      ),
    },
    {
      key: "dateAdded" as keyof Team,
      label: "Date added",
    },
    {
      key: "id" as keyof Team,
      label: "",
      render: () => <ActionButtons />,
    },
  ];

  // Vendor columns configuration
  const vendorColumns = [
    {
      key: "name" as keyof Vendor,
      label: "Name",
      render: (_: unknown, vendor: Vendor) => (
        <DirectoryUserAvatar user={vendor} />
      ),
    },
    {
      key: "productType" as keyof Vendor,
      label: "Product Type",
    },
    {
      key: "status" as keyof Vendor,
      label: "Status",
      render: (status: unknown) => (
        <StatusBadge status={status as Vendor["status"]} />
      ),
    },
    {
      key: "dateAdded" as keyof Vendor,
      label: "Date added",
    },
    {
      key: "id" as keyof Vendor,
      label: "",
      render: () => <ActionButtons />,
    },
  ];

  // Equipment columns configuration
  const equipmentColumns = [
    {
      key: "name" as keyof Equipment,
      label: "Name",
    },
    {
      key: "equipmentType" as keyof Equipment,
      label: "Equipment Type",
    },
    {
      key: "dateSelected" as keyof Equipment,
      label: "Date selected",
    },
    {
      key: "id" as keyof Equipment,
      label: "",
      render: () => <ActionButtons />,
    },
  ];

  // Location columns configuration
  const locationColumns = [
    {
      key: "name" as keyof Location,
      label: "Name",
    },
    {
      key: "address" as keyof Location,
      label: "Address",
      render: (address: unknown) => (
        <button
          type="button"
          className="text-red-600 underline hover:text-red-700 text-left"
          onClick={() => {
            /* View address functionality */
          }}
        >
          {String(address)}
        </button>
      ),
    },
    {
      key: "phone" as keyof Location,
      label: "Phone Number",
    },
    {
      key: "dateAdded" as keyof Location,
      label: "Date added",
    },
    {
      key: "id" as keyof Location,
      label: "",
      render: () => <ActionButtons />,
    },
  ];

  return (
    <main className="min-h-screen bg-white flex-1 py-4">
      <div className="p-8">
        {/* Header */}
        <header className="flex justify-between items-start">
          <hgroup className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Directory Management
            </h1>
            <p className="text-gray-600">
              Manage all people, equipment and locations in your directory.
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
              title="Asset Management"
              value="Asset Management"
            />
            <CustomTabTrigger
              value="Location Management"
              title="Location Management"
            />
          </TabsList>

          {/* People Management Tab */}
          <TabsContent value="People Management" className="space-y-6">
            {/* People Sub-tabs */}
            <Tabs
              value={activePeopleTab}
              onValueChange={setActivePeopleTab}
              className="w-full"
            >
              <TabsList className="flex w-full max-w-[780px] rounded-xl">
                <TabsTrigger
                  value="Employees"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700 rounded-l-lg"
                  )}
                >
                  Employees
                </TabsTrigger>
                <TabsTrigger
                  value="Contractors"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700"
                  )}
                >
                  Contractors
                </TabsTrigger>
                <TabsTrigger
                  value="Teams"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700"
                  )}
                >
                  Teams
                </TabsTrigger>
                <TabsTrigger
                  value="Vendors"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700"
                  )}
                >
                  Vendors
                </TabsTrigger>
                <TabsTrigger
                  value="Equipments"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700"
                  )}
                >
                  Equipments
                </TabsTrigger>
                <TabsTrigger
                  value="Locations"
                  className={cn(
                    "data-[state=active]:bg-primary-light border border-gray-300 px-2.5 py-4 border-b-gray-300 data-[state=active]:border-b-gray-300 text-sm font-semibold data-[state=active]:text-primary text-gray-700 rounded-r-lg"
                  )}
                >
                  Locations
                </TabsTrigger>
              </TabsList>
              {/* Employees Tab */}
              <TabsContent value="Employees" className="space-y-6">
                <DirectoryTable
                  data={employees}
                  columns={employeeColumns}
                  onAdd={() => {
                    /* Add Employee functionality */
                  }}
                  addButtonText="Add New Employee"
                  title="Employees"
                  description="Employees are the workers of teams."
                />
              </TabsContent>

              {/* Contractors Tab */}
              <TabsContent value="Contractors" className="space-y-6">
                <DirectoryTable
                  data={contractors}
                  columns={contractorColumns}
                  onAdd={() => {
                    /* Add Contractor functionality */
                  }}
                  addButtonText="Add New Contractor"
                  title="Contractors"
                  description="Here are listings of contractors."
                />
              </TabsContent>

              {/* Teams Tab */}
              <TabsContent value="Teams" className="space-y-6">
                <DirectoryTable
                  data={teams}
                  columns={teamColumns}
                  onAdd={() => {
                    /* Add Team functionality */
                  }}
                  addButtonText="Add New Team"
                  title="Teams"
                  description="Here are listings of teams."
                />
              </TabsContent>

              {/* Vendors Tab */}
              <TabsContent value="Vendors" className="space-y-6">
                <DirectoryTable
                  data={vendors}
                  columns={vendorColumns}
                  onAdd={() => {
                    /* Add Vendor functionality */
                  }}
                  addButtonText="Add New Vendor"
                  title="Vendors"
                  description="Here are listings of vendors."
                />
              </TabsContent>

              {/* Equipments Tab */}
              <TabsContent value="Equipments" className="space-y-6">
                <DirectoryTable
                  data={equipments}
                  columns={equipmentColumns}
                  onAdd={() => {
                    /* Add Equipment functionality */
                  }}
                  addButtonText="Add New Equipment"
                  title="Equipments"
                  description="Here are listings of equipments and tools."
                />
              </TabsContent>

              {/* Locations Tab */}
              <TabsContent value="Locations" className="space-y-6">
                <DirectoryTable
                  data={locations}
                  columns={locationColumns}
                  onAdd={() => {
                    /* Add Location functionality */
                  }}
                  addButtonText="Add New Location"
                  title="Locations"
                  description="Here are listings of locations and addresses."
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Asset Management Tab */}
          <TabsContent value="Asset Management" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Asset Management
              </h3>
              <p className="text-gray-600">
                Advanced asset tracking and management features coming soon.
              </p>
            </div>
          </TabsContent>

          {/* Location Management Tab */}
          <TabsContent value="Location Management" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Location Management
              </h3>
              <p className="text-gray-600">
                Advanced location management features coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
