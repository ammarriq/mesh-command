"use client"

import React from "react"
import { type LucideIcon } from "lucide-react"
import { Input } from "../ui/input"

interface Props extends Omit<React.ComponentProps<typeof Input>, "children"> {
  label: string
  Icon: LucideIcon
  name: string
  placeHolder?: string
  required?: boolean
  endAdornment?: React.ReactNode
}

function AuthInput({
  label,
  name,
  placeHolder,
  Icon,
  required = false,
  className,
  id,
  type = "text",
  endAdornment,
  ...inputProps
}: Props) {
  return (
    <label className="py-1.5 px-3 bg-light-bg rounded-[12px] text-sm sm:text-base flex items-center gap-2 dark:bg-input/30">
      <span className="sr-only">{label}</span>
      <Icon className="size-4 sm:size-5 text-text-secondary" aria-hidden />
      <Input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeHolder}
        className={"shadow-none border-none outline-none ring-0 p-0 text-base placeholder:text-base flex-1 bg-transparent " + (className ?? "")}
        required={required}
        {...inputProps}
      />
      {endAdornment}
    </label>
  )
}

export default AuthInput
