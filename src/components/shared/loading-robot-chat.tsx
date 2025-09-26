import { RobotIcon } from "@/icons/robot";
import React from "react";

function LoadingRobotChat() {
  return (
    <div className="flex items-center gap-1">
      <RobotIcon className="stroke-primary size-5" />
      <p className="text-xs font-semibold">Working on your request....</p>
    </div>
  );
}

export default LoadingRobotChat;
