import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface CustomTabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "underline";
}

export function CustomTabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  variant = "default",
}: CustomTabsProps) {
  if (variant === "underline") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex space-x-6 border-b border-gray-200">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => onValueChange?.(item.value)}
              className={cn(
                "pb-2 px-1 text-sm font-medium transition-colors",
                value === item.value || (!value && defaultValue === item.value)
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        {items.map((item) => (
          <div
            key={item.value}
            className={cn(
              value === item.value || (!value && defaultValue === item.value)
                ? "block"
                : "hidden"
            )}
          >
            {item.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
