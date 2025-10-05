import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditMsgIcon from '@/icons/edit-msg';
import OpenFolderIcon from '@/icons/open-folder';
import ProjectIcon from '@/icons/project';

import { PropsWithChildren } from 'react';

type IconType = 'projects' | 'open-folder' | 'edit-msg';

interface SettingOption {
  title: string;
  icon: IconType;
}

const SETTING_OPTIONS: SettingOption[] = [
  { title: 'View Linked Projects', icon: 'projects' },
  { title: 'Linked Dockets', icon: 'open-folder' },
  { title: 'Revert to 1:1', icon: 'edit-msg' },
];

interface CustomDropDownProps {
  type: 'settings';
}

function CustomDropDownItem({ iconType, title }: CustomDropDownItemProps) {
  const IconComponent = iconType ? ICON_MAP[iconType] : null;

  return (
    <DropdownMenuItem className="flex justify-between items-center bg-Bg-Dark rounded-lg text-text-primary p-4 text-sm">
      {title}
      {IconComponent && <IconComponent className="size-6" fill="#5F0101" />}
    </DropdownMenuItem>
  );
}

export default CustomDropDown;

interface CustomDropDownItemProps {
  iconType?: IconType;
  title: string;
}

const ICON_MAP: Record<IconType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  projects: ProjectIcon,
  'open-folder': OpenFolderIcon,
  'edit-msg': EditMsgIcon,
};

function CustomDropDown({ type, children }: CustomDropDownProps & PropsWithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-96 p-4 flex flex-col gap-2" align="end">
        {type === 'settings' &&
          SETTING_OPTIONS.map((item) => (
            <CustomDropDownItem key={item.title} iconType={item.icon} title={item.title} />
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
