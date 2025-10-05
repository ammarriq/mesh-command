import { TabsTrigger } from "../ui/tabs";

interface CustomTabTriggerProps {
  value: string;
  title: string;
}

export function CustomTabTrigger({ title, value }: CustomTabTriggerProps) {
  return (
    <TabsTrigger className="bg-transparent" value={value}>
      {title}
    </TabsTrigger>
  );
}
