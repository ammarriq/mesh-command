import CrossCircleIcon from "@/icons/cross-circle";
import React from "react";

interface RemovePillProps {
  title: string;
  isSelectedProject?: boolean;
}

function RemovePill({ title, isSelectedProject }: RemovePillProps) {
  return (
    <div
      className={`${
        isSelectedProject ? "w-full" : " max-w-56 bg-white"
      } flex justify-between items-center gap-6 w-full  px-2 py-1 border border-Bg-Dark`}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <CrossCircleIcon className="cursor-pointer size-4" />
    </div>
  );
}

export default RemovePill;
