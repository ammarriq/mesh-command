import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

function AuthButton({ name, className, type = "submit", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "h-12 rounded-2xl bg-primary text-white flex items-center justify-center w-full max-w-[360px]",
        className
      )}
      {...props}
    >
      {name}
    </button>
  );
}

export default AuthButton;
