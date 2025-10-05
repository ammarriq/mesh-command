import CallIcon from '@/icons/call';
import EmailIcon from '@/icons/email';
import UserIcon from '@/icons/user';

import React from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

// Field configuration types
interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select';
  icon?: 'user' | 'email' | 'phone';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface FormConfig {
  title: string;
  fields: FieldConfig[];
}

// Form configurations for each directory type
const formConfigs: Record<DirectoryType, FormConfig> = {
  employee: {
    title: 'Add New Employee',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', icon: 'user', required: true },
      { name: 'email', label: 'Email', type: 'email', icon: 'email', required: true },
      { name: 'phone', label: 'Phone #', type: 'tel', icon: 'phone', required: true },
    ],
  },

  contractor: {
    title: 'Add New Contractor',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', icon: 'user', required: true },
      { name: 'email', label: 'Email', type: 'email', icon: 'email', required: true },
      { name: 'phone', label: 'Phone #', type: 'tel', icon: 'phone', required: true },
      {
        name: 'workType',
        label: 'Work Type',
        type: 'select',
        required: true,
        options: [
          { value: 'Construction', label: 'Construction' },
          { value: 'Electronics', label: 'Electronics' },
        ],
      },
    ],
  },

  team: {
    title: 'Add New Team',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', icon: 'user', required: true },
      {
        name: 'memberCount',
        label: 'Nos of Members',
        type: 'select',
        required: true,
        options: [
          { value: '1-5', label: '1-5 Members' },
          { value: '6-10', label: '6-10 Members' },
          { value: '11-20', label: '11-20 Members' },
          { value: '21+', label: '21+ Members' },
        ],
      },
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        required: true,
        options: [
          { value: 'Engineering', label: 'Engineering' },
          { value: 'Construction', label: 'Construction' },
          { value: 'Operations', label: 'Operations' },
        ],
      },
    ],
  },

  vendor: {
    title: 'Add New Vendor',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', icon: 'user', required: true },
      { name: 'email', label: 'Email', type: 'email', icon: 'email', required: true },
      { name: 'phone', label: 'Phone #', type: 'tel', icon: 'phone', required: true },
      {
        name: 'productType',
        label: 'Product Type',
        type: 'select',
        required: true,
        options: [
          { value: 'Materials', label: 'Materials' },
          { value: 'Equipment', label: 'Equipment' },
        ],
      },
    ],
  },

  equipment: {
    title: 'Add New Equipment',
    fields: [
      { name: 'name', label: 'Equipment Name', type: 'text', icon: 'user', required: true },
      {
        name: 'equipmentType',
        label: 'Equipment Type',
        type: 'select',
        required: true,
        options: [
          { value: 'Heavy Machinery', label: 'Heavy Machinery' },
          { value: 'Tools', label: 'Tools' },
          { value: 'Vehicles', label: 'Vehicles' },
        ],
      },
    ],
  },

  location: {
    title: 'Add New Location',
    fields: [
      { name: 'title', label: 'Location Title', type: 'text', icon: 'user', required: true },
      { name: 'phone', label: 'Phone #', type: 'tel', icon: 'phone', required: true },
      { name: 'address', label: 'Address', type: 'text', required: true },
    ],
  },
};

type DirectoryType = 'employee' | 'contractor' | 'team' | 'vendor' | 'equipment' | 'location';
type FormData = Record<string, string | number>;

interface DirectoryFormProps {
  type: DirectoryType;
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
  initialData?: FormData;
}

function DirectoryForm({ type, onSubmit, onCancel, initialData }: DirectoryFormProps) {
  const config = formConfigs[type];
  const [formData, setFormData] = React.useState<FormData>(initialData || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleFieldChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-96 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary">{config.title}</h2>
      </div>

      <Separator />

      {/* Dynamic Fields */}
      <div className="space-y-4">
        {config.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={(value) => handleFieldChange(field.name, value)}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Save
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default DirectoryForm;

// Form field component
interface FormFieldProps {
  field: FieldConfig;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

function FormField({ field, value, onChange }: FormFieldProps) {
  if (field.type === 'select') {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">{field.label}</label>
        <Select value={String(value || '')} onValueChange={(val) => onChange?.(val)}>
          <SelectTrigger className="bg-Bg-Dark border-none">
            <SelectValue placeholder={`Select ${field.label}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <CustomInput
      label={field.label}
      name={field.name}
      type={field.type}
      icon={field.icon}
      placeholder={field.placeholder}
      required={field.required}
      value={String(value || '')}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
    />
  );
}

// Updated CustomInput component
interface CustomInputProps {
  label: string;
  icon?: 'user' | 'email' | 'phone';
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({
  label,
  name,
  placeholder,
  icon,
  required = false,
  type = 'text',
  value,
  onChange,
}: CustomInputProps) {
  let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> | null = null;
  if (icon === 'email') {
    IconComponent = EmailIcon;
  } else if (icon === 'user') {
    IconComponent = UserIcon;
  } else if (icon === 'phone') {
    IconComponent = CallIcon;
  }

  return (
    <label className="p-3 flex items-center gap-2 rounded-[12px] bg-Bg-Dark shadow-xs">
      <span className="text-text-primary">{label}</span>
      {IconComponent && (
        <IconComponent className="size-5 sm:size-6 text-text-secondary" aria-hidden />
      )}
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="shadow-none border-none outline-none ring-0 p-0 text-base placeholder:text-base flex-1 bg-transparent "
        required={required}
      />
    </label>
  );
}
