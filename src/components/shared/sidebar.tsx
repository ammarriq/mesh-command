import { Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";

interface SidebarItem {
  id: number;
  name: string;
  status?: string;
  subItems?: Array<{
    id: number;
    name: string;
    status?: string;
  }>;
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
  selectedId: number | null;
  onSelectItem: (id: number | null) => void;
  activeTab?: string;
  tabs?: string[];
  onTabChange?: (tab: string) => void;
  showNewButton?: boolean;
  newButtonText?: string;
  onNewItem?: () => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
}

export function Sidebar({
  title,
  items,
  selectedId,
  onSelectItem,
  activeTab,
  tabs = [],
  onTabChange,
  showNewButton = false,
  newButtonText = "New Item",
  onNewItem,
  searchPlaceholder = "Search",
  showSearch = true,
}: SidebarProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="size-5" />
          </button>
        </div>

        {/* Tabs */}
        {tabs.length > 0 && (
          <div className="flex text-sm mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className={`px-3 py-1 ${
                  activeTab === tab
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {/* Search */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                className="pl-10"
              />
            </div>
          )}

          {/* New Button */}
          {showNewButton && (
            <Button
              onClick={onNewItem}
              className="w-full bg-red-700 hover:bg-red-800"
            >
              {newButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item.id)}
            className={`w-full p-4 text-left border-b border-gray-100 hover:bg-white transition-colors ${
              selectedId === item.id
                ? "bg-white border-l-4 border-l-red-600"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="font-medium text-gray-900 text-sm">
                {item.name}
              </span>
              {item.status && <StatusBadge status={item.status} size="sm" />}
            </div>

            {item.subItems && item.subItems.length > 0 && (
              <div className="text-xs text-gray-500 space-y-1">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.id}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {subItem.name.length > 30
                        ? subItem.name.substring(0, 30) + "..."
                        : subItem.name}
                    </span>
                    {subItem.status && (
                      <StatusBadge status={subItem.status} size="sm" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
