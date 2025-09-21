"use client";

import { useState } from "react";
import { Search, Copy, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  useAppStore,
  type Employee,
  type Contractor,
  type Team,
  type Vendor,
  type Equipment,
  type Location,
} from "@/stores/app-store";
import { cn } from "@/lib/utils";

// Directory Table Component for reusability
interface DirectoryTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (value: unknown, item: T) => React.ReactNode;
  }[];
  onAdd: () => void;
  addButtonText: string;
}

function DirectoryTable<
  T extends { id: number; name: string; email?: string }
>({ data, columns, onAdd, addButtonText }: DirectoryTableProps<T>) {
  return (
    <div className="space-y-4">
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

// Generic Avatar Component
function PersonAvatar({ person }: { person: { name: string; email: string } }) {
  const initials = person.name
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
        <div className="font-medium text-gray-900">{person.name}</div>
        <div className="text-sm text-gray-500">{person.email}</div>
      </div>
    </div>
  );
}

// Team Initial Avatar Component
function TeamAvatar({ team }: { team: Team }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">
        {team.initials}
      </div>
      <div>
        <div className="font-medium text-gray-900">{team.name}</div>
        <div className="text-sm text-gray-500">{team.email}</div>
      </div>
    </div>
  );
}

// Vendor Initial Avatar Component
function VendorAvatar({ vendor }: { vendor: Vendor }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium text-white">
        {vendor.initials}
      </div>
      <div>
        <div className="font-medium text-gray-900">{vendor.name}</div>
        <div className="text-sm text-gray-500">{vendor.email}</div>
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

export default function DirectoryPage() {
  const { employees, contractors, teams, vendors, equipments, locations } =
    useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Employees");

  // Employee columns configuration
  const employeeColumns = [
    {
      key: "name" as keyof Employee,
      label: "Name",
      render: (_: unknown, employee: Employee) => (
        <PersonAvatar person={employee} />
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
        <PersonAvatar person={contractor} />
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
      render: (_: unknown, team: Team) => <TeamAvatar team={team} />,
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
      render: (_: unknown, vendor: Vendor) => <VendorAvatar vendor={vendor} />,
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
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            MeshCommand Directory
          </h1>
          <p className="text-gray-600">
            Manage and view all people, equipment and locations.
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger
              value="Employees"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Employees
            </TabsTrigger>
            <TabsTrigger
              value="Contractors"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Contractors
            </TabsTrigger>
            <TabsTrigger
              value="Teams"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Teams
            </TabsTrigger>
            <TabsTrigger
              value="Vendors"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Vendors
            </TabsTrigger>
            <TabsTrigger
              value="Equipments"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Equipments
            </TabsTrigger>
            <TabsTrigger
              value="Locations"
              className={cn(
                "data-[state=active]:bg-red-100 data-[state=active]:text-red-600"
              )}
            >
              Locations
            </TabsTrigger>
          </TabsList>

          {/* Employees Tab */}
          <TabsContent value="Employees" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Employees
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Employees are the workers of teams.
                <br />
                Manager
              </p>
              <DirectoryTable
                data={employees}
                columns={employeeColumns}
                onAdd={() => {
                  /* Add Employee functionality */
                }}
                addButtonText="Add New Employee"
              />
            </div>
          </TabsContent>

          {/* Contractors Tab */}
          <TabsContent value="Contractors" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Contractors
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Here are listings of contractors.
              </p>
              <DirectoryTable
                data={contractors}
                columns={contractorColumns}
                onAdd={() => {
                  /* Add Contractor functionality */
                }}
                addButtonText="Add New Contractor"
              />
            </div>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="Teams" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Teams</h2>
              <p className="text-sm text-gray-600 mb-4">
                Here are listings of teams.
              </p>
              <DirectoryTable
                data={teams}
                columns={teamColumns}
                onAdd={() => {
                  /* Add Team functionality */
                }}
                addButtonText="Add New Team"
              />
            </div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="Vendors" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Vendors
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Here are listings of teams.
              </p>
              <DirectoryTable
                data={vendors}
                columns={vendorColumns}
                onAdd={() => {
                  /* Add Vendor functionality */
                }}
                addButtonText="Add New Vendors"
              />
            </div>
          </TabsContent>

          {/* Equipments Tab */}
          <TabsContent value="Equipments" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Equipments
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Here are listings of equipments.
              </p>
              <DirectoryTable
                data={equipments}
                columns={equipmentColumns}
                onAdd={() => {
                  /* Add Equipment functionality */
                }}
                addButtonText="Add New Equipments"
              />
            </div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="Locations" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Locations
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Here are listings of locations.
              </p>
              <DirectoryTable
                data={locations}
                columns={locationColumns}
                onAdd={() => {
                  /* Add Location functionality */
                }}
                addButtonText="Add New Locations"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
