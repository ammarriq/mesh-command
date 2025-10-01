import CrossCircleIcon from "@/icons/cross-circle";
import React from "react";

interface RemovePillProps {
  title: string;
  isSplitScreen: boolean;
  isSelectedProject: boolean;
}

function RemovePill({
  title,
  isSplitScreen,
  isSelectedProject,
}: RemovePillProps) {
  console.log("is", isSplitScreen);
  return (
    <div
      className={`${
        isSplitScreen && isSelectedProject ? "w-full" : " max-w-56 bg-white"
      } flex justify-between items-center gap-6 w-full  px-2 py-1 border border-Bg-Dark`}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <CrossCircleIcon className="cursor-pointer size-4" />
    </div>
  );
}

export default RemovePill;
