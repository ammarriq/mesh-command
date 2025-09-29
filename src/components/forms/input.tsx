"use client";

import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props extends Omit<React.ComponentProps<typeof Input>, "children"> {
  label: string;
  icon: string;
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
  return (
    <label className="p-3 flex items-center gap-2 rounded-[12px] bg-Bg-Dark shadow-xs">
      <span className="sr-only">{label}</span>
      <Image width={24} height={24} src={icon} alt="" />
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
