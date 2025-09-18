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
        "w-full text-white bg-primary rounded-2xl inline-block disabled:opacity-50 disabled:cursor-not-allowed max-w-96",
        // Responsive sizing to match auth cards
        "py-3 sm:py-3.5 2xl:py-4 text-sm sm:text-base",
        className
      )}
      {...props}
    >
      {name}
    </button>
  );
}

export default AuthButton;
