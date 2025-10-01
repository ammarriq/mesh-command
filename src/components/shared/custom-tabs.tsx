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
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList className="bg-gray-50 border border-gray-200 p-1 rounded-sm flex gap-2 ">
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="bg-transparent rounded-xl text-text-primary data-[state=active]:bg-white data-[state=active]:text-text-primary  px-3 py-2 data-[state=active]:shadow-xs data-[state=active]:border-b-none"
          >
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
