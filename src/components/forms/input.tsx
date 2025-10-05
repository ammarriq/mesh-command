"use client";

import React from "react";
import { Input } from "../ui/input";
import EmailIcon from "../../icons/email";
import EyeSlashIcon from "../../icons/eye-slash";
import LockIcon from "../../icons/lock";

interface Props extends Omit<React.ComponentProps<typeof Input>, "children"> {
  label: string;
  icon: "email" | "eye-slash" | "lock";
  name: string;
  placeHolder?: string;
  required?: boolean;
  endAdornment?: React.ReactNode;
}

function AuthInput({
  label,
  name,
  placeHolder,
  icon,
  required = false,
  className,
  id,
  type = "text",
  endAdornment,
  ...inputProps
}: Props) {
  // Select the icon component based on the icon prop
  let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> | null = null;
  if (icon === "email") {
    IconComponent = EmailIcon;
  } else if (icon === "eye-slash") {
    IconComponent = EyeSlashIcon;
  } else if (icon === "lock") {
    IconComponent = LockIcon;
  }

  return (
    <label className="p-3 flex items-center gap-2 rounded-[12px] bg-Bg-Dark shadow-xs">
      <span className="sr-only">{label}</span>
      {IconComponent && (
        <IconComponent
          className="size-5 sm:size-6 text-text-secondary"
          aria-hidden
        />
      )}
      <Input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeHolder}
        className={
          "shadow-none border-none outline-none ring-0 p-0 text-base placeholder:text-base flex-1 bg-transparent " +
          (className ?? "")
        }
        required={required}
        {...inputProps}
      />
      {endAdornment}
    </label>
  );
}

export default AuthInput;
